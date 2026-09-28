import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import publicRoutes from './routes/public.js'
import adminRoutes from './routes/admin.js'
import { initDb } from './init.js'

const app = express()
const origins = (process.env.CORS_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean)

app.set('trust proxy', 1)
app.use(helmet())
app.use(cors({ origin: origins.length ? origins : true }))
app.use(express.json({ limit: '100kb' }))

app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.use('/api/admin', adminRoutes)
app.use('/api', publicRoutes)

app.use((req, res) => res.status(404).json({ error: 'Not found' }))
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Something went wrong on the server.' })
})

const port = process.env.PORT || 5000
initDb()
  .then(() => app.listen(port, () => console.log(`API running on http://localhost:${port}`)))
  .catch((e) => { console.error('Database setup failed:', e.message); process.exit(1) })
