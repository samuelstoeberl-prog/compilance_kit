// Importiert fundings.json und regulations.json in die Datenbank
// Aufruf: npm run db:seed

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { db } from './client.js'
// Typen für die JSON-Quelldateien (Frontend-Format)
interface Funding {
  id: string; title: string; beschreibung: string
  typ: 'Zuschuss' | 'Kredit' | 'Steuervorteil'
  quelle: 'EU' | 'Bund' | 'Bundesland'
  foerderer: string; max_betrag: number | null; zins: string | null
  antrag_url: string; bearbeitungszeit_wochen: [number, number]
  ausschlusskriterien: string[]; benoetigte_dokumente: unknown
  gilt_fuer: unknown; relevanz_boost?: unknown
}
interface Regulation {
  id: string; title: string; category: string; beschreibung: string
  rechtsgrundlage: string; quelle_url: string; gilt_fuer: unknown
  hat_dokument_generator: boolean; dokument_typ: string | null
}

const __dir = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dir, '../../../')

const fundings: Funding[] = JSON.parse(
  readFileSync(resolve(root, 'src/data/fundings.json'), 'utf-8')
)
const regulations: Regulation[] = JSON.parse(
  readFileSync(resolve(root, 'src/data/regulations.json'), 'utf-8')
)

// Fundings upserten
let fCount = 0
for (const f of fundings) {
  await db.query(`
    INSERT INTO fundings (
      id, title, beschreibung, typ, quelle, foerderer,
      max_betrag, zins, antrag_url,
      bearbeitungszeit_min, bearbeitungszeit_max,
      ausschlusskriterien, benoetigte_dokumente,
      gilt_fuer, relevanz_boost
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      beschreibung = EXCLUDED.beschreibung,
      max_betrag = EXCLUDED.max_betrag,
      antrag_url = EXCLUDED.antrag_url,
      gilt_fuer = EXCLUDED.gilt_fuer,
      relevanz_boost = EXCLUDED.relevanz_boost,
      updated_at = NOW()
  `, [
    f.id, f.title, f.beschreibung, f.typ, f.quelle, f.foerderer,
    f.max_betrag,
    f.zins,
    f.antrag_url,
    f.bearbeitungszeit_wochen[0],
    f.bearbeitungszeit_wochen[1],
    f.ausschlusskriterien,
    JSON.stringify(f.benoetigte_dokumente),
    JSON.stringify(f.gilt_fuer),
    JSON.stringify(f.relevanz_boost ?? {}),
  ])
  fCount++
}

// Regulations upserten
let rCount = 0
for (const r of regulations) {
  await db.query(`
    INSERT INTO regulations (
      id, title, category, beschreibung, rechtsgrundlage,
      quelle_url, gilt_fuer, hat_dokument_generator, dokument_typ
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      beschreibung = EXCLUDED.beschreibung,
      gilt_fuer = EXCLUDED.gilt_fuer,
      updated_at = NOW()
  `, [
    r.id, r.title, r.category, r.beschreibung, r.rechtsgrundlage,
    r.quelle_url,
    JSON.stringify(r.gilt_fuer),
    r.hat_dokument_generator,
    r.dokument_typ ?? null,
  ])
  rCount++
}

console.log(`✓ ${fCount} Förderprogramme importiert`)
console.log(`✓ ${rCount} Regulierungen importiert`)
await db.end()
