// Importiert Regulierungen aus dem `regulierung`-Schema in public.regulations
// und aktualisiert src/data/regulations.json
// Aufruf: DATABASE_URL=... npx tsx src/db/migrate-regulierung.ts

import { db } from './client.js'
import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dir, '../../../')

// Branche-Mapping: regulierung-Schema → app-Branchen (regulations.json)
const BRANCHE_MAP: Record<string, string> = {
  'Bauhauptgewerbe':                   'Handwerk',
  'Ausbauhandwerk':                    'Handwerk',
  'Elektrohandwerk':                   'Handwerk',
  'Dachdeckerhandwerk':                'Handwerk',
  'Kfz-Gewerbe':                       'Handwerk',
  'Baeckerei / Konditorei':            'Handwerk',
  'Gebaeudereinigung':                 'Handwerk',
  'Fleischwirtschaft':                 'Industrie & Fertigung',
  'Gastronomie':                       'Gastronomie & Cafés',
  'Hotellerie':                        'Hotellerie & Beherbergung',
  'Einzelhandel':                      'Einzelhandel',
  'Grosshandel':                       'Großhandel',
  'E-Commerce / Online-Handel':        'E-Commerce',
  'Lebensmittelproduktion':            'Industrie & Fertigung',
  'Chemieindustrie':                   'Industrie & Fertigung',
  'Pharmaindustrie':                   'Industrie & Fertigung',
  'Medizintechnik':                    'Gesundheitswesen & Soziales',
  'Maschinenbau':                      'Industrie & Fertigung',
  'Automobilindustrie':                'Industrie & Fertigung',
  'Logistik / Spedition':              'Transport & Logistik',
  'Finanzdienstleistungen / Banken':   'Freie Berufe (Recht, Steuern, Architektur)',
  'Versicherungen':                    'Freie Berufe (Recht, Steuern, Architektur)',
  'Immobilienwirtschaft':              'Immobilienwesen',
  'Gesundheitswesen / Kliniken':       'Gesundheitswesen & Soziales',
  'Arztpraxen / Heilberufe':           'Gesundheitswesen & Soziales',
  'Energie / Versorgung':              'Industrie & Fertigung',
  'Wasserversorgung':                  'Industrie & Fertigung',
  'Abfallwirtschaft':                  'Industrie & Fertigung',
  'IKT / Informationstechnologie':     'IT-Dienstleistungen & Software',
  'Telekommunikation':                 'IT-Dienstleistungen & Software',
  'Online-Plattformen / Marktplaetze': 'E-Commerce',
  'Land- und Forstwirtschaft':         'Land- & Forstwirtschaft',
  'Holzverarbeitende Industrie':       'Industrie & Fertigung',
  'Kunsthandel':                       'Kreativwirtschaft',
  'Kryptounternehmen':                 'IT-Dienstleistungen & Software',
  'Ruestungsindustrie':                'Industrie & Fertigung',
  'Steuerberatung / Wirtschaftspruefung': 'Freie Berufe (Recht, Steuern, Architektur)',
  'Rechtsberatung':                    'Freie Berufe (Recht, Steuern, Architektur)',
  'Notare':                            'Freie Berufe (Recht, Steuern, Architektur)',
  'Kosmetik / Wellness':               'Dienstleistungen',
  'Spedition / Transport':             'Transport & Logistik',
  'Immobilienmakler':                  'Immobilienwesen',
}

// Rechtsform-Mapping: regulierung-Schema kuerzel → app-Rechtsform
const RF_MAP: Record<string, string> = {
  'GmbH':             'GmbH',
  'AG':               'AG',
  'SE':               'AG',
  'KGaA':             'AG',
  'eK':               'Einzelunternehmen',
  'OHG':              'OHG/KG',
  'KG':               'OHG/KG',
  'GmbHCoKG':         'GmbH & Co. KG',
  'eG':               'eG',
  'GbR':              'GbR',
  'PartG':            'PartG',
  'Einzelunternehmen':'Einzelunternehmen',
  'UG':               'UG (haftungsbeschränkt)',
  'Verein':           'e.V.',
  'Stiftung':         'Stiftung',
}

