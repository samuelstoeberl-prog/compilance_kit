import { useState } from 'react'
import Anthropic from '@anthropic-ai/sdk'
import type { RegulationMitStatus, UnternehmensProfil, DokumentTyp } from '../types'

interface Props {
  regulation: RegulationMitStatus
  profil: UnternehmensProfil
  onComplete: (id: string) => void
  onClose: () => void
}

const DOK_LABELS: Record<DokumentTyp, string> = {
  datenschutzerklaerung: 'Datenschutzerklärung',
  impressum: 'Impressum',
  arbeitszeitnachweis: 'Arbeitszeitnachweis-Vorlage',
  'arbeitsschutz-unterweisung': 'Arbeitsschutzunterweisung-Vorlage',
}

function buildPrompt(typ: DokumentTyp, profil: UnternehmensProfil): string {
  const base = `Unternehmensform: ${profil.rechtsform}, Branche: ${profil.branche}, Bundesland: ${profil.bundesland}, Mitarbeiterzahl: ${profil.mitarbeiter}`

  const prompts: Record<DokumentTyp, string> = {
    datenschutzerklaerung: `Erstelle eine vollständige, rechtskonforme DSGVO-Datenschutzerklärung für folgendes Unternehmen: ${base}. Pflichtangaben nach Art. 13 DSGVO, branchenspezifisch zugeschnitten. Abschnitte: Verantwortlicher, Zweck der Verarbeitung, Rechtsgrundlagen, Empfänger, Speicherdauer, Betroffenenrechte, Cookies. Verwende [FIRMENNAME], [ADRESSE], [EMAIL] als Platzhalter. Nur das Dokument ausgeben, keine Einleitung.`,
    impressum: `Erstelle ein vollständiges, rechtskonformes Impressum nach §5 DDG für: ${base}. Alle Pflichtfelder mit [PLATZHALTERN] für unternehmensspezifische Daten. Nur das Impressum ausgeben.`,
    arbeitszeitnachweis: `Erstelle eine Arbeitszeitnachweis-Vorlage nach §17 MiLoG für: ${base}. Monatsformular mit Tabelle (Tag, Von, Bis, Pause, Gesamt). Erkläre kurz Aufbewahrungsfrist (2 Jahre). Nur die Vorlage ausgeben.`,
    'arbeitsschutz-unterweisung': `Erstelle eine Arbeitsschutzunterweisung-Vorlage nach §12 ArbSchG für: ${base}. Unterweisungsnachweis mit Datum, branchenspezifischen Themen, Unterschriftsfeldern. Nur die Vorlage ausgeben.`,
  }

  return prompts[typ]
}

export default function DocumentGenerator({ regulation, profil, onComplete, onClose }: Props) {
  const typ = regulation.dokument_typ as DokumentTyp
  const [content, setContent] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const generate = async () => {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
    if (!apiKey || apiKey === 'sk-ant-PLACEHOLDER') {
      setError('Kein API-Key konfiguriert. Bitte VITE_ANTHROPIC_API_KEY in .env.local setzen.')
      return
    }

    setStreaming(true)
    setContent('')
    setError('')
    setDone(false)

    try {
      const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })
      const stream = client.messages.stream({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        messages: [{ role: 'user', content: buildPrompt(typ, profil) }],
      })

      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          const text = (event.delta as { type: 'text_delta'; text: string }).text
          setContent(prev => prev + text)
        }
      }
      setDone(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unbekannter Fehler')
    } finally {
      setStreaming(false)
    }
  }

  const download = () => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${typ}-${profil.name || 'dokument'}.txt`
    a.click()
    URL.revokeObjectURL(url)
    onComplete(regulation.id)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-ink/60 backdrop-blur-sm" onClick={onClose}>
      <div className="h-full w-full max-w-2xl bg-ink-light border-l border-ink-border overflow-y-auto flex flex-col"
        onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-ink-border flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-muted uppercase tracking-wider mb-1">Dokument generieren</p>
            <h2 className="font-serif text-xl text-sand-light">{DOK_LABELS[typ]}</h2>
            <p className="text-sm text-muted font-sans mt-1">{regulation.title}</p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-sand-light text-xl leading-none mt-1">×</button>
        </div>

        <div className="flex-1 p-6 flex flex-col gap-6">
          {!streaming && !done && (
            <div className="bg-ink border border-ink-border rounded-xl p-4">
              <p className="text-sm font-sans text-muted mb-2">Dokument wird generiert für:</p>
              <ul className="text-sm font-sans text-sand-light space-y-1">
                <li>· {profil.rechtsform} · {profil.branche}</li>
                <li>· {profil.bundesland} · {profil.mitarbeiter} Mitarbeitende</li>
              </ul>
            </div>
          )}

          {error && (
            <div className="bg-danger-light border border-danger/30 rounded-xl p-4">
              <p className="text-sm font-sans text-danger">{error}</p>
            </div>
          )}

          {(content || streaming) && (
            <div className="flex-1 min-h-64 bg-ink rounded-xl border border-ink-border p-4 overflow-y-auto">
              <pre className="text-sm font-mono text-sand-light whitespace-pre-wrap leading-relaxed">
                {content}
                {streaming && <span className="animate-pulse text-sand">▊</span>}
              </pre>
            </div>
          )}

          <div className="flex gap-3">
            {!done ? (
              <button onClick={generate} disabled={streaming}
                className="flex-1 bg-sand text-ink py-2.5 rounded-lg text-sm font-sans font-medium disabled:opacity-40 hover:bg-sand-mid transition-colors">
                {streaming ? 'Generiert...' : 'Dokument generieren'}
              </button>
            ) : (
              <>
                <button onClick={generate}
                  className="bg-ink-light border border-ink-border text-sand-light py-2.5 px-4 rounded-lg text-sm font-sans hover:border-sand transition-colors">
                  Neu generieren
                </button>
                <button onClick={download}
                  className="flex-1 bg-teal text-ink-light py-2.5 rounded-lg text-sm font-sans font-medium hover:bg-teal/90 transition-colors">
                  Download (.txt) — als erledigt markieren
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
