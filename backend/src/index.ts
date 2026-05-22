import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// .env laden bevor alles andere importiert wird
const envPath = resolve(process.cwd(), '.env')
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const eq = t.indexOf('=')
    if (eq === -1) continue
    const key = t.slice(0, eq).trim()
    const val = t.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
    if (key && !process.env[key]) process.env[key] = val
  }
}

import { app } from './app.js'
import { db } from './db/client.js'

const PORT = parseInt(process.env.PORT ?? '3001')

// DB-Verbindung prüfen
try {
  await db.query('SELECT 1')
  console.log('✓ Datenbank verbunden')
} catch (err) {
  console.error('✗ Datenbank nicht erreichbar:', err)
  process.exit(1)
}

app.listen(PORT, () => {
  console.log(`✓ ComplianceKit API läuft auf http://localhost:${PORT}`)
  console.log(`  GET  /api/health`)
  console.log(`  POST /api/companies`)
  console.log(`  GET  /api/match/:id/fundings`)
  console.log(`  GET  /api/match/:id/regulations`)
  console.log(`  GET  /api/match/:id/summary`)
})
