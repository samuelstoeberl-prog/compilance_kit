import type { Regulation, UnternehmensProfil } from '../types'

// ── Matching-Logik, identisch zu filterRegulations() in filter.ts ─────────
// (hier ohne Status, da die Statistikseite keinen eingeloggten Nutzer kennt)

const MIT_MAP: Record<string, number> = {
  '0': 0,
  '1–9': 5,
  '10–49': 25,
  '50–249': 100,
  '250+': 500,
}

type StatistikProfil = Pick<UnternehmensProfil, 'rechtsform' | 'branche' | 'mitarbeiter' | 'bundesland'>

function istRelevant(reg: Regulation, profil: StatistikProfil): boolean {
  const g = reg.gilt_fuer
  const mitZahl = MIT_MAP[profil.mitarbeiter] ?? 0

  if (g.rechtsformen[0] !== 'alle' && !g.rechtsformen.includes(profil.rechtsform)) return false
  if (g.branchen && g.branchen[0] !== 'alle' && !g.branchen.includes(profil.branche)) return false
  if (g.mitarbeiter_min !== undefined && g.mitarbeiter_min > 0 && mitZahl < g.mitarbeiter_min) return false
  if (g.bundeslaender && g.bundeslaender[0] !== 'alle' && !g.bundeslaender.includes(profil.bundesland)) return false

  return true
}

/** Anzahl der Pflichten, die für ein bestimmtes Profil relevant sind. */
export function berechnePflichtenProProfil(regulations: Regulation[], profil: StatistikProfil): number {
  return regulations.filter(r => istRelevant(r, profil)).length
}

// ── Repräsentative Standard-Profile ────────────────────────────────────────
// Bundesland und Branche sind so gewählt, dass keine landes- oder
// branchenspezifischen Sonderregeln über- oder unterrepräsentiert werden:
// ein "neutrales" Bundesland (Bayern, größte Stichprobe an Bundesländern in
// den Daten ist ohnehin meist "alle") und eine breite Auswahl an Branchen.

const BRANCHEN_FUER_DURCHSCHNITT = [
  'Handwerk', 'Industrie & Fertigung', 'Einzelhandel', 'E-Commerce',
  'IT-Dienstleistungen & Software', 'Unternehmensberatung & Agentur',
  'Gastronomie & Cafés', 'Gesundheitswesen & Soziales',
  'Transport & Logistik', 'Land- & Forstwirtschaft',
]

const GROESSEN_PROFILE: { label: string; rechtsform: string; mitarbeiter: string }[] = [
  { label: 'Einzelunternehmen, Solo', rechtsform: 'Einzelunternehmen', mitarbeiter: '0' },
  { label: 'Einzelunternehmen, 1–9 MA', rechtsform: 'Einzelunternehmen', mitarbeiter: '1–9' },
  { label: 'GmbH, 10–49 MA', rechtsform: 'GmbH', mitarbeiter: '10–49' },
  { label: 'GmbH, 50–249 MA', rechtsform: 'GmbH', mitarbeiter: '50–249' },
]

const BUNDESLAND_FUER_DURCHSCHNITT = 'Bayern'

export interface ProfilErgebnis {
  label: string
  branche: string
  rechtsform: string
  mitarbeiter: string
  anzahlPflichten: number
}

/**
 * Berechnet die Anzahl relevanter Pflichten für jede Kombination aus
 * GROESSEN_PROFILE × BRANCHEN_FUER_DURCHSCHNITT und liefert zusätzlich
 * Mittelwert und Median über alle Kombinationen.
 */
export function durchschnittlichePflichtenAnzahl(regulations: Regulation[]): {
  ergebnisse: ProfilErgebnis[]
  mittelwert: number
  median: number
} {
  const ergebnisse: ProfilErgebnis[] = []

  for (const groesse of GROESSEN_PROFILE) {
    for (const branche of BRANCHEN_FUER_DURCHSCHNITT) {
      const profil: StatistikProfil = {
        rechtsform: groesse.rechtsform,
        branche,
        mitarbeiter: groesse.mitarbeiter,
        bundesland: BUNDESLAND_FUER_DURCHSCHNITT,
      }
      ergebnisse.push({
        label: groesse.label,
        branche,
        rechtsform: groesse.rechtsform,
        mitarbeiter: groesse.mitarbeiter,
        anzahlPflichten: berechnePflichtenProProfil(regulations, profil),
      })
    }
  }

  const werte = ergebnisse.map(e => e.anzahlPflichten).sort((a, b) => a - b)
  const mittelwert = werte.reduce((s, v) => s + v, 0) / werte.length
  const mid = Math.floor(werte.length / 2)
  const median = werte.length % 2 === 0 ? (werte[mid - 1] + werte[mid]) / 2 : werte[mid]

  return { ergebnisse, mittelwert, median }
}

/** Durchschnittliche Pflichtenanzahl gruppiert nach Größenklasse (für das Breakdown nach Unternehmensgröße). */
export function durchschnittProGroessenklasse(regulations: Regulation[]): { label: string; mittelwert: number }[] {
  return GROESSEN_PROFILE.map(groesse => {
    const werte = BRANCHEN_FUER_DURCHSCHNITT.map(branche =>
      berechnePflichtenProProfil(regulations, {
        rechtsform: groesse.rechtsform,
        branche,
        mitarbeiter: groesse.mitarbeiter,
        bundesland: BUNDESLAND_FUER_DURCHSCHNITT,
      })
    )
    return { label: groesse.label, mittelwert: werte.reduce((s, v) => s + v, 0) / werte.length }
  })
}

/** Gruppierung aller Pflichten nach category-Feld (unabhängig von einem Profil – Gesamtdatenbasis). */
export function pflichtenNachKategorie(regulations: Regulation[]): { kategorie: string; anzahl: number }[] {
  const counts = new Map<string, number>()
  for (const r of regulations) {
    counts.set(r.category, (counts.get(r.category) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([kategorie, anzahl]) => ({ kategorie, anzahl }))
    .sort((a, b) => b.anzahl - a.anzahl)
}

// Hinweis: Eine Gruppierung nach "Bundesrecht vs. Landesrecht" anhand des
// rechtsgrundlage-Felds (z.B. "§", "DSGVO", "Art.") wurde bewusst NICHT
// umgesetzt, da das Feld keine zuverlässige, strukturierte Unterscheidung
// zwischen Bundes- und Landesrecht erlaubt (z.B. enthalten viele
// landesspezifische Vorschriften ebenfalls "§"-Verweise). Eine Heuristik
// auf Basis von Freitext würde hier falsche Präzision suggerieren.

// ── Zeitaufwand-Schätzung ──────────────────────────────────────────────────
// Dokumentierte Annahme: 90 Minuten pro Pflicht für Erstprüfung (Verstehen,
// Einordnen, ggf. Rechtsberatung) + laufende Pflege/Dokumentation pro Jahr.
// Dies ist eine GROBE Schätzung, keine empirisch erhobene Zahl – sie muss
// auf der Seite als solche mit der Annahme sichtbar gemacht werden.
export const MINUTEN_PRO_PFLICHT = 90

export function geschaetzterZeitaufwand(anzahlPflichten: number): { stundenProJahr: number; minutenProPflicht: number } {
  return {
    stundenProJahr: Math.round((anzahlPflichten * MINUTEN_PRO_PFLICHT) / 60),
    minutenProPflicht: MINUTEN_PRO_PFLICHT,
  }
}
