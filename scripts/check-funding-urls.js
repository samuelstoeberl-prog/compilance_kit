import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
const fundings = JSON.parse(readFileSync(join(__dir, '../src/data/fundings.json'), 'utf8'))

async function checkUrl(url) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(8000),
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' }
    })
    return res.status < 400
  } catch {
    return false
  }
}

const BATCH = 20
const results = []

console.log(`Prüfe ${fundings.length} URLs...\n`)

for (let i = 0; i < fundings.length; i += BATCH) {
  const batch = fundings.slice(i, i + BATCH)
  const checks = await Promise.all(batch.map(f => checkUrl(f.antrag_url)))
  checks.forEach((ok, j) => {
    const f = fundings[i + j]
    results.push({ id: f.id, ok, url: f.antrag_url })
    console.log(`${ok ? '✓' : '✗'} ${f.title.slice(0, 50)}`)
  })
}

const dead = results.filter(r => !r.ok)
const deadIds = new Set(dead.map(r => r.id))
const cleaned = fundings.filter(f => !deadIds.has(f.id))

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
console.log(`Gültig:   ${cleaned.length}`)
console.log(`Entfernt: ${dead.length}`)
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)

writeFileSync(join(__dir, '../src/data/fundings.json'), JSON.stringify(cleaned, null, 2))
console.log('\nfundings.json aktualisiert. Jetzt committen und pushen.')
