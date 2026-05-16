// Scoring-Logik: Wie gut passt ein Programm/eine Pflicht zum Unternehmen?
// Score 0 = nicht anwendbar, 1–100 = Relevanz-Grad

import type { CompanyProfile, FundingRow, RegulationRow } from '../types.js'

const MIT_MAP: Record<string, number> = {
  '1–9': 5, '10–49': 25, '50–249': 100, '250+': 500,
}

// ── Förderung-Scoring ─────────────────────────────────────────────────────────

export function scoreFunding(f: FundingRow, p: CompanyProfile): number {
  const mitZahl = MIT_MAP[p.mitarbeiter] ?? 1
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

  // ── Harte Ausschlüsse (Score = 0) ────────────────────────────────────────
  if (gf.mitarbeiter_max && mitZahl > gf.mitarbeiter_max) return 0
  if (gf.rechtsformen[0] !== 'alle' && !gf.rechtsformen.includes(p.rechtsform)) return 0
  if (gf.bundeslaender && gf.bundeslaender[0] !== 'alle' && !gf.bundeslaender.includes(p.bundesland)) return 0
  if (gf.gruendungsjahr && !gf.gruendungsjahr.includes(p.gruendungsjahr)) return 0

  // ── Umsatz-Grenze prüfen ─────────────────────────────────────────────────
  if (gf.umsatz_max) {
    const limitMio = parseFloat(gf.umsatz_max.replace(',', '.')) || null
    const unternehmensUmsatzMio = umsatzToMio(p.umsatz)
    if (limitMio && unternehmensUmsatzMio > limitMio) return 0
  }

  // ── Relevanz-Score berechnen ──────────────────────────────────────────────
  let score = 40 // Basis: grundsätzlich anwendbar

  if (boost.branchen?.includes(p.branche)) score += 25       // Branche passt perfekt
  if (boost.mitarbeiter?.includes(p.mitarbeiter)) score += 20 // Größe passt perfekt
  if (gf.bundeslaender && gf.bundeslaender[0] !== 'alle') score += 10  // Regionaler Bonus
  if (boost.gruendungsjahr?.includes(p.gruendungsjahr)) score += 5

  // Bonus für hohe Fördersummen
  if ((f.max_betrag ?? 0) > 500_000) score += 5
  if ((f.max_betrag ?? 0) > 1_000_000) score += 5

  return Math.min(score, 100)
}

// ── Regulierung-Scoring ───────────────────────────────────────────────────────

export function scoreRegulation(r: RegulationRow, p: CompanyProfile): number {
  const mitZahl = MIT_MAP[p.mitarbeiter] ?? 1
  const gf = r.gilt_fuer as {
    rechtsformen: string[]
    branchen?: string[]
    mitarbeiter_min?: number
    bundeslaender?: string[]
  }

  // ── Harte Ausschlüsse ────────────────────────────────────────────────────
  if (gf.rechtsformen[0] !== 'alle' && !gf.rechtsformen.includes(p.rechtsform)) return 0
  if (gf.branchen && gf.branchen[0] !== 'alle' && !gf.branchen.includes(p.branche)) return 0
  if (gf.mitarbeiter_min && mitZahl < gf.mitarbeiter_min) return 0
  if (gf.bundeslaender && gf.bundeslaender[0] !== 'alle' && !gf.bundeslaender.includes(p.bundesland)) return 0

  // NIS2-Spezialregel: nur für bestimmte Branchen ab 50 MA
  if (r.category === 'IT-Sicherheit' && /nis2/i.test(r.title)) {
    const NIS2_BRANCHEN = ['Software / IT', 'Energie', 'Transport', 'Gesundheit', 'Wasser', 'Finanzen']
    if (mitZahl < 50) return 0
    if (!NIS2_BRANCHEN.some(b => p.branche.includes(b))) return 0
  }

  // LkSG: erst ab 3.000 MA (2024: ab 1.000)
  if (/lieferkette|lksg/i.test(r.title) && mitZahl < 250) return 0

  return 100 // Pflicht gilt → maximale Relevanz
}

// ── Hilfsfunktion: Umsatz-String → Mio. €  ───────────────────────────────────

function umsatzToMio(umsatz: string): number {
  const map: Record<string, number> = {
    'unter 1 Mio. €': 0.5,
    '1–5 Mio. €': 3,
    '5–10 Mio. €': 7.5,
    '10–50 Mio. €': 30,
    '50–250 Mio. €': 150,
    'über 250 Mio. €': 500,
  }
  return map[umsatz] ?? 0
}
