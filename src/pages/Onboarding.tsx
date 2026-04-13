import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfil } from '../context/ProfilContext'
import { UnternehmensProfil } from '../types'

const RECHTSFORMEN = ['GmbH', 'UG (haftungsbeschränkt)', 'GbR', 'OHG', 'KG', 'AG', 'Einzelunternehmen', 'e.K.']
const BRANCHEN = ['IT & Software', 'Handel', 'Handwerk', 'Gastronomie & Hotellerie', 'Gesundheit & Pflege', 'Beratung & Dienstleistung', 'Produktion & Industrie', 'Bau & Immobilien', 'Transport & Logistik', 'Sonstiges']
const BUNDESLAENDER = ['Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen', 'Nordrhein-Westfalen', 'Rheinland-Pfalz', 'Saarland', 'Sachsen', 'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen']
const MITARBEITER_OPTIONEN = [
  { label: '1–9 Mitarbeiter', value: 5 },
  { label: '10–49 Mitarbeiter', value: 25 },
  { label: '50–249 Mitarbeiter', value: 100 },
  { label: '250–999 Mitarbeiter', value: 500 },
  { label: '1.000+ Mitarbeiter', value: 1500 },
]
const UMSATZ_OPTIONEN = ['< 2 Mio. €', '2–10 Mio. €', '10–50 Mio. €', '> 50 Mio. €']

export default function Onboarding() {
  const { setProfil } = useProfil()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    rechtsform: '',
    branche: '',
    mitarbeiter: 0,
    bundesland: '',
    umsatzklasse: '',
    gruendungsjahr: new Date().getFullYear(),
  })

  const isValid = form.name && form.rechtsform && form.branche && form.mitarbeiter && form.bundesland && form.umsatzklasse

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProfil(form as UnternehmensProfil)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#f5f0eb] flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">CK</span>
            </div>
            <span className="font-bold text-lg">ComplianceKit</span>
            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded font-mono">BETA</span>
          </div>
          <h1 className="text-2xl font-bold mt-4">Unternehmensprofil anlegen</h1>
          <p className="text-gray-500 mt-1">5 Minuten — einmalig. Dann zeigen wir Ihnen alles Relevante.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Unternehmensname</label>
            <input
              type="text"
              placeholder="z.B. Müller GmbH"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Rechtsform</label>
              <select value={form.rechtsform} onChange={e => setForm(p => ({ ...p, rechtsform: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-black">
                <option value="">Auswählen</option>
                {RECHTSFORMEN.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bundesland</label>
              <select value={form.bundesland} onChange={e => setForm(p => ({ ...p, bundesland: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-black">
                <option value="">Auswählen</option>
                {BUNDESLAENDER.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Branche</label>
            <select value={form.branche} onChange={e => setForm(p => ({ ...p, branche: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-black">
              <option value="">Auswählen</option>
              {BRANCHEN.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mitarbeiterzahl</label>
            <select value={form.mitarbeiter} onChange={e => setForm(p => ({ ...p, mitarbeiter: Number(e.target.value) }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-black">
              <option value={0}>Auswählen</option>
              {MITARBEITER_OPTIONEN.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Jahresumsatz</label>
              <select value={form.umsatzklasse} onChange={e => setForm(p => ({ ...p, umsatzklasse: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-black">
                <option value="">Auswählen</option>
                {UMSATZ_OPTIONEN.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gründungsjahr</label>
              <input type="number" min={1900} max={2026} value={form.gruendungsjahr}
                onChange={e => setForm(p => ({ ...p, gruendungsjahr: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
          </div>

          <button type="submit" disabled={!isValid}
            className="w-full bg-black text-white py-3 rounded-lg font-medium mt-2 disabled:opacity-40 hover:bg-gray-800 transition-colors">
            Dashboard öffnen →
          </button>
        </form>
      </div>
    </div>
  )
}
