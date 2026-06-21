import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import regulationsData from '../data/regulations.json'
import type { Regulation } from '../types'
import {
  durchschnittlichePflichtenAnzahl,
  durchschnittProGroessenklasse,
  pflichtenNachKategorie,
  geschaetzterZeitaufwand,
  MINUTEN_PRO_PFLICHT,
} from '../utils/statistik'

const regulations = regulationsData as Regulation[]
const ANZAHL_REGULATIONS = regulations.length

const TEILEN_TEXT_VORLAGE = (mittelwert: number, stunden: number) =>
  `Ein durchschnittliches deutsches KMU ist von ${mittelwert} gesetzlichen Pflichten betroffen – ` +
  `geschätzter Aufwand: ${stunden} Stunden pro Jahr. Datenbasis: ${ANZAHL_REGULATIONS} erfasste Vorschriften. ` +
  `#Bürokratieabbau`

function Balken({ label, wert, max, suffix = '' }: { label: string; wert: number; max: number; suffix?: string }) {
  const breite = Math.max(4, Math.round((wert / max) * 100))
  return (
    <div className="flex items-center gap-3">
      <span className="w-40 shrink-0 text-xs font-mono text-muted-dark">{label}</span>
      <div className="flex-1 h-7 bg-sand-mid rounded-md overflow-hidden">
        <div
          className="h-full bg-ink rounded-md flex items-center justify-end px-2"
          style={{ width: `${breite}%` }}
        >
          <span className="text-xs font-mono text-sand-light">{Math.round(wert)}{suffix}</span>
        </div>
      </div>
    </div>
  )
}

