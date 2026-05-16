import type { CompanyProfile, FundingRow, RegulationRow } from '../types.js'

const MIT_MAP: Record<string, number> = {
  '0': 0,
  '1–9': 5,
  '10–49': 25,
  '50–249': 100,
  '250+': 500,
}

// Onboarding-Branche → normalisierter Wert (passend zu fundings boost-branchen)
const BRANCHE_NORM: Record<string, string> = {
  'Handwerk': 'Bau / Handwerk',
  'Baugewerbe': 'Bau / Handwerk',
  'Industrie & Fertigung': 'Produktion / Fertigung',
  'Einzelhandel': 'Handel / E-Commerce',
  'Großhandel': 'Handel / E-Commerce',
  'E-Commerce': 'Handel / E-Commerce',
  'IT-Dienstleistungen & Software': 'Software / IT',
  'KI & Hochtechnologie': 'Software / IT',
  'Unternehmensberatung & Agentur': 'Dienstleistungen',
  'Kreativwirtschaft': 'Dienstleistungen',
  'Gastronomie & Cafés': 'Gastronomie / Hotellerie',
  'Hotellerie & Beherbergung': 'Gastronomie / Hotellerie',
  'Gesundheitswesen & Soziales': 'Gesundheit / Pflege',
  'Freie Berufe (Recht, Steuern, Architektur)': 'Dienstleistungen',
  'Transport & Logistik': 'Transport',
  'Immobilienwesen': 'Dienstleistungen',
  'Land- & Forstwirtschaft': 'Landwirtschaft',
}

const BRANCHE_GRUPPE: Record<string, string> = {
  'Handwerk': 'handwerk',
  'Baugewerbe': 'handwerk',
  'Industrie & Fertigung': 'industrie',
  'Einzelhandel': 'handel',
  'Großhandel': 'handel',
  'E-Commerce': 'handel',
  'IT-Dienstleistungen & Software': 'it',
  'KI & Hochtechnologie': 'it',
  'Unternehmensberatung & Agentur': 'dienstleistung',
  'Kreativwirtschaft': 'dienstleistung',
  'Gastronomie & Cafés': 'gastronomie',
  'Hotellerie & Beherbergung': 'gastronomie',
  'Gesundheitswesen & Soziales': 'gesundheit',
  'Freie Berufe (Recht, Steuern, Architektur)': 'dienstleistung',
  'Transport & Logistik': 'transport',
  'Immobilienwesen': 'dienstleistung',
  'Land- & Forstwirtschaft': 'landwirtschaft',
}

const FUNDING_BRANCHE_AUSSCHLUSS: Record<string, string[]> = {
  'exist-gruenderstipendium': ['handwerk', 'handel', 'gastronomie', 'transport', 'landwirtschaft', 'dienstleistung'],
  'zim-innovationsfoerderung': ['handel', 'gastronomie', 'transport', 'landwirtschaft'],
  'forschungsbonus-kmu': ['handel', 'gastronomie', 'transport', 'landwirtschaft', 'dienstleistung'],
  'invest-zuschuss-wagniskapital': ['handwerk', 'gastronomie', 'transport', 'landwirtschaft'],
}

const FUNDING_ZWECK: Record<string, string[]> = {
  'kfw-digitalisierung':           ['digitalisierung', 'investition'],
  'go-digital-it-sicherheit':      ['digitalisierung', 'beratung'],
  'invest-zuschuss-wagniskapital': ['innovation', 'gruendung'],
  'bafa-energieberatung':          ['energie', 'beratung'],
  'forschungsbonus-kmu':           ['innovation'],
  'digitalbonus-bayern':           ['digitalisierung'],
  'foerderung-berufsausbildung':   ['mitarbeiter'],
  'gruendungszuschuss':            ['gruendung'],
  'exist-gruenderstipendium':      ['gruendung', 'innovation'],
  'zim-innovationsfoerderung':     ['innovation'],
  'de-minimis':                    ['investition', 'gruendung', 'digitalisierung', 'energie', 'mitarbeiter', 'internationalisierung'],
}

// ── Förderung-Scoring ─────────────────────────────────────────────────────────

