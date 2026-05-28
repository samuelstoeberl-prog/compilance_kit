import { readFileSync } from 'fs'
import pg from 'pg'

const { Pool } = pg
const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.error('DATABASE_URL fehlt. Ausführen mit: DATABASE_URL=... node scripts/run-schema.mjs')
  process.exit(1)
}

const pool = new Pool({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } })
const sql = readFileSync('backend/src/db/schema.sql', 'utf8')

const statements = sql
  .split(/;\s*\n/)
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'))

console.log(`${statements.length} Statements werden ausgeführt...`)

for (const stmt of statements) {
  try {
    await pool.query(stmt)
    const label = stmt.slice(0, 60).replace(/\n/g, ' ')
    console.log(`✓ ${label}`)
  } catch (err) {
    console.error(`✗ ${stmt.slice(0, 80)}`)
    console.error(`  → ${err.message}`)
  }
}

await pool.end()
console.log('Fertig.')