// Kategorie-Mapping: regulierung-Schema → app-Kategorien
const KAT_MAP: Record<string, string> = {
  'Arbeitsrecht':                    'Arbeitsrecht',
  'Mitbestimmung':                   'Arbeitsrecht',
  'Arbeitsschutz':                   'Arbeitsrecht',
  'Datenschutz':                     'Datenschutz',
  'Compliance':                      'Compliance',
  'Steuer / Rechnungswesen':         'Steuer',
  'Nachhaltigkeit / ESG':            'Reporting',
  'Umwelt / Energie':                'Umwelt',
  'IT / Cybersicherheit':            'IT-Sicherheit',
  'Technologie / KI':                'IT-Sicherheit',
  'Digital / Verbraucherschutz':     'Verbraucherschutz',
  'Verbraucherschutz':               'Verbraucherschutz',
  'Branche: Handwerk':               'Arbeitsrecht',
  'Branche: Bau':                    'Arbeitsrecht',
  'Branche: Gastronomie':            'Steuer',
  'Branche: Finanzdienstleistung':   'Finanzmarkt',
  'Branche: Gesundheit':             'Gesundheit',
  'Branche: Lebensmittel':           'Lebensmittelrecht',
  // New categories
  'Sozialversicherung':              'Sozialversicherung',
  'Energie':                         'Umwelt',
  'Finanzmarkt':                     'Finanzmarkt',
  'Gewerberecht / Gesellschaftsrecht': 'Gewerberecht',
  'Transport / Logistik':            'Transport',
  'Landwirtschaft':                  'Umwelt',
  'Produktrecht / CE':               'Produktrecht',
  'Berufsrecht / Zulassungen':       'Berufsrecht',
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

interface RegRow {
  id: number
  name: string
  kurzname: string
  kategorie: string
  rechtsgrundlage: string
  beschreibung: string
  mitarbeiter_min: number | null
  mitarbeiter_max: number | null
  externe_url: string | null
  gilt_fuer_alle_rechtsformen: boolean
  gilt_fuer_alle_branchen: boolean
  gilt_fuer_alle_bundeslaender: boolean
}

interface BrancheRow { regulierung_id: number; branche_name: string }
interface RechtsformRow { regulierung_id: number; kuerzel: string }

const { rows: regs } = await db.query<RegRow>(`
  SELECT r.id, r.name, r.kurzname,
         k.name AS kategorie,
         r.rechtsgrundlage, r.beschreibung,
         r.mitarbeiter_min, r.mitarbeiter_max,
         r.externe_url,
         r.gilt_fuer_alle_rechtsformen,
         r.gilt_fuer_alle_branchen,
         r.gilt_fuer_alle_bundeslaender
  FROM regulierung.regulierung r
  JOIN regulierung.kategorie k ON k.id = r.kategorie_id
  WHERE r.aktiv = TRUE
`)

const { rows: brancheRows } = await db.query<BrancheRow>(`
  SELECT rb.regulierung_id, b.name AS branche_name
  FROM regulierung.regulierung_branche rb
  JOIN regulierung.branche b ON b.id = rb.branche_id
`)

const { rows: rfRows } = await db.query<RechtsformRow>(`
  SELECT rrf.regulierung_id, rf.kuerzel
  FROM regulierung.regulierung_rechtsform rrf
  JOIN regulierung.rechtsform rf ON rf.id = rrf.rechtsform_id
`)

// Gruppieren
const brancheByReg = new Map<number, string[]>()
for (const r of brancheRows) {
  if (!brancheByReg.has(r.regulierung_id)) brancheByReg.set(r.regulierung_id, [])
  brancheByReg.get(r.regulierung_id)!.push(r.branche_name)
}

const rfByReg = new Map<number, string[]>()
for (const r of rfRows) {
  if (!rfByReg.has(r.regulierung_id)) rfByReg.set(r.regulierung_id, [])
  rfByReg.get(r.regulierung_id)!.push(r.kuerzel)
}

let upserted = 0
const jsonItems: object[] = []

for (const reg of regs) {
  const appId = `reg-${slugify(reg.kurzname ?? reg.name)}`
  const category = KAT_MAP[reg.kategorie] ?? 'Recht'

  // gilt_fuer aufbauen
  const rechtsformen: string[] = reg.gilt_fuer_alle_rechtsformen
    ? ['alle']
    : (rfByReg.get(reg.id) ?? []).map(k => RF_MAP[k] ?? k).filter(Boolean)

  const branchen: string[] = reg.gilt_fuer_alle_branchen
    ? ['alle']
    : (brancheByReg.get(reg.id) ?? []).map(b => BRANCHE_MAP[b] ?? b).filter(Boolean)

  const giltFuer: Record<string, unknown> = {
    rechtsformen: rechtsformen.length ? rechtsformen : ['alle'],
    branchen: branchen.length ? branchen : ['alle'],
  }
  if (reg.mitarbeiter_min) giltFuer.mitarbeiter_min = reg.mitarbeiter_min

  await db.query(`
    INSERT INTO public.regulations
      (id, title, category, beschreibung, rechtsgrundlage, quelle_url,
       gilt_fuer, hat_dokument_generator, dokument_typ)
    VALUES ($1,$2,$3,$4,$5,$6,$7,FALSE,NULL)
    ON CONFLICT (id) DO UPDATE SET
      title          = EXCLUDED.title,
      category       = EXCLUDED.category,
      beschreibung   = EXCLUDED.beschreibung,
      rechtsgrundlage= EXCLUDED.rechtsgrundlage,
      quelle_url     = EXCLUDED.quelle_url,
      gilt_fuer      = EXCLUDED.gilt_fuer,
      updated_at     = NOW()
  `, [
    appId,
    reg.name,
    category,
    reg.beschreibung,
    reg.rechtsgrundlage,
    reg.externe_url ?? '',
    JSON.stringify(giltFuer),
  ])
  upserted++

  jsonItems.push({
    id: appId,
    title: reg.name,
    category,
    beschreibung: reg.beschreibung,
    rechtsgrundlage: reg.rechtsgrundlage,
    quelle_url: reg.externe_url ?? '',
    gilt_fuer: giltFuer,
    hat_dokument_generator: false,
  })
}

// regulations.json aktualisieren: migrierte Einträge updaten + neue hinzufügen
const existingPath = resolve(ROOT, 'src/data/regulations.json')
const { readFileSync } = await import('fs')
const existing: { id: string }[] = JSON.parse(readFileSync(existingPath, 'utf-8'))
const migratedIds = new Set(jsonItems.map(r => (r as { id: string }).id))

// Bestehende Einträge: migrierte werden ersetzt, nicht-migrierte (manuell gepflegte) behalten
const kept = existing.filter(r => !migratedIds.has(r.id))
const merged = [...kept, ...jsonItems]
const newCount = jsonItems.filter(r => !new Set(existing.map(e => e.id)).has((r as { id: string }).id)).length

writeFileSync(existingPath, JSON.stringify(merged, null, 2), 'utf-8')

console.log(`✓ ${upserted} Regulierungen upserted in public.regulations`)
console.log(`✓ ${newCount} neue Einträge in regulations.json (${merged.length} gesamt, ${jsonItems.length} aus DB)`)
await db.end()
