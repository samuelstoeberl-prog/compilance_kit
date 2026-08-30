// Schreibt/liest src/data/meta.json — den Zeitstempel, wann die Scraper
// zuletzt erfolgreich Daten für regulations.json / fundings.json geliefert
// haben. Wird im Frontend angezeigt ("Daten-Stand: ...").

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

export interface ScraperMeta {
  regulations_updated_at: string | null
  fundings_updated_at: string | null
}

const __dir = dirname(fileURLToPath(import.meta.url))
const META_PATH = resolve(__dir, '../../src/data/meta.json')

function readMeta(): ScraperMeta {
  if (!existsSync(META_PATH)) {
    return { regulations_updated_at: null, fundings_updated_at: null }
  }
  return JSON.parse(readFileSync(META_PATH, 'utf-8'))
}

export function touchRegulationsUpdatedAt(at: Date = new Date()): void {
  const meta = readMeta()
  meta.regulations_updated_at = at.toISOString()
  writeFileSync(META_PATH, JSON.stringify(meta, null, 2) + '\n')
}

export function touchFundingsUpdatedAt(at: Date = new Date()): void {
  const meta = readMeta()
  meta.fundings_updated_at = at.toISOString()
  writeFileSync(META_PATH, JSON.stringify(meta, null, 2) + '\n')
}
