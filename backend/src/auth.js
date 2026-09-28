import jwt from 'jsonwebtoken'

const secret = () => process.env.JWT_SECRET || 'dev-only-secret'

export const signToken = (user) => jwt.sign({ sub: user.id, email: user.email }, secret(), { expiresIn: '8h' })

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  try {
    req.admin = jwt.verify(token, secret())
    next()
  } catch {
    res.status(401).json({ error: 'Unauthorized' })
  }
}
