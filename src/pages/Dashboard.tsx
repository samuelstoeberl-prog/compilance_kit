import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfil } from '../context/ProfilContext'
import { filterRegulations, sortedFundings } from '../utils/filter'
import ApplicationWizard from '../components/ApplicationWizard'
import DocumentGenerator from '../components/DocumentGenerator'
import regulationData from '../data/regulations.json'
import fundingData from '../data/fundings.json'
import type { Regulation, Funding, PflichtStatus, FundingMitScore, RegulationMitStatus } from '../types'

type Tab = 'pflichten' | 'foerderungen' | 'dokumente'
type StatusFilter = 'alle' | 'offen' | 'erledigt' | 'nicht_relevant'

const KATEGORIE_COLORS: Record<string, string> = {
  'Datenschutz':  'bg-blue-100 text-blue-700',
  'IT-Sicherheit':'bg-orange-100 text-orange-700',
  'Arbeitsrecht': 'bg-purple-100 text-purple-700',
  'Recht':        'bg-sand-mid text-muted-dark',
  'Steuer':       'bg-yellow-100 text-yellow-700',
  'Umwelt':       'bg-green-100 text-green-700',
}

const TYP_COLORS: Record<string, string> = {
  'Zuschuss':     'bg-teal-light text-teal-dark',
  'Kredit':       'bg-blue-100 text-blue-700',
  'Steuervorteil':'bg-yellow-100 text-yellow-700',
}

const QUELLE_COLORS: Record<string, string> = {
  'Bund':       'bg-sand-mid text-muted-dark',
  'EU':         'bg-blue-100 text-blue-700',
  'Bundesland': 'bg-purple-100 text-purple-700',
}

function domainOf(url: string) {
  try { return new URL(url).hostname.replace('www.', '') } catch { return url }
}

