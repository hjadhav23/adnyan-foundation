import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { query } from '../db.js'
import { KINDS } from '../kinds.js'

const router = Router()
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false })

const clean = (v, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

// Public content lists: /api/announcements, /api/stories, /api/calls, /api/team, /api/stats
for (const [kind, { table }] of Object.entries(KINDS)) {
  router.get(`/${kind}`, async (_req, res, next) => {
    try {
      const { rows } = await query(`SELECT * FROM ${table} ORDER BY sort_order, id`)
      res.json(rows)
    } catch (e) { next(e) }
  })
}

router.post('/contact', limiter, async (req, res, next) => {
  try {
    if (req.body.website) return res.json({ ok: true }) // honeypot
    const name = clean(req.body.name, 120), email = clean(req.body.email, 200)
    const subject = clean(req.body.subject, 200), message = clean(req.body.message, 4000)
    if (!name || !isEmail(email) || !message) return res.status(400).json({ error: 'Name, a valid email and a message are required.' })
    await query('INSERT INTO contact_messages (name,email,subject,message) VALUES ($1,$2,$3,$4)', [name, email, subject, message])
    res.status(201).json({ ok: true })
  } catch (e) { next(e) }
})

router.post('/newsletter', limiter, async (req, res, next) => {
  try {
    if (req.body.website) return res.json({ ok: true })
    const email = clean(req.body.email, 200).toLowerCase()
    if (!isEmail(email)) return res.status(400).json({ error: 'Please enter a valid email address.' })
    await query('INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING', [email])
    res.status(201).json({ ok: true })
  } catch (e) { next(e) }
})

router.post('/join', limiter, async (req, res, next) => {
  try {
    if (req.body.website) return res.json({ ok: true })
    const kind = ['network', 'participate', 'work'].includes(req.body.kind) ? req.body.kind : 'network'
    const name = clean(req.body.name, 120), email = clean(req.body.email, 200)
    const phone = clean(req.body.phone, 40), city = clean(req.body.city, 120), message = clean(req.body.message, 4000)
    if (!name || !isEmail(email)) return res.status(400).json({ error: 'Name and a valid email are required.' })
    await query('INSERT INTO join_requests (kind,name,email,phone,city,message) VALUES ($1,$2,$3,$4,$5,$6)', [kind, name, email, phone, city, message])
    res.status(201).json({ ok: true })
  } catch (e) { next(e) }
})

export default router
