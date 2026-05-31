import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfil } from '../context/ProfilContext'
import type { UnternehmensProfil } from '../types'

const RECHTSFORMEN = [
  'Einzelunternehmen', 'e.K. (eingetragener Kaufmann)', 'GbR',
  'OHG', 'KG', 'GmbH & Co. KG',
  'GmbH', 'UG (haftungsbeschränkt)', 'AG',
  'gGmbH (gemeinnützig)', 'e.V. (Verein)', 'eG (Genossenschaft)',
]

const BRANCHEN = [
  'Handwerk', 'Baugewerbe',
  'Industrie & Fertigung',
  'Einzelhandel', 'Großhandel', 'E-Commerce',
  'IT-Dienstleistungen & Software', 'KI & Hochtechnologie',
  'Unternehmensberatung & Agentur', 'Kreativwirtschaft',
  'Gastronomie & Cafés', 'Hotellerie & Beherbergung',
  'Gesundheitswesen & Soziales',
  'Freie Berufe (Recht, Steuern, Architektur)',
  'Transport & Logistik', 'Immobilienwesen', 'Land- & Forstwirtschaft',
]

// Werte stimmen jetzt mit MIT_MAP in filter.ts überein
const MITARBEITER: { label: string; value: string }[] = [
  { label: 'Nur ich (Solo)', value: '0' },
  { label: '1–9 Mitarbeiter', value: '1–9' },
  { label: '10–49 Mitarbeiter', value: '10–49' },
  { label: '50–249 Mitarbeiter', value: '50–249' },
  { label: '250+ Mitarbeiter', value: '250+' },
]

const UMSATZ = [
  'unter 22.000 €',
  '22.000 – 50.000 €',
  '50.000 – 100.000 €',
  '100.000 – 500.000 €',
  '500.000 € – 1 Mio. €',
  '1 – 2 Mio. €',
  '2 – 10 Mio. €',
  '10 – 50 Mio. €',
  'über 50 Mio. €',
]

const GRUENDUNGSJAHR = ['vor 2000', '2000–2010', '2011–2019', '2020 oder später']

const BUNDESLAENDER = [
  'Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen',
  'Hamburg', 'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen',
  'Nordrhein-Westfalen', 'Rheinland-Pfalz', 'Saarland', 'Sachsen',
  'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen',
]

const FOERDERZWECKE: { value: string; emoji: string; label: string; beschreibung: string }[] = [
  { value: 'digitalisierung', emoji: '💻', label: 'Digitalisierung', beschreibung: 'Software, IT-Sicherheit, Hardware' },
  { value: 'energie', emoji: '⚡', label: 'Energie & Nachhaltigkeit', beschreibung: 'Energieberatung, Sanierung, CO₂' },
  { value: 'innovation', emoji: '🔬', label: 'Forschung & Innovation', beschreibung: 'F&E, neue Produkte, Patente' },
  { value: 'gruendung', emoji: '🚀', label: 'Gründung & Wachstum', beschreibung: 'Startup, erste Mitarbeiter, Skalierung' },
  { value: 'investition', emoji: '🏗️', label: 'Investition & Betrieb', beschreibung: 'Maschinen, Umbau, Betriebsmittel' },
  { value: 'mitarbeiter', emoji: '👥', label: 'Personal & Ausbildung', beschreibung: 'Azubis, Weiterbildung, Fachkräfte' },
  { value: 'internationalisierung', emoji: '🌍', label: 'Internationalisierung', beschreibung: 'Export, neue Märkte, Ausland' },
  { value: 'beratung', emoji: '📋', label: 'Beratung & Zertifizierung', beschreibung: 'Unternehmensberatung, ISO, Audits' },
]

type FormState = UnternehmensProfil

const STEPS = [
  { title: 'Ihr Unternehmen', subtitle: 'Grunddaten für präzises Matching.' },
  { title: 'Größe & Finanzen', subtitle: 'Für Fördergrenzen und Compliance-Schwellen.' },
  { title: 'Was suchen Sie?', subtitle: 'Wählen Sie alle relevanten Bereiche – wir filtern genau danach.' },
]

