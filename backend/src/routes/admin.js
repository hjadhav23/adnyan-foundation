import { Router } from 'express'
import bcrypt from 'bcryptjs'
import rateLimit from 'express-rate-limit'
import { query } from '../db.js'
import { KINDS, SUBMISSIONS } from '../kinds.js'
import { requireAdmin, signToken } from '../auth.js'

const router = Router()
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false })

router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const email = String(req.body.email || '').toLowerCase().trim()
    const password = String(req.body.password || '')
    const { rows } = await query('SELECT * FROM admin_users WHERE email = $1', [email])
    const user = rows[0]
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }
    res.json({ token: signToken(user), email: user.email })
  } catch (e) { next(e) }
})

router.use(requireAdmin)

// Form submissions: contact | join | newsletter
router.get('/submissions/:type', async (req, res, next) => {
  try {
    const table = SUBMISSIONS[req.params.type]
    if (!table) return res.status(404).json({ error: 'Unknown type' })
    const { rows } = await query(`SELECT * FROM ${table} ORDER BY created_at DESC LIMIT 500`)
    res.json(rows)
  } catch (e) { next(e) }
})

router.delete('/submissions/:type/:id', async (req, res, next) => {
  try {
    const table = SUBMISSIONS[req.params.type]
    if (!table) return res.status(404).json({ error: 'Unknown type' })
    await query(`DELETE FROM ${table} WHERE id = $1`, [Number(req.params.id)])
    res.json({ ok: true })
  } catch (e) { next(e) }
})

// Content CRUD: announcements | stories | calls | team | stats
function kindOr404(req, res, next) {
  const kind = KINDS[req.params.kind]
  if (!kind) return res.status(404).json({ error: 'Unknown content type' })
  req.kind = kind
  next()
}

function valuesFrom(kind, body) {
  return [...Object.entries(kind.fields).map(([k, t]) => (t === 'INTEGER' ? parseInt(body[k], 10) || 0 : String(body[k] ?? '').trim().slice(0, 4000))),
    parseInt(body.sort_order, 10) || 0]
}

router.get('/content/:kind', kindOr404, async (req, res, next) => {
  try {
    const { rows } = await query(`SELECT * FROM ${req.kind.table} ORDER BY sort_order, id`)
    res.json(rows)
  } catch (e) { next(e) }
})

router.post('/content/:kind', kindOr404, async (req, res, next) => {
  try {
    const cols = [...Object.keys(req.kind.fields), 'sort_order']
    const { rows } = await query(
      `INSERT INTO ${req.kind.table} (${cols.join(',')}) VALUES (${cols.map((_, i) => `$${i + 1}`).join(',')}) RETURNING *`,
      valuesFrom(req.kind, req.body))
    res.status(201).json(rows[0])
  } catch (e) { next(e) }
})

router.put('/content/:kind/:id', kindOr404, async (req, res, next) => {
  try {
    const cols = [...Object.keys(req.kind.fields), 'sort_order']
    const vals = valuesFrom(req.kind, req.body)
    const { rows } = await query(
      `UPDATE ${req.kind.table} SET ${cols.map((c, i) => `${c}=$${i + 1}`).join(',')} WHERE id=$${cols.length + 1} RETURNING *`,
      [...vals, Number(req.params.id)])
    if (!rows[0]) return res.status(404).json({ error: 'Not found' })
    res.json(rows[0])
  } catch (e) { next(e) }
})

router.delete('/content/:kind/:id', kindOr404, async (req, res, next) => {
  try {
    await query(`DELETE FROM ${req.kind.table} WHERE id = $1`, [Number(req.params.id)])
    res.json({ ok: true })
  } catch (e) { next(e) }
})

export default router
