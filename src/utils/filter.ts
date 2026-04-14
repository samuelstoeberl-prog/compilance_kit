import type { Regulation, RegulationMitStatus, PflichtStatus, Funding, FundingMitScore, UnternehmensProfil } from '../types'

const MIT_MAP: Record<string, number> = {
  '1–9': 5,
  '10–49': 25,
  '50–249': 100,
  '250+': 500,
}

export function filterRegulations(
  regulations: Regulation[],
  profil: UnternehmensProfil,
  statusMap: Record<string, PflichtStatus>
): RegulationMitStatus[] {
  const mitZahl = MIT_MAP[profil.mitarbeiter] ?? 1

  return regulations.map(reg => {
    const g = reg.gilt_fuer
    let relevant = true

    if (g.rechtsformen[0] !== 'alle' && !g.rechtsformen.includes(profil.rechtsform)) relevant = false
    if (g.branchen && g.branchen[0] !== 'alle' && !g.branchen.includes(profil.branche)) relevant = false
    if (g.mitarbeiter_min && mitZahl < g.mitarbeiter_min) relevant = false
    if (g.bundeslaender && g.bundeslaender[0] !== 'alle' && !g.bundeslaender.includes(profil.bundesland)) relevant = false

    const status: PflichtStatus = !relevant
      ? 'nicht_relevant'
      : (statusMap[reg.id] ?? 'offen')

    return { ...reg, status }
  })
}

export function scoreFunding(funding: Funding, profil: UnternehmensProfil): number {
  const g = funding.gilt_fuer
  const mitZahl = MIT_MAP[profil.mitarbeiter] ?? 1

  if (g.mitarbeiter_max && mitZahl > g.mitarbeiter_max) return 0
  if (g.rechtsformen[0] !== 'alle' && !g.rechtsformen.includes(profil.rechtsform)) return 0
  if (g.bundeslaender && g.bundeslaender[0] !== 'alle' && !g.bundeslaender.includes(profil.bundesland)) return 0
  if (g.gruendungsjahr && !g.gruendungsjahr.includes(profil.gruendungsjahr)) return 0

  let score = 40
  const boost = funding.relevanz_boost ?? {}
  if (boost.branchen?.includes(profil.branche)) score += 20
  if (boost.mitarbeiter?.includes(profil.mitarbeiter)) score += 20
  if (g.bundeslaender && g.bundeslaender[0] !== 'alle') score += 10
  if (boost.gruendungsjahr?.includes(profil.gruendungsjahr)) score += 10

  return Math.min(score, 100)
}

export function sortedFundings(fundings: Funding[], profil: UnternehmensProfil): FundingMitScore[] {
  return fundings
    .map(f => ({ ...f, score: scoreFunding(f, profil) }))
    .filter(f => f.score > 0)
    .sort((a, b) => b.score - a.score)
}
