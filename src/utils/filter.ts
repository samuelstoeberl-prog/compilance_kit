import type { Pflicht, PflichtMitStatus, PflichtStatus, Foerderung, UnternehmensProfil } from '../types'

export function filterPflichten(
  pflichten: Pflicht[],
  profil: UnternehmensProfil,
  statusMap: Record<string, PflichtStatus>
): PflichtMitStatus[] {
  return pflichten.map(p => {
    const b = p.bedingungen
    let relevant = true

    if (b.minMitarbeiter && profil.mitarbeiter < b.minMitarbeiter) relevant = false
    if (b.maxMitarbeiter && profil.mitarbeiter > b.maxMitarbeiter) relevant = false
    if (b.bundeslaender && !b.bundeslaender.includes(profil.bundesland)) relevant = false
    if (b.rechtsformen && !b.rechtsformen.includes(profil.rechtsform)) relevant = false

    const status: PflichtStatus = !relevant
      ? 'nicht_relevant'
      : (statusMap[p.id] ?? 'offen')

    return { ...p, status }
  })
}

export function filterFoerderungen(
  foerderungen: Foerderung[],
  profil: UnternehmensProfil
): { foerderung: Foerderung; relevant: boolean }[] {
  return foerderungen.map(f => {
    const b = f.bedingungen
    let relevant = true

    if (b.maxMitarbeiter && profil.mitarbeiter > b.maxMitarbeiter) relevant = false
    if (b.bundeslaender && !b.bundeslaender.includes(profil.bundesland)) relevant = false

    return { foerderung: f, relevant }
  }).sort((a, b) => Number(b.relevant) - Number(a.relevant))
}