export default function Dashboard() {
  const { profil, statusMap, setStatus } = useProfil()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('pflichten')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('alle')
  const [kategorieFilter, setKategorieFilter] = useState('alle')
  const [search, setSearch] = useState('')
  const [wizard, setWizard] = useState<FundingMitScore | null>(null)
  const [docGen, setDocGen] = useState<RegulationMitStatus | null>(null)

  if (!profil) { navigate('/'); return null }

  const allRegs = useMemo(
    () => filterRegulations(regulationData as Regulation[], profil, statusMap),
    [profil, statusMap]
  )
  const allFundings = useMemo(
    () => sortedFundings(fundingData as Funding[], profil),
    [profil]
  )
  const dokRegs = useMemo(
    () => allRegs.filter(r => r.hat_dokument_generator),
    [allRegs]
  )

  const gefiltert = useMemo(() => allRegs.filter(r => {
    if (statusFilter !== 'alle' && r.status !== statusFilter) return false
    if (kategorieFilter !== 'alle' && r.category !== kategorieFilter) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return r.title.toLowerCase().includes(q) || r.beschreibung.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)
    }
    return true
  }), [allRegs, statusFilter, kategorieFilter, search])

  const kategorien = useMemo(() => [...new Set(allRegs.map(r => r.category))], [allRegs])

  const counts = {
    alle: allRegs.length,
    offen: allRegs.filter(r => r.status === 'offen').length,
    erledigt: allRegs.filter(r => r.status === 'erledigt').length,
    nicht_relevant: allRegs.filter(r => r.status === 'nicht_relevant').length,
  }
  const pct = Math.round((counts.erledigt / Math.max(counts.alle - counts.nicht_relevant, 1)) * 100)
  const initials = profil.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()

  const tabBtn = (tab: Tab, label: string, count: number) => (
    <button key={tab} onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-1.5 px-1 py-3 text-sm font-mono border-b-2 transition-colors ${
        activeTab === tab
          ? 'border-ink text-ink'
          : 'border-transparent text-muted-dark hover:text-ink'
      }`}>
      {label}
      <span className={`text-xs px-1.5 py-0.5 rounded-full font-mono leading-none ${
        activeTab === tab ? 'bg-ink text-sand-light' : 'bg-sand-mid text-muted-dark'
      }`}>{count}</span>
    </button>
  )

  return (
    <div className="min-h-screen bg-sand-light font-sans">
      {/* Header */}
      <header className="bg-ink px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-sand rounded flex items-center justify-center">
            <span className="text-ink text-xs font-mono font-bold">CK</span>
          </div>
          <span className="font-serif text-sand-light text-base">ComplianceKit</span>
        </div>
        <button onClick={() => navigate('/onboarding')}
          className="flex items-center gap-2 bg-ink-light border border-ink-border hover:border-sand px-3 py-1.5 rounded-full text-xs transition-colors">
          <div className="w-5 h-5 bg-sand rounded-full flex items-center justify-center text-xs font-bold text-ink leading-none">{initials}</div>
          <span className="text-sand-light font-sans">{profil.name}</span>
          <span className="text-muted">·</span>
          <span className="text-muted">{profil.bundesland}</span>
          <span className="text-muted">·</span>
          <span className="text-muted">{profil.mitarbeiter} MA</span>
        </button>
      </header>

      {/* Tabs */}
      <nav className="bg-white border-b border-sand-border px-6 flex gap-6">
        {tabBtn('pflichten', 'Pflichten', allRegs.length)}
        {tabBtn('foerderungen', 'Förderungen', allFundings.length)}
        {tabBtn('dokumente', 'Dokumente', dokRegs.length)}
        <button onClick={() => navigate('/onboarding')}
          className="py-3 text-xs font-mono text-muted hover:text-ink ml-auto transition-colors">
          Profil bearbeiten
        </button>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-6">

        {/* ── PFLICHTEN ── */}
        {activeTab === 'pflichten' && (
          <div className="flex gap-6">
            {/* Sidebar */}
            <aside className="w-48 flex-shrink-0 space-y-5">
              {/* Progress */}
              <div className="bg-white border border-sand-border rounded-xl p-4">
                <div className="text-4xl font-serif text-ink leading-none">{pct}%</div>
                <div className="text-xs text-muted-dark font-sans mt-0.5">
                  {counts.erledigt} von {counts.alle - counts.nicht_relevant} erledigt
                </div>
                <div className="mt-3 bg-sand-mid rounded-full h-1.5">
                  <div className="bg-ink h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>

              {/* Status filter */}
              <div>
                <p className="text-xs font-mono text-muted uppercase tracking-wider px-1 mb-1">Status</p>
                {(['alle', 'offen', 'erledigt', 'nicht_relevant'] as const).map(val => (
                  <button key={val} onClick={() => setStatusFilter(val)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                      statusFilter === val
                        ? 'bg-ink text-sand-light'
                        : 'text-ink hover:bg-sand-mid'
                    }`}>
                    <span>{val === 'alle' ? 'Alle' : val === 'offen' ? 'Offen' : val === 'erledigt' ? 'Erledigt' : 'Nicht relevant'}</span>
                    <span className={`text-xs font-mono rounded px-1 ${statusFilter === val ? 'text-muted' : 'text-muted-dark'}`}>
                      {counts[val]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Kategorie filter */}
              <div>
                <p className="text-xs font-mono text-muted uppercase tracking-wider px-1 mb-1">Kategorie</p>
                <button onClick={() => setKategorieFilter('alle')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                    kategorieFilter === 'alle' ? 'bg-ink text-sand-light' : 'text-ink hover:bg-sand-mid'
                  }`}>Alle</button>
                {kategorien.map(k => (
                  <button key={k} onClick={() => setKategorieFilter(k)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                      kategorieFilter === k ? 'bg-ink text-sand-light' : 'text-ink hover:bg-sand-mid'
                    }`}>{k}</button>
                ))}
              </div>
            </aside>

            {/* Main */}
            <main className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-4">
                <h1 className="font-serif text-xl text-ink">Compliance-Pflichten</h1>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Suchen..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-white border border-sand-border rounded-lg pl-9 pr-4 py-2 text-sm text-ink placeholder-muted focus:outline-none focus:border-ink-border font-sans"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink text-lg leading-none">×</button>
                )}
              </div>

              {/* Cards */}
              <div className="space-y-2">
                {gefiltert.map(reg => (
                  <div key={reg.id} className={`bg-white border rounded-xl overflow-hidden transition-colors hover:border-sand ${
                    reg.status === 'nicht_relevant' ? 'border-sand-border opacity-60' : 'border-sand-border'
                  }`}>
                    <div className="p-4 flex items-start gap-3">
                      {/* Status toggle */}
                      <button onClick={() => {
                        const next: PflichtStatus = reg.status === 'offen' ? 'erledigt' : reg.status === 'erledigt' ? 'nicht_relevant' : 'offen'
                        setStatus(reg.id, next)
                      }} title="Status wechseln"
                        className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold transition-colors mt-0.5 ${
                          reg.status === 'erledigt'
                            ? 'bg-teal text-white'
                            : reg.status === 'nicht_relevant'
                            ? 'bg-sand-mid text-muted'
                            : 'bg-amber text-white'
                        }`}>
                        {reg.status === 'erledigt' ? '✓' : reg.status === 'nicht_relevant' ? '–' : '!'}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`font-sans font-semibold text-sm ${reg.status === 'nicht_relevant' ? 'text-muted-dark' : 'text-ink'}`}>
                            {reg.title}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${KATEGORIE_COLORS[reg.category] ?? 'bg-sand-mid text-muted-dark'}`}>
                            {reg.category}
                          </span>
                        </div>
                        <p className="text-xs text-muted-dark font-sans mt-0.5 leading-relaxed">
                          {reg.beschreibung}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-xs font-mono text-muted">{reg.rechtsgrundlage}</span>
                          <a href={reg.quelle_url} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-muted hover:text-ink transition-colors font-sans">
                            {domainOf(reg.quelle_url)} ↗
                          </a>
                        </div>
                      </div>

                      {reg.hat_dokument_generator && (
                        <button onClick={() => setDocGen(reg)}
                          className="flex-shrink-0 text-xs bg-sand-mid border border-sand-border hover:bg-sand text-ink px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-sans">
                          Dokument ↗
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {gefiltert.length === 0 && (
                  <div className="text-center py-16 text-muted font-sans">
                    {search ? `Keine Ergebnisse für „${search}"` : 'Keine Einträge für diesen Filter.'}
                  </div>
                )}
              </div>
            </main>
          </div>
        )}

        {/* ── FÖRDERUNGEN ── */}
        {activeTab === 'foerderungen' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h1 className="font-serif text-xl text-ink">Förderungen & Steuervorteile</h1>
              <span className="text-sm font-mono text-muted-dark">{allFundings.length} passende Programme</span>
            </div>
            <div className="space-y-3">
              {allFundings.map(f => (
                <div key={f.id} className="bg-white border border-sand-border rounded-xl hover:border-sand transition-colors">
                  <div className="p-5 flex items-start gap-4">
                    {/* Score */}
                    <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex flex-col items-center justify-center border ${
                      f.score >= 80 ? 'bg-teal-light border-teal/30' :
                      f.score >= 60 ? 'bg-amber-light border-amber/30' : 'bg-sand-mid border-sand-border'
                    }`}>
                      <span className={`text-sm font-mono font-bold leading-none ${f.score >= 80 ? 'text-teal-dark' : f.score >= 60 ? 'text-amber-dark' : 'text-muted-dark'}`}>
                        {f.score}
                      </span>
                      <span className="text-xs font-mono text-muted leading-none">%</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="font-sans font-semibold text-sm text-ink">{f.title}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${TYP_COLORS[f.typ] ?? 'bg-sand-mid text-muted-dark'}`}>
                          {f.typ}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${QUELLE_COLORS[f.quelle] ?? 'bg-sand-mid text-muted-dark'}`}>
                          {f.quelle}
                        </span>
                      </div>
                      <p className="text-xs text-muted font-sans">{f.foerderer}</p>
                      <p className="text-sm text-muted-dark font-sans mt-1">{f.beschreibung}</p>
                      {f.max_betrag && (
                        <p className="text-xs font-mono text-ink mt-1.5">
                          Max. {f.max_betrag >= 1000000
                            ? `${(f.max_betrag / 1000000).toFixed(1)} Mio. €`
                            : `${(f.max_betrag / 1000).toFixed(0)}k €`}
                          {f.zins && ` · ${f.zins}`}
                        </p>
                      )}
                    </div>

                    <button onClick={() => setWizard(f)}
                      className="flex-shrink-0 text-xs bg-ink text-sand-light px-3 py-2 rounded-lg font-sans font-medium hover:bg-ink-light transition-colors whitespace-nowrap">
                      Antrag vorbereiten →
                    </button>
                  </div>
                </div>
              ))}
              {allFundings.length === 0 && (
                <div className="text-center py-16 text-muted font-sans">Keine passenden Förderungen für Ihr Profil.</div>
              )}
            </div>
          </div>
        )}

        {/* ── DOKUMENTE ── */}
        {activeTab === 'dokumente' && (
          <div>
            <div className="mb-5">
              <h1 className="font-serif text-xl text-ink">Dokumente</h1>
              <p className="text-sm text-muted-dark font-sans mt-0.5">
                Vorlagen auf Basis Ihres Profils — kein API-Key erforderlich.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dokRegs.map(reg => (
                <div key={reg.id} className="bg-white border border-sand-border rounded-xl p-5 flex flex-col gap-3 hover:border-sand transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${KATEGORIE_COLORS[reg.category] ?? 'bg-sand-mid text-muted-dark'}`}>
                        {reg.category}
                      </span>
                      <h3 className="font-sans font-semibold text-sm text-ink mt-2">{reg.title}</h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      reg.status === 'erledigt' ? 'bg-teal text-white' : 'bg-sand-mid text-muted-dark'
                    }`}>
                      {reg.status === 'erledigt' ? '✓' : '○'}
                    </div>
                  </div>
                  <p className="text-xs text-muted-dark font-sans leading-relaxed flex-1">{reg.beschreibung}</p>
                  <button onClick={() => setDocGen(reg)}
                    className="w-full bg-ink text-sand-light py-2 rounded-lg text-xs font-sans font-medium hover:bg-ink-light transition-colors">
                    Vorlage öffnen & herunterladen →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Overlays */}
      {wizard && (
        <ApplicationWizard funding={wizard} profil={profil} onClose={() => setWizard(null)} />
      )}
      {docGen && (
        <DocumentGenerator
          regulation={docGen}
          profil={profil}
          onComplete={id => { setStatus(id, 'erledigt'); setDocGen(null) }}
          onClose={() => setDocGen(null)}
        />
      )}
    </div>
  )
}
