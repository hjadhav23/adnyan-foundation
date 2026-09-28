import fs from 'node:fs'
import bcrypt from 'bcryptjs'
import { pool, query } from './db.js'
import { KINDS } from './kinds.js'

const seed = JSON.parse(fs.readFileSync(new URL('./seed.json', import.meta.url), 'utf8'))

export async function initDb() {
  for (const { table, fields } of Object.values(KINDS)) {
    const cols = Object.entries(fields).map(([k, t]) => `${k} ${t} ${t === 'INTEGER' ? 'NOT NULL DEFAULT 0' : "NOT NULL DEFAULT ''"}`)
    await query(`CREATE TABLE IF NOT EXISTS ${table} (
      id SERIAL PRIMARY KEY, ${cols.join(', ')},
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now())`)
  }
  await query(`CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY, name TEXT, email TEXT, subject TEXT, message TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`)
  await query(`CREATE TABLE IF NOT EXISTS join_requests (
    id SERIAL PRIMARY KEY, kind TEXT, name TEXT, email TEXT, phone TEXT, city TEXT, message TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`)
  await query(`CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id SERIAL PRIMARY KEY, email TEXT UNIQUE NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`)
  await query(`CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`)

  // Seed starter content once, so the admin panel is not empty
  for (const [kind, { table, fields }] of Object.entries(KINDS)) {
    const { rows } = await query(`SELECT COUNT(*)::int AS n FROM ${table}`)
    if (rows[0].n > 0) continue
    const keys = Object.keys(fields)
    let i = 0
    for (const item of seed[kind] ?? []) {
      const cols = [...keys, 'sort_order']
      const vals = [...keys.map((k) => item[k] ?? (fields[k] === 'INTEGER' ? 0 : '')), i++]
      await query(`INSERT INTO ${table} (${cols.join(',')}) VALUES (${cols.map((_, n) => `$${n + 1}`).join(',')})`, vals)
    }
  }

  // First admin
  const { rows: admins } = await query('SELECT id FROM admin_users LIMIT 1')
  if (admins.length === 0 && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)
    await query('INSERT INTO admin_users (email, password_hash) VALUES ($1,$2)', [process.env.ADMIN_EMAIL.toLowerCase(), hash])
    console.log(`Created admin user ${process.env.ADMIN_EMAIL}`)
  }
}

// `npm run db:init` runs this file directly
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split(/[\\/]/).pop())) {
  initDb().then(() => { console.log('Database ready'); return pool.end() }).catch((e) => { console.error(e); process.exit(1) })
}
