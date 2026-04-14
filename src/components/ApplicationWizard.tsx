import { useState } from 'react'
import type { FundingMitScore, UnternehmensProfil } from '../types'

interface Props {
  funding: FundingMitScore
  profil: UnternehmensProfil
  onClose: () => void
}

export default function ApplicationWizard({ funding, profil, onClose }: Props) {
  const [phase, setPhase] = useState<1 | 2 | 3>(1)

  const autoCount = funding.benoetigte_dokumente.filter(d => d.auto).length
  const totalCount = funding.benoetigte_dokumente.length

  const isEligible = (() => {
    const g = funding.gilt_fuer
    if (g.rechtsformen[0] !== 'alle' && !g.rechtsformen.includes(profil.rechtsform)) return false
    if (g.bundeslaender && g.bundeslaender[0] !== 'alle' && !g.bundeslaender.includes(profil.bundesland)) return false
    return true
  })()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-ink/60 backdrop-blur-sm" onClick={onClose}>
      <div className="h-full w-full max-w-xl bg-ink-light border-l border-ink-border overflow-y-auto flex flex-col"
        onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-ink-border flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-muted uppercase tracking-wider mb-1">Antrag vorbereiten</p>
            <h2 className="font-serif text-xl text-sand-light">{funding.title}</h2>
            <p className="text-sm text-muted font-sans mt-1">{funding.foerderer}</p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-sand-light text-xl leading-none mt-1">×</button>
        </div>

        {/* Phase nav */}
        <div className="flex border-b border-ink-border">
          {([1, 2, 3] as const).map(p => (
            <button key={p} onClick={() => setPhase(p)}
              className={`flex-1 py-3 text-xs font-mono uppercase tracking-wider transition-colors ${
                phase === p ? 'text-sand border-b-2 border-sand' : 'text-muted hover:text-sand-light'
              }`}>
              {p === 1 ? '01 Berechtigung' : p === 2 ? '02 Unterlagen' : '03 Einreichen'}
            </button>
          ))}
        </div>

        <div className="flex-1 p-6">
          {/* Phase 1 */}
          {phase === 1 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">Voraussetzungen</p>
                <div className="space-y-2">
                  {[
                    `Rechtsform: ${profil.rechtsform}`,
                    `Mitarbeiterzahl: ${profil.mitarbeiter}`,
                    `Bundesland: ${profil.bundesland}`,
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-teal text-sm">✓</span>
                      <span className="text-sand-light text-sm font-sans">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {funding.ausschlusskriterien.length > 0 && (
                <div>
                  <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">Ausschlusskriterien prüfen</p>
                  <div className="space-y-2">
                    {funding.ausschlusskriterien.map((k, i) => (
                      <div key={i} className="flex items-start gap-3 bg-amber-dark/20 border border-amber-dark/30 rounded-lg px-3 py-2">
                        <span className="text-amber text-sm mt-0.5">⚠</span>
                        <span className="text-amber-light text-sm font-sans">{k}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={`rounded-xl p-4 border ${isEligible ? 'bg-teal-dark/20 border-teal-dark/40' : 'bg-amber-dark/20 border-amber-dark/40'}`}>
                <div className="flex items-center gap-3">
                  <span className={`text-2xl ${isEligible ? 'text-teal' : 'text-amber'}`}>{isEligible ? '✓' : '!'}</span>
                  <div>
                    <p className={`font-sans font-semibold text-sm ${isEligible ? 'text-teal' : 'text-amber'}`}>
                      {isEligible ? 'Sie sind voraussichtlich antragsberechtigt' : 'Bitte Ausschlusskriterien manuell prüfen'}
                    </p>
                    <p className="text-muted text-xs font-sans mt-0.5">Angaben basieren auf Ihrem Unternehmensprofil</p>
                  </div>
                </div>
              </div>

              <button onClick={() => setPhase(2)}
                className="w-full bg-sand text-ink py-2.5 rounded-lg text-sm font-sans font-medium hover:bg-sand-mid transition-colors">
                Weiter zu Unterlagen →
              </button>
            </div>
          )}

          {/* Phase 2 */}
          {phase === 2 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">
                  Benötigte Unterlagen — {autoCount} von {totalCount} aus Ihrem Profil
                </p>
                <div className="space-y-2">
                  {funding.benoetigte_dokumente.map((doc, i) => (
                    <div key={i} className={`flex items-center gap-3 rounded-lg px-4 py-3 border ${
                      doc.auto ? 'bg-teal-dark/20 border-teal-dark/30' : 'bg-ink border-ink-border'
                    }`}>
                      <span className={`text-sm ${doc.auto ? 'text-teal' : 'text-amber'}`}>
                        {doc.auto ? '✓' : '○'}
                      </span>
                      <span className="text-sand-light text-sm font-sans flex-1">{doc.name}</span>
                      <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                        doc.auto ? 'bg-teal-dark/40 text-teal' : 'bg-amber-dark/30 text-amber'
                      }`}>
                        {doc.auto ? 'aus Profil' : 'manuell'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">Bearbeitungszeit</p>
                <div className="flex items-center gap-3">
                  {['Antrag', 'Prüfung', 'Auszahlung'].map((label, i) => (
                    <div key={i} className="flex-1">
                      <div className="h-1.5 bg-ink-border rounded-full">
                        <div className="h-1.5 bg-sand rounded-full" style={{ width: `${(i + 1) * 33}%` }} />
                      </div>
                      <p className="text-xs text-muted font-mono mt-1">{label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted font-sans mt-2">
                  Typisch {funding.bearbeitungszeit_wochen[0]}–{funding.bearbeitungszeit_wochen[1]} Wochen gesamt
                </p>
              </div>

              <button onClick={() => setPhase(3)}
                className="w-full bg-sand text-ink py-2.5 rounded-lg text-sm font-sans font-medium hover:bg-sand-mid transition-colors">
                Weiter zur Einreichung →
              </button>
            </div>
          )}

          {/* Phase 3 */}
          {phase === 3 && (
            <div className="space-y-6">
              <div className="bg-ink border border-ink-border rounded-xl p-4">
                <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">Zusammenfassung</p>
                <div className="space-y-2 text-sm font-sans">
                  {[
                    ['Förderung', funding.title],
                    ['Typ', funding.typ],
                    ['Max. Betrag', funding.max_betrag ? (funding.max_betrag >= 1000000 ? `${(funding.max_betrag / 1000000).toFixed(1)} Mio. €` : `${(funding.max_betrag / 1000).toFixed(0)}k €`) : '–'],
                    ['Unterlagen bereit', `${autoCount} / ${totalCount}`],
                    ['Bearbeitungszeit', `${funding.bearbeitungszeit_wochen[0]}–${funding.bearbeitungszeit_wochen[1]} Wochen`],
                  ].map(([label, value], i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-muted">{label}</span>
                      <span className={label === 'Unterlagen bereit' ? 'text-teal' : 'text-sand-light'}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a href={funding.antrag_url} target="_blank" rel="noopener noreferrer"
                className="block w-full bg-sand text-ink py-3 rounded-lg text-sm font-sans font-semibold text-center hover:bg-sand-mid transition-colors">
                Jetzt Antrag stellen →
              </a>
              <p className="text-xs text-muted font-sans text-center">
                Sie werden zur offiziellen Antragsseite weitergeleitet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