export default function Statistik() {
  const [kopiert, setKopiert] = useState(false)

  const { ergebnisse, mittelwert, median } = useMemo(() => durchschnittlichePflichtenAnzahl(regulations), [])
  const groessenklassen = useMemo(() => durchschnittProGroessenklasse(regulations), [])
  const kategorien = useMemo(() => pflichtenNachKategorie(regulations), [])
  const zeitaufwand = useMemo(() => geschaetzterZeitaufwand(mittelwert), [mittelwert])

  const mittelwertGerundet = Math.round(mittelwert)
  const maxGroesse = Math.max(...groessenklassen.map(g => g.mittelwert))
  const maxKategorie = Math.max(...kategorien.map(k => k.anzahl))

  async function teilen() {
    const text = TEILEN_TEXT_VORLAGE(mittelwertGerundet, zeitaufwand.stundenProJahr)
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({ title: 'ComplianceKit – Bürokratielast-Statistik', text, url })
        return
      } catch {
        // Nutzer hat Share-Dialog abgebrochen – Fallback auf Clipboard
      }
    }

    await navigator.clipboard.writeText(`${text} ${url}`)
    setKopiert(true)
    setTimeout(() => setKopiert(false), 2500)
  }

  return (
    <div className="min-h-screen bg-sand-light">
      <header className="border-b border-sand-border bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-ink rounded flex items-center justify-center">
            <span className="text-sand-light text-xs font-mono font-bold">CK</span>
          </div>
          <span className="font-serif text-ink text-lg">ComplianceKit</span>
        </div>
        <Link to="/" className="text-sm font-mono text-muted hover:text-ink transition-colors">
          ← Zur App
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">

        {/* ── Hero ── */}
        <div className="text-center mb-14">
          <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">
            Bürokratielast in Zahlen
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-4">
            Ein durchschnittliches deutsches KMU ist von{' '}
            <span className="text-teal-dark">{mittelwertGerundet}</span> gesetzlichen Pflichten betroffen
          </h1>
          <p className="text-sm font-sans text-muted-dark max-w-xl mx-auto">
            Berechnet aus {ANZAHL_REGULATIONS} erfassten Vorschriften, gemittelt über {ergebnisse.length}{' '}
            repräsentative Unternehmensprofile (verschiedene Rechtsformen, Größenklassen und Branchen).
            Median: {Math.round(median)} Pflichten.
          </p>

          <button
            onClick={teilen}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ink text-sand-light text-sm font-sans font-medium hover:bg-ink-light transition-colors"
          >
            {kopiert ? 'In Zwischenablage kopiert ✓' : 'Statistik teilen'}
          </button>
        </div>

        {/* ── Breakdown nach Unternehmensgröße ── */}
        <section className="bg-white border border-sand-border rounded-xl p-6 mb-8">
          <h2 className="font-serif text-xl text-ink mb-1">Pflichten wachsen mit der Unternehmensgröße</h2>
          <p className="text-xs font-mono text-muted mb-5 uppercase tracking-wider">
            Ø Anzahl relevanter Pflichten je Größenklasse
          </p>
          <div className="space-y-3">
            {groessenklassen.map(g => (
              <Balken key={g.label} label={g.label} wert={g.mittelwert} max={maxGroesse} />
            ))}
          </div>
          <p className="text-xs font-sans text-muted mt-4">
            Werte sind über {ergebnisse.length / groessenklassen.length} Branchen gemittelt, jeweils für das
            Bundesland Bayern berechnet (Bundesländer ohne Sonderregeln liefern identische Werte).
          </p>
        </section>

        {/* ── Breakdown nach Kategorie ── */}
        <section className="bg-white border border-sand-border rounded-xl p-6 mb-8">
          <h2 className="font-serif text-xl text-ink mb-1">Wo die Pflichten herkommen</h2>
          <p className="text-xs font-mono text-muted mb-5 uppercase tracking-wider">
            Anzahl Vorschriften je Kategorie (Gesamtdatenbasis, {ANZAHL_REGULATIONS} Einträge)
          </p>
          <div className="space-y-2.5">
            {kategorien.map(k => (
              <Balken key={k.kategorie} label={k.kategorie} wert={k.anzahl} max={maxKategorie} />
            ))}
          </div>
        </section>

        {/* ── Zeitaufwand ── */}
        <section className="bg-white border border-sand-border rounded-xl p-6 mb-8">
          <h2 className="font-serif text-xl text-ink mb-1">Geschätzter Zeitaufwand</h2>
          <p className="text-xs font-mono text-muted mb-4 uppercase tracking-wider">Grobe Schätzung, keine empirische Erhebung</p>
          <p className="font-serif text-3xl text-teal-dark mb-3">
            ≈ {zeitaufwand.stundenProJahr} Stunden / Jahr
          </p>
          <p className="text-sm font-sans text-muted-dark leading-relaxed">
            Diese Schätzung beruht auf der Annahme von <strong className="text-ink">{MINUTEN_PRO_PFLICHT} Minuten</strong>{' '}
            pro Pflicht für Erstprüfung (Verstehen, rechtliche Einordnung, ggf. Beratung) und laufende Pflege/Dokumentation
            pro Jahr, multipliziert mit der durchschnittlichen Pflichtenanzahl ({mittelwertGerundet}). Der tatsächliche
            Aufwand variiert stark je nach Unternehmen, Branche und vorhandenen Prozessen – die Zahl dient der
            Größenordnung, nicht der exakten Quantifizierung.
          </p>
        </section>

        {/* ── Disclaimer / Methodik ── */}
        <section className="bg-sand-mid border border-sand-border rounded-xl p-6 mb-12 text-sm font-sans text-muted-dark leading-relaxed">
          <h2 className="font-sans font-semibold text-ink text-sm mb-3">Datenbasis & Methodik</h2>
          <p className="mb-2">
            Grundlage dieser Statistik sind die {ANZAHL_REGULATIONS} in ComplianceKit erfassten gesetzlichen Pflichten
            (Stand: aktueller Datenbestand der Anwendung). Für jede Pflicht ist hinterlegt, für welche Rechtsformen,
            Branchen, Mitarbeitergrößen und Bundesländer sie gilt.
          </p>
          <p className="mb-2">
            Die Pflichtenanzahl pro Profil wird mit derselben Filterlogik berechnet, die auch im persönlichen
            Dashboard verwendet wird. Mittelwert und Median ergeben sich aus {ergebnisse.length} synthetischen
            Profilen (4 Größenklassen × 10 Branchen).
          </p>
          <p>
            Diese Seite ersetzt keine individuelle Rechtsberatung und erhebt keinen Anspruch auf Vollständigkeit.
            Sie dient der Einordnung der bürokratischen Gesamtbelastung für kleine und mittlere Unternehmen in
            Deutschland.{' '}
            <Link to="/" className="text-teal-dark hover:underline">Zur eigentlichen App →</Link>
          </p>
        </section>

      </main>
    </div>
  )
}
