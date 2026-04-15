import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfil } from '../context/ProfilContext'
import type { UnternehmensProfil } from '../types'

const RECHTSFORMEN = ['GmbH', 'UG (haftungsbeschränkt)', 'AG', 'GbR', 'OHG', 'KG', 'Einzelunternehmen', 'e.K.']
const BRANCHEN = ['Software / IT', 'Handel / E-Commerce', 'Produktion / Fertigung', 'Dienstleistungen', 'Gastronomie / Hotellerie', 'Gesundheit / Pflege', 'Bau / Handwerk', 'Transport / Logistik', 'Sonstiges']
const BUNDESLAENDER = ['Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen', 'Nordrhein-Westfalen', 'Rheinland-Pfalz', 'Saarland', 'Sachsen', 'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen']
const MITARBEITER = ['1–9', '10–49', '50–249', '250+']
const UMSATZ = ['unter 500.000 €', '500.000 – 2 Mio. €', '2 – 10 Mio. €', 'über 10 Mio. €']
const GRUENDUNGSJAHR = ['vor 2000', '2000–2010', '2011–2019', '2020 oder später']

type FormState = {
  name: string
  rechtsform: string
  branche: string
  mitarbeiter: string
  bundesland: string
  umsatz: string
  gruendungsjahr: string
}

export default function Onboarding() {
  const { profil, setProfil } = useProfil()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(() => profil ?? {
    name: '', rechtsform: '', branche: '', mitarbeiter: '',
    bundesland: '', umsatz: '', gruendungsjahr: '',
  })

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))

  const isValid = Object.values(form).every(v => v !== '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProfil(form as UnternehmensProfil)
    navigate('/dashboard')
  }

  const inputCls = 'w-full bg-ink-light border border-ink-border rounded-lg px-4 py-2.5 text-sand-light placeholder-muted focus:outline-none focus:border-sand font-sans text-sm'
  const labelCls = 'block text-xs font-mono text-muted mb-1 uppercase tracking-wider'

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-sand rounded flex items-center justify-center">
            <span className="text-ink text-xs font-mono font-bold">CK</span>
          </div>
          <span className="font-serif text-sand-light text-xl">ComplianceKit</span>
          <span className="text-xs font-mono bg-ink-light border border-ink-border text-muted px-2 py-0.5 rounded">BETA</span>
        </div>

        <div className="flex gap-1.5 mb-8">
          {[0, 1, 2].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-sand' : 'bg-ink-border'}`} />
          ))}
        </div>

        <div className="flex items-start justify-between mb-2">
          <h1 className="font-serif text-3xl text-sand-light">{profil ? 'Profil bearbeiten' : 'Unternehmensprofil'}</h1>
          {profil && (
            <button onClick={() => navigate('/dashboard')}
              className="text-sm font-mono text-muted hover:text-sand-light transition-colors mt-1">
              ← Zurück
            </button>
          )}
        </div>
        <p className="text-muted font-sans text-sm mb-8">
          {profil ? 'Änderungen werden sofort übernommen.' : 'Einmalig. 5 Minuten. Dann alles Relevante auf einen Blick.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={labelCls}>Unternehmensname</label>
            <input type="text" placeholder="z.B. Müller GmbH" value={form.name} onChange={set('name')}
              onFocus={() => setStep(0)} className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Rechtsform</label>
              <select value={form.rechtsform} onChange={set('rechtsform')} onFocus={() => setStep(0)} className={inputCls}>
                <option value="">Auswählen</option>
                {RECHTSFORMEN.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Bundesland</label>
              <select value={form.bundesland} onChange={set('bundesland')} onFocus={() => setStep(1)} className={inputCls}>
                <option value="">Auswählen</option>
                {BUNDESLAENDER.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Branche</label>
            <select value={form.branche} onChange={set('branche')} onFocus={() => setStep(1)} className={inputCls}>
              <option value="">Auswählen</option>
              {BRANCHEN.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Mitarbeiterzahl</label>
              <select value={form.mitarbeiter} onChange={set('mitarbeiter')} onFocus={() => setStep(1)} className={inputCls}>
                <option value="">Auswählen</option>
                {MITARBEITER.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Jahresumsatz</label>
              <select value={form.umsatz} onChange={set('umsatz')} onFocus={() => setStep(2)} className={inputCls}>
                <option value="">Auswählen</option>
                {UMSATZ.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Gründungsjahr</label>
            <select value={form.gruendungsjahr} onChange={set('gruendungsjahr')} onFocus={() => setStep(2)} className={inputCls}>
              <option value="">Auswählen</option>
              {GRUENDUNGSJAHR.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>

          <button type="submit" disabled={!isValid}
            className="w-full bg-sand text-ink py-3 rounded-lg font-sans font-medium text-sm mt-2 disabled:opacity-30 hover:bg-sand-mid transition-colors">
            {profil ? 'Änderungen speichern →' : 'Dashboard öffnen →'}
          </button>
        </form>
      </div>
    </div>
  )
}