export default function Onboarding() {
  const { profil, setProfil } = useProfil()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(() => ({
    name: '', rechtsform: '', branche: '', mitarbeiter: '',
    bundesland: '', umsatz: '', gruendungsjahr: '',
    foerderzweck: [],
    ...profil,
  }))

  const set = (k: keyof Omit<FormState, 'foerderzweck'>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }))

  const toggleZweck = (val: string) => {
    setForm(p => ({
      ...p,
      foerderzweck: p.foerderzweck.includes(val)
        ? p.foerderzweck.filter(v => v !== val)
        : [...p.foerderzweck, val],
    }))
  }

  const stepValid = [
    form.name && form.rechtsform && form.branche && form.bundesland,
    form.mitarbeiter && form.umsatz && form.gruendungsjahr,
    form.foerderzweck.length > 0,
  ]

  const isLastStep = step === STEPS.length - 1

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLastStep) { setStep(s => s + 1); return }
    handleSubmit()
  }

  const handleSubmit = async () => {
    await setProfil(form as UnternehmensProfil)
    navigate(profil ? '/dashboard' : '/preview')
  }

  const inputCls = 'w-full bg-white border border-sand-border rounded-lg px-4 py-2.5 text-ink placeholder-muted focus:outline-none focus:border-ink font-sans text-sm'
  const labelCls = 'block text-xs font-mono text-muted-dark mb-1.5 uppercase tracking-wider'

  return (
    <div className="min-h-screen bg-sand-light flex items-center justify-center p-6">
      <div className="w-full max-w-lg">

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-10">
          <div className="w-8 h-8 bg-ink rounded flex items-center justify-center">
            <span className="text-sand-light text-xs font-mono font-bold">CK</span>
          </div>
          <span className="font-serif text-ink text-xl">ComplianceKit</span>
          <span className="text-xs font-mono bg-white border border-sand-border text-muted px-2 py-0.5 rounded">BETA</span>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-8">
          {STEPS.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${
              i < step ? 'bg-teal' : i === step ? 'bg-ink' : 'bg-sand-border'
            }`} />
          ))}
        </div>

        {/* Title */}
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="text-xs font-mono text-muted uppercase tracking-wider mb-1">
              Schritt {step + 1} / {STEPS.length}
            </p>
            <h1 className="font-serif text-3xl text-ink">{STEPS[step].title}</h1>
          </div>
          {profil && (
            <button onClick={() => navigate('/dashboard')}
              className="text-sm font-mono text-muted hover:text-ink transition-colors mt-2">
              ← Zurück
            </button>
          )}
        </div>
        <p className="text-muted-dark font-sans text-sm mb-8">{STEPS[step].subtitle}</p>

        <form onSubmit={handleNext} className="space-y-4">

          {/* ── Schritt 1: Grunddaten ── */}
          {step === 0 && (
            <>
              <div>
                <label className={labelCls}>Unternehmensname</label>
                <input type="text" placeholder="z.B. Müller GmbH" value={form.name}
                  onChange={set('name')} className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Rechtsform</label>
                  <select value={form.rechtsform} onChange={set('rechtsform')} className={inputCls}>
                    <option value="">Auswählen</option>
                    {RECHTSFORMEN.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Bundesland</label>
                  <select value={form.bundesland} onChange={set('bundesland')} className={inputCls}>
                    <option value="">Auswählen</option>
                    {BUNDESLAENDER.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className={labelCls}>Branche</label>
                <select value={form.branche} onChange={set('branche')} className={inputCls}>
                  <option value="">Auswählen</option>
                  {BRANCHEN.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>

            </>
          )}

          {/* ── Schritt 2: Größe & Finanzen ── */}
          {step === 1 && (
            <>
              <div>
                <label className={labelCls}>Mitarbeiterzahl</label>
                <div className="grid grid-cols-1 gap-2">
                  {MITARBEITER.map(({ label, value }) => (
                    <button key={value} type="button"
                      onClick={() => setForm(p => ({ ...p, mitarbeiter: value }))}
                      className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-sans transition-colors ${
                        form.mitarbeiter === value
                          ? 'bg-ink text-sand-light border-ink'
                          : 'bg-white border-sand-border text-ink hover:border-ink'
                      }`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Jahresumsatz</label>
                  <select value={form.umsatz} onChange={set('umsatz')} className={inputCls}>
                    <option value="">Auswählen</option>
                    {UMSATZ.map(u => <option key={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Gründungsjahr</label>
                  <select value={form.gruendungsjahr} onChange={set('gruendungsjahr')} className={inputCls}>
                    <option value="">Auswählen</option>
                    {GRUENDUNGSJAHR.map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>
            </>
          )}

          {/* ── Schritt 3: Förder-Zweck ── */}
          {step === 2 && (
            <div>
              <div className="grid grid-cols-2 gap-2">
                {FOERDERZWECKE.map(({ value, emoji, label, beschreibung }) => {
                  const selected = form.foerderzweck.includes(value)
                  return (
                    <button key={value} type="button" onClick={() => toggleZweck(value)}
                      className={`text-left p-3.5 rounded-xl border transition-all ${
                        selected
                          ? 'bg-ink text-sand-light border-ink'
                          : 'bg-white border-sand-border text-ink hover:border-ink'
                      }`}>
                      <div className="text-xl mb-1">{emoji}</div>
                      <div className="text-sm font-sans font-semibold">{label}</div>
                      <div className={`text-xs mt-0.5 ${selected ? 'text-sand/70' : 'text-muted'}`}>
                        {beschreibung}
                      </div>
                    </button>
                  )
                })}
              </div>
              {form.foerderzweck.length === 0 && (
                <p className="text-xs text-amber-dark font-sans mt-3">
                  Bitte mindestens einen Bereich auswählen.
                </p>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {step > 0 && (
              <button type="button" onClick={() => setStep(s => s - 1)}
                className="px-5 py-3 rounded-lg border border-sand-border text-ink text-sm font-sans hover:bg-sand-mid transition-colors">
                ← Zurück
              </button>
            )}
            <button type="submit" disabled={!stepValid[step]}
              className="flex-1 bg-ink text-sand-light py-3 rounded-lg font-sans font-medium text-sm disabled:opacity-30 hover:bg-ink-light transition-colors">
              {isLastStep
                ? (profil ? 'Änderungen speichern →' : 'Dashboard öffnen →')
                : 'Weiter →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
