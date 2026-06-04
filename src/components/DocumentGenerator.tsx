import { useState } from 'react'
import type { RegulationMitStatus, UnternehmensProfil, DokumentTyp } from '../types'
import { downloadAsPDF, downloadAsDOCX } from '../utils/exportDoc'
import {
  datenschutzerklaerungTemplate,
  impressumTemplate,
  arbeitszeitnachweisTemplate,
  arbeitsschutzunterweisungTemplate,
  kassenbuchTemplate,
  datenschutzFolgenabschaetzungTemplate,
  itSicherheitsrichtlinieTemplate,
  arbeitsvertragTemplate,
  sozialversicherungAnmeldungTemplate,
  gewaehrleistungAgbTemplate,
} from '../data/templates'

interface Props {
  regulation: RegulationMitStatus
  profil: UnternehmensProfil
  onComplete: (id: string) => void
  onClose: () => void
}

export { buildDocument }

const DOK_LABELS: Record<DokumentTyp, string> = {
  datenschutzerklaerung: 'Datenschutzerklärung',
  impressum: 'Impressum',
  arbeitszeitnachweis: 'Arbeitszeitnachweis-Vorlage',
  'arbeitsschutz-unterweisung': 'Arbeitsschutzunterweisung-Vorlage',
  kassenbuch: 'Kassenbuch-Vorlage',
  'datenschutz-folgenabschaetzung': 'Datenschutz-Folgenabschätzung (DPIA)',
  'it-sicherheitsrichtlinie': 'IT-Sicherheitsrichtlinie',
  arbeitsvertrag: 'Arbeitsvertrag-Vorlage',
  'sozialversicherung-anmeldung': 'SV-Anmeldeformular / Checkliste',
  'gewaehrleistung-agb': 'AGB mit Gewährleistungsregelungen',
}

function ph(val: string | undefined, placeholder: string): string {
  return val?.trim() ? val.trim() : `[${placeholder}]`
}

function applyTemplate(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (s, [key, val]) => s.replaceAll(`{{${key}}}`, val),
    template
  )
}

function buildDocument(typ: DokumentTyp, profil: UnternehmensProfil): string {
  const datum = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const vars: Record<string, string> = {
    UNTERNEHMENSNAME: ph(profil.name, 'UNTERNEHMENSNAME'),
    RECHTSFORM: profil.rechtsform,
    STRASSE: ph(profil.strasse, 'STRASSE UND HAUSNUMMER'),
    PLZ_ORT: ph(profil.plz_ort, 'PLZ ORT'),
    EMAIL: ph(profil.email, 'EMAIL-ADRESSE'),
    TELEFON: ph(profil.telefon, 'TELEFONNUMMER'),
    WEBSITE: ph(profil.website, 'WEBSITE-URL'),
    DATUM: datum,
    HANDELSREGISTER_GERICHT: '[Amtsgericht eintragen]',
    HANDELSREGISTER_NR: '[Nummer eintragen]',
    GESCHAEFTSFUEHRER: '[Name eintragen]',
  }

  switch (typ) {
    case 'datenschutzerklaerung': return applyTemplate(datenschutzerklaerungTemplate, vars)
    case 'impressum': return applyTemplate(impressumTemplate, vars)
    case 'arbeitszeitnachweis': return applyTemplate(arbeitszeitnachweisTemplate, vars)
    case 'arbeitsschutz-unterweisung': return applyTemplate(arbeitsschutzunterweisungTemplate, vars)
    case 'kassenbuch': return applyTemplate(kassenbuchTemplate, vars)
    case 'datenschutz-folgenabschaetzung': return applyTemplate(datenschutzFolgenabschaetzungTemplate, vars)
    case 'it-sicherheitsrichtlinie': return applyTemplate(itSicherheitsrichtlinieTemplate, vars)
    case 'arbeitsvertrag': return applyTemplate(arbeitsvertragTemplate, vars)
    case 'sozialversicherung-anmeldung': return applyTemplate(sozialversicherungAnmeldungTemplate, vars)
    case 'gewaehrleistung-agb': return applyTemplate(gewaehrleistungAgbTemplate, vars)
  }
}

export default function DocumentGenerator({ regulation, profil, onComplete, onClose }: Props) {
  const typ = regulation.dokument_typ as DokumentTyp
  const filename = `${typ}-${(profil.name || 'dokument').replace(/\s+/g, '-')}`

  const [content] = useState(() => buildDocument(typ, profil))
  const [downloading, setDownloading] = useState<'pdf' | 'docx' | null>(null)

  const download = async (ext: 'pdf' | 'docx') => {
    setDownloading(ext)
    try {
      if (ext === 'pdf') {
        downloadAsPDF(content, filename)
      } else {
        await downloadAsDOCX(content, filename)
      }
      onComplete(regulation.id)
    } finally {
      setDownloading(null)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-ink/40 backdrop-blur-sm" onClick={onClose}>
      <div className="h-full w-full max-w-2xl bg-white border-l border-sand-border overflow-y-auto flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="p-6 border-b border-sand-border flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-muted uppercase tracking-wider mb-1">Dokument generieren</p>
            <h2 className="font-serif text-xl text-ink">{DOK_LABELS[typ]}</h2>
            <p className="text-sm text-muted-dark font-sans mt-1">{regulation.title}</p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-ink text-xl leading-none mt-1">×</button>
        </div>

        {/* Status banner */}
        <div className="mx-6 mt-5 rounded-xl p-4 flex gap-3 border bg-teal-light border-teal/30">
          <span className="text-lg leading-none mt-0.5 text-teal-dark">✓</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-sans font-medium text-teal-dark">Vorlage fertig</p>
            <p className="text-xs text-muted-dark font-sans mt-0.5">
              Vorausgefüllt für: {profil.rechtsform} · {profil.branche} · {profil.bundesland}
            </p>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 m-6 bg-sand-light rounded-xl border border-sand-border p-5 overflow-y-auto">
          <pre className="text-sm font-mono text-ink whitespace-pre-wrap leading-relaxed">
            {content}
          </pre>
        </div>

        {/* Actions */}
        <div className="p-6 pt-0 flex gap-3">
          <button onClick={onClose}
            className="bg-white border border-sand-border text-ink py-2.5 px-4 rounded-lg text-sm font-sans hover:border-ink transition-colors">
            Schließen
          </button>
          <button
            onClick={() => download('pdf')}
            disabled={!!downloading}
            className="flex-1 bg-sand-mid border border-sand-border text-ink py-2.5 rounded-lg text-sm font-sans font-medium hover:bg-sand transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloading === 'pdf' ? 'Wird erstellt…' : 'PDF herunterladen'}
          </button>
          <button
            onClick={() => download('docx')}
            disabled={!!downloading}
            className="flex-1 bg-ink text-sand-light py-2.5 rounded-lg text-sm font-sans font-medium hover:bg-ink-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloading === 'docx' ? 'Wird erstellt…' : 'DOCX herunterladen'}
          </button>
        </div>
      </div>
    </div>
  )
}
