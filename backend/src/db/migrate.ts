// Führt schema.sql gegen die Datenbank aus
// Aufruf: npm run db:migrate

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { db } from './client.js'

const sql = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), 'schema.sql'),
  'utf-8'
)

try {
  await db.query(sql)
  console.log('✓ Migration erfolgreich')
} catch (err) {
  console.error('✗ Migration fehlgeschlagen:', err)
  process.exit(1)
} finally {
  await db.end()
}
