import { useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { useProfil } from '../context/ProfilContext'
import { sortedFundings, filterRegulations } from '../utils/filter'
import fundingData from '../data/fundings.json'
import regulationData from '../data/regulations.json'
import type { Funding, Regulation } from '../types'

const TYP_COLORS: Record<string, string> = {
  'Zuschuss':          'bg-teal-light text-teal-dark',
  'Kredit':            'bg-blue-100 text-blue-700',
  'Steuervorteil':     'bg-yellow-100 text-yellow-700',
  'Bürgschaft':        'bg-orange-100 text-orange-700',
  'Beteiligung':       'bg-purple-100 text-purple-700',
  'Beratungszuschuss': 'bg-green-100 text-green-700',
}

export default function PreviewPage() {
  const { profil } = useProfil()
  const { isSignedIn } = useAuth()
  const navigate = useNavigate()

  // Kein Profil → zurück zum Onboarding
  if (!profil) {
    navigate('/onboarding')
    return null
  }

  // Eingeloggte Nutzer haben das Dashboard
  if (isSignedIn) {
    navigate('/dashboard')
    return null
  }

  const fundings = useMemo(
    () => sortedFundings(fundingData as Funding[], profil),
    [profil]
  )
  const regulations = useMemo(
    () => filterRegulations(regulationData as Regulation[], profil, {}),
    [profil]
  )

  const topFundings = fundings.slice(0, 5)
  const hiddenCount = Math.max(0, fundings.length - 5)

  return (
    <div className="min-h-screen bg-sand-light font-sans pb-32">

      {/* Header */}
      <header className="bg-white border-b border-sand-border px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-ink rounded flex items-center justify-center">
            <span className="text-sand-light text-xs font-mono font-bold">CK</span>
          </div>
          <span className="font-serif text-ink text-lg">ComplianceKit</span>
        </div>
        <button
          onClick={() => navigate('/onboarding')}
          className="text-xs font-mono text-muted hover:text-ink transition-colors"
        >
          ← Profil bearbeiten
        </button>
      </header>

      <div className="max-w-3xl mx-auto px-6 pt-10">

        {/* Personalisierter Titel */}
        <div className="mb-8">
          <p className="text-xs font-mono text-teal-dark uppercase tracking-widest mb-2">
            Ihr persönliches Ergebnis
          </p>
          <h1 className="font-serif text-3xl text-ink leading-snug">
            {profil.name}
          </h1>
          <p className="text-sm text-muted-dark font-sans mt-1">
            {profil.rechtsform} · {profil.branche} · {profil.bundesland} · {profil.mitarbeiter} Mitarbeiter
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-white border border-sand-border rounded-xl p-5">
            <div className="font-serif text-4xl text-ink leading-none">{fundings.length}</div>
            <div className="text-sm font-sans text-muted-dark mt-1">passende Förderprogramme</div>
            <div className="text-xs font-mono text-teal-dark mt-2">
              {fundings.filter(f => f.score >= 80).length} mit sehr hoher Relevanz
            </div>
          </div>
          <div className="bg-white border border-sand-border rounded-xl p-5">
            <div className="font-serif text-4xl text-ink leading-none">
              {regulations.filter(r => r.status !== 'nicht_relevant').length}
            </div>
            <div className="text-sm font-sans text-muted-dark mt-1">anwendbare Rechtspflichten</div>
            <div className="text-xs font-mono text-amber-dark mt-2">
              {regulations.filter(r => r.hat_dokument_generator).length} mit Dokument-Generator
            </div>
          </div>
        </div>

        {/* Top Förderungen */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl text-ink">Top-Förderungen für Sie</h2>
            <span className="text-xs font-mono text-muted">{fundings.length} gesamt</span>
          </div>

          <div className="space-y-3">
            {topFundings.map(f => (
              <div key={f.id} className="bg-white border border-sand-border rounded-xl p-5 flex items-start gap-4">
                <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex flex-col items-center justify-center border ${
                  f.score >= 80 ? 'bg-teal-light border-teal/30'
                  : f.score >= 60 ? 'bg-amber-light border-amber/30'
                  : 'bg-sand-mid border-sand-border'
                }`}>
                  <span className={`text-sm font-mono font-bold leading-none ${
                    f.score >= 80 ? 'text-teal-dark' : f.score >= 60 ? 'text-amber-dark' : 'text-muted-dark'
                  }`}>{f.score}</span>
                  <span className="text-xs font-mono text-muted leading-none">%</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="font-sans font-semibold text-sm text-ink">{f.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${TYP_COLORS[f.typ] ?? 'bg-sand-mid text-muted-dark'}`}>
                      {f.typ}
                    </span>
                  </div>
                  <p className="text-xs text-muted font-sans">{f.foerderer}</p>
                  {f.max_betrag && (
                    <p className="text-xs font-mono text-ink mt-1">
                      Max. {f.max_betrag >= 1_000_000
                        ? `${(f.max_betrag / 1_000_000).toFixed(1)} Mio. €`
                        : `${(f.max_betrag / 1000).toFixed(0)}k €`}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Weitere Ergebnisse verschwommen */}
          {hiddenCount > 0 && (
            <div className="relative mt-3">
              <div className="space-y-3 opacity-30 pointer-events-none select-none">
                {fundings.slice(5, 8).map(f => (
                  <div key={f.id} className="bg-white border border-sand-border rounded-xl p-5 h-20" />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sand-light flex items-end justify-center pb-4">
                <p className="text-sm font-sans text-muted-dark">
                  + {hiddenCount} weitere Förderungen nach dem Einloggen
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-sand-border px-6 py-4 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-sans font-semibold text-ink">
              Ergebnisse speichern & Dokumente generieren
            </p>
            <p className="text-xs font-sans text-muted-dark mt-0.5">
              Kostenloses Konto · Daten bleiben erhalten · Keine Kreditkarte
            </p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="flex-shrink-0 bg-ink text-sand-light px-6 py-3 rounded-lg font-sans font-medium text-sm hover:bg-ink-light transition-colors whitespace-nowrap"
          >
            Jetzt kostenlos starten →
          </button>
        </div>
      </div>

      {/* Minimal Footer */}
      <div className="max-w-3xl mx-auto px-6 pt-4 pb-2 flex gap-4">
        <Link to="/impressum" className="text-xs text-muted hover:text-ink font-sans transition-colors">Impressum</Link>
        <Link to="/datenschutz" className="text-xs text-muted hover:text-ink font-sans transition-colors">Datenschutz</Link>
      </div>
    </div>
  )
}