export function scoreFunding(f: FundingRow, p: CompanyProfile): number {
  const mitZahl = MIT_MAP[p.mitarbeiter] ?? 0
  const brancheGruppe = BRANCHE_GRUPPE[p.branche] ?? 'sonstige'
  const brancheNorm = BRANCHE_NORM[p.branche] ?? p.branche
  const foerderzweck = p.foerderzweck ?? []

  const gf = f.gilt_fuer as {
    rechtsformen: string[]
    mitarbeiter_max?: number | null
    umsatz_max?: string | null
    bundeslaender?: string[]
    gruendungsjahr?: string[]
  }
  const boost = (f.relevanz_boost ?? {}) as {
    branchen?: string[]
    mitarbeiter?: string[]
    gruendungsjahr?: string[]
  }

  // Harte Ausschlüsse
  if (gf.mitarbeiter_max != null && mitZahl > gf.mitarbeiter_max) return 0
  if (gf.rechtsformen[0] !== 'alle' && !gf.rechtsformen.includes(p.rechtsform)) return 0
  if (gf.bundeslaender && gf.bundeslaender[0] !== 'alle' && !gf.bundeslaender.includes(p.bundesland)) return 0
  if (gf.gruendungsjahr && !gf.gruendungsjahr.includes(p.gruendungsjahr)) return 0

  if (gf.umsatz_max) {
    const limit = umsatzMaxToNum(gf.umsatz_max)
    if (umsatzToNum(p.umsatz) > limit) return 0
  }

  const ausschluss = FUNDING_BRANCHE_AUSSCHLUSS[f.id] ?? []
  if (ausschluss.includes(brancheGruppe)) return 0

  const programmZwecke = FUNDING_ZWECK[f.id] ?? []
  if (foerderzweck.length > 0 && programmZwecke.length > 0) {
    const hatOverlap = foerderzweck.some(z => programmZwecke.includes(z))
    if (!hatOverlap) return 0
  }

  // Relevanz-Score
  let score = 40

  const brancheBoost = boost.branchen?.some(b => b === p.branche || b === brancheNorm) ?? false
  if (brancheBoost) score += 25

  if (boost.mitarbeiter?.includes(p.mitarbeiter)) score += 15

  if (gf.bundeslaender && gf.bundeslaender[0] !== 'alle') score += 10

  if (boost.gruendungsjahr?.includes(p.gruendungsjahr)) score += 5

  if (foerderzweck.length > 0 && programmZwecke.length > 0) {
    const treffer = foerderzweck.filter(z => programmZwecke.includes(z)).length
    score += Math.min(treffer * 10, 15)
  }

  if ((f.max_betrag ?? 0) > 500_000) score += 3
  if ((f.max_betrag ?? 0) > 1_000_000) score += 3

  return Math.min(score, 100)
}

// ── Regulierung-Scoring ───────────────────────────────────────────────────────

export function scoreRegulation(r: RegulationRow, p: CompanyProfile): number {
  const mitZahl = MIT_MAP[p.mitarbeiter] ?? 0
  const brancheNorm = BRANCHE_NORM[p.branche] ?? p.branche

  const gf = r.gilt_fuer as {
    rechtsformen: string[]
    branchen?: string[]
    mitarbeiter_min?: number
    bundeslaender?: string[]
  }

  if (gf.rechtsformen[0] !== 'alle' && !gf.rechtsformen.includes(p.rechtsform)) return 0

  if (gf.branchen && gf.branchen[0] !== 'alle') {
    const match = gf.branchen.some(b => b === p.branche || b === brancheNorm)
    if (!match) return 0
  }

  if (gf.mitarbeiter_min && mitZahl < gf.mitarbeiter_min) return 0
  if (gf.bundeslaender && gf.bundeslaender[0] !== 'alle' && !gf.bundeslaender.includes(p.bundesland)) return 0

  // NIS2: nur für kritische Infrastruktur-Branchen ab 50 MA
  if (r.category === 'IT-Sicherheit' && /nis2/i.test(r.title)) {
    const NIS2_GRUPPEN = ['it', 'industrie', 'gesundheit', 'transport']
    const gruppe = BRANCHE_GRUPPE[p.branche] ?? 'sonstige'
    if (mitZahl < 50) return 0
    if (!NIS2_GRUPPEN.includes(gruppe)) return 0
  }

  // LkSG: erst ab 1.000 MA (Proxy: 250+ Kategorie = min. 500)
  if (/lieferkette|lksg/i.test(r.title) && mitZahl < 250) return 0

  return 100
}

// ── Hilfsfunktionen ───────────────────────────────────────────────────────────

function umsatzToNum(umsatz: string): number {
  const map: Record<string, number> = {
    'unter 22.000 €': 15_000,
    '22.000 – 50.000 €': 36_000,
    '50.000 – 100.000 €': 75_000,
    '100.000 – 500.000 €': 300_000,
    '500.000 € – 1 Mio. €': 750_000,
    '1 – 2 Mio. €': 1_500_000,
    '2 – 10 Mio. €': 6_000_000,
    '10 – 50 Mio. €': 30_000_000,
    'über 50 Mio. €': 100_000_000,
  }
  return map[umsatz] ?? 0
}

function umsatzMaxToNum(umsatzMax: string): number {
  const mioMatch = umsatzMax.match(/([\d,.]+)\s*Mio/)
  if (mioMatch) return parseFloat(mioMatch[1].replace(',', '.')) * 1_000_000
  return Infinity
}
