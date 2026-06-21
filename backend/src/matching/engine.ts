// ═══════════════════════════════════════════════════════════════════════════
//  Matching-Engine – verknüpft Firmenprofil mit Förderungen & Pflichten
//  Regelbasiert: kein AI, keine externen Abhängigkeiten
// ═══════════════════════════════════════════════════════════════════════════

import { db } from '../db/client.js'
import { scoreFunding, scoreRegulation } from './scoring.js'
import type { CompanyProfile, FundingRow, RegulationRow } from '../types.js'

export interface MatchedFunding extends FundingRow {
  score: number
}

export interface MatchedRegulation extends RegulationRow {
  score: number
  status: 'offen' | 'erledigt' | 'nicht_relevant'
}

// ── Förderungen matchen ───────────────────────────────────────────────────────

export async function matchFundings(
  companyId: string,
  profil: CompanyProfile,
  opts: { limit?: number; minScore?: number } = {}
): Promise<MatchedFunding[]> {
  const { limit = 50, minScore = 1 } = opts

  // Alle Förderungen aus DB holen (gecacht via PostgreSQL)
  const { rows } = await db.query<FundingRow>('SELECT * FROM fundings ORDER BY max_betrag DESC NULLS LAST')

  const scored: MatchedFunding[] = rows
    .map(f => ({ ...f, score: scoreFunding(f, profil) }))
    .filter(f => f.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  // Matching-Ergebnis in Cache schreiben (für spätere Analyse)
  if (scored.length > 0) {
    const values = scored.map((f, i) =>
      `($1, 'funding', $${i * 2 + 2}, $${i * 2 + 3})`
    ).join(', ')

    const params: unknown[] = [companyId]
    scored.forEach(f => { params.push(f.id, f.score) })

    await db.query(`
      INSERT INTO match_cache (company_id, type, item_id, score)
      VALUES ${values}
      ON CONFLICT (company_id, type, item_id) DO UPDATE
        SET score = EXCLUDED.score, computed_at = NOW()
    `, params)
  }

  return scored
}

// ── Regulierungen matchen ─────────────────────────────────────────────────────

export async function matchRegulations(
  companyId: string,
  profil: CompanyProfile,
): Promise<MatchedRegulation[]> {
  // Regulierungen + Status des Unternehmens in einem Query
  const { rows } = await db.query<RegulationRow & { status?: string }>(`
    SELECT r.*, rs.status
    FROM regulations r
    LEFT JOIN regulation_status rs
      ON rs.regulation_id = r.id AND rs.company_id = $1
    ORDER BY r.category, r.title
  `, [companyId])

  return rows.map(r => {
    const score = scoreRegulation(r, profil)
    const status = score === 0
      ? 'nicht_relevant'
      : ((r.status as 'offen' | 'erledigt' | 'nicht_relevant') ?? 'offen')

    return { ...r, score, status }
  })
}

// ── Status einer Regulierung aktualisieren ────────────────────────────────────

export async function updateRegulationStatus(
  companyId: string,
  regulationId: string,
  status: 'offen' | 'erledigt' | 'nicht_relevant',
): Promise<void> {
  await db.query(`
    INSERT INTO regulation_status (company_id, regulation_id, status)
    VALUES ($1, $2, $3)
    ON CONFLICT (company_id, regulation_id) DO UPDATE
      SET status = EXCLUDED.status, updated_at = NOW()
  `, [companyId, regulationId, status])
}

// ── Dashboard-Zusammenfassung ─────────────────────────────────────────────────

export async function getDashboardSummary(companyId: string, profil: CompanyProfile) {
  const [fundings, regulations] = await Promise.all([
    matchFundings(companyId, profil, { limit: 5 }),
    matchRegulations(companyId, profil),
  ])

  const relevant = regulations.filter(r => r.status !== 'nicht_relevant')
  const erledigt = relevant.filter(r => r.status === 'erledigt')
  const gesamtFoerdervolumen = fundings.reduce((sum, f) => sum + (f.max_betrag ?? 0), 0)

  return {
    compliance_prozent: relevant.length > 0
      ? Math.round((erledigt.length / relevant.length) * 100)
      : 0,
    offene_pflichten: relevant.filter(r => r.status === 'offen').length,
    top_foerderungen: fundings.slice(0, 3),
    max_foerdervolumen: gesamtFoerdervolumen,
    kategorien: [...new Set(relevant.map(r => r.category))],
  }
}
