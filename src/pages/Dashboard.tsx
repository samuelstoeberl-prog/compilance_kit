import { useState, useMemo, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useProfil } from '../context/ProfilContext'
import { filterRegulations, sortedFundings } from '../utils/filter'
import { fetchFundings, fetchRegulations, type ApiFunding, type ApiRegulation } from '../api/client'
import ApplicationWizard from '../components/ApplicationWizard'
import DocumentGenerator, { buildDocument } from '../components/DocumentGenerator'
import { downloadAsPDF, downloadAsDOCX } from '../utils/exportDoc'
import regulationData from '../data/regulations.json'
import fundingData from '../data/fundings.json'
import { CheckCircle, TrendingUp, Settings } from 'lucide-react'
import type { Regulation, Funding, PflichtStatus, FundingMitScore, RegulationMitStatus, DokumentTyp } from '../types'

type Tab = 'pflichten' | 'foerderungen' | 'dokumente'
type StatusFilter = 'alle' | 'offen' | 'erledigt' | 'nicht_relevant'
type DocStatusFilter = 'alle' | 'fertig' | 'ausstehend'

const KATEGORIE_COLORS: Record<string, string> = {
  'Arbeitsrecht':      'bg-purple-100 text-purple-700',
  'Datenschutz':       'bg-blue-100 text-blue-700',
  'IT-Sicherheit':     'bg-orange-100 text-orange-700',
  'Steuer':            'bg-yellow-100 text-yellow-700',
  'Buchführung':       'bg-yellow-100 text-yellow-700',
  'Umwelt':            'bg-green-100 text-green-700',
  'Reporting':         'bg-teal-light text-teal-dark',
  'Recht':             'bg-sand-mid text-muted-dark',
  'Compliance':        'bg-red-100 text-red-700',
  'Sozialversicherung':'bg-indigo-100 text-indigo-700',
  'Finanzmarkt':       'bg-cyan-100 text-cyan-700',
  'Gewerberecht':      'bg-amber-100 text-amber-700',
  'Transport':         'bg-sky-100 text-sky-700',
  'Produktrecht':      'bg-lime-100 text-lime-700',
  'Berufsrecht':       'bg-rose-100 text-rose-700',
  'Gesundheit':        'bg-pink-100 text-pink-700',
  'Lebensmittelrecht': 'bg-emerald-100 text-emerald-700',
  'Verbraucherschutz': 'bg-violet-100 text-violet-700',
  'Lieferkette':       'bg-red-100 text-red-700',
}

const TYP_COLORS: Record<string, string> = {
  'Zuschuss':          'bg-teal-light text-teal-dark',
  'Kredit':            'bg-blue-100 text-blue-700',
  'Steuervorteil':     'bg-yellow-100 text-yellow-700',
  'Bürgschaft':        'bg-orange-100 text-orange-700',
  'Beteiligung':       'bg-purple-100 text-purple-700',
  'Beratungszuschuss': 'bg-green-100 text-green-700',
}

const QUELLE_COLORS: Record<string, string> = {
  'Bund':       'bg-sand-mid text-muted-dark',
  'EU':         'bg-blue-100 text-blue-700',
  'Bundesland': 'bg-purple-100 text-purple-700',
  'Gemeinde':   'bg-green-100 text-green-700',
}

const DOK_ABBR: Record<string, string> = {
  datenschutzerklaerung:       'DS',
  impressum:                   'IM',
  arbeitszeitnachweis:         'AZ',
  'arbeitsschutz-unterweisung':'AU',
}

// Konvertiert API-Typen in lokale Typen für Wizard/Generator-Kompatibilität
function toFundingMitScore(f: ApiFunding): FundingMitScore {
  return {
    ...f,
    bearbeitungszeit_wochen: [f.bearbeitungszeit_min, f.bearbeitungszeit_max],
    gilt_fuer: f.gilt_fuer as FundingMitScore['gilt_fuer'],
    relevanz_boost: f.relevanz_boost as FundingMitScore['relevanz_boost'],
    benoetigte_dokumente: f.benoetigte_dokumente,
  }
}

function toRegulationMitStatus(r: ApiRegulation): RegulationMitStatus {
  return {
    ...r,
    dokument_typ: r.dokument_typ as DokumentTyp | undefined,
    gilt_fuer: r.gilt_fuer as RegulationMitStatus['gilt_fuer'],
    status: r.status,
  }
}

export default function Dashboard() {
  const { profil, companyId, backendOnline, statusMap, setStatus, docTimestamps, setDocGenerated } = useProfil()
  const navigate = useNavigate()

  // Daten-State
  const [apiRegs, setApiRegs] = useState<ApiRegulation[] | null>(null)
  const [apiFunds, setApiFunds] = useState<ApiFunding[] | null>(null)
  const [loading, setLoading] = useState(false)

  // UI-State
  const [activeTab, setActiveTab] = useState<Tab>('pflichten')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('alle')
  const [kategorieFilter, setKategorieFilter] = useState('alle')
  const [search, setSearch] = useState('')
  const [docStatusFilter, setDocStatusFilter] = useState<DocStatusFilter>('alle')
  const [wizard, setWizard] = useState<FundingMitScore | null>(null)
  const [docGen, setDocGen] = useState<RegulationMitStatus | null>(null)

  useEffect(() => {
    if (!profil) navigate('/')
  }, [profil, navigate])

  // ── Daten laden: Backend wenn online, sonst lokale JSON ─────────────────────
  const loadData = useCallback(async () => {
    if (!backendOnline || !companyId) return
    setLoading(true)
    try {
      const [fundsRes, regsRes] = await Promise.all([
        fetchFundings(companyId),
        fetchRegulations(companyId),
      ])
      setApiFunds(fundsRes.items)
      setApiRegs(regsRes.items)
    } catch (err) {
      console.warn('[Dashboard] API-Fehler, Fallback auf lokale Daten:', err)
    } finally {
      setLoading(false)
    }
  }, [backendOnline, companyId])

  useEffect(() => { loadData() }, [loadData])

  // ── Datenquellen: API (primär) oder lokale JSON (Fallback) ───────────────────
  const allRegs: RegulationMitStatus[] = useMemo(() => {
    if (apiRegs) return apiRegs.map(toRegulationMitStatus)
    if (!profil) return []
    return filterRegulations(regulationData as Regulation[], profil, statusMap)
  }, [apiRegs, profil, statusMap])

  const allFundings: FundingMitScore[] = useMemo(() => {
    if (apiFunds) return apiFunds.map(toFundingMitScore)
    if (!profil) return []
    return sortedFundings(fundingData as Funding[], profil)
  }, [apiFunds, profil])

  const dokRegs = useMemo(() => allRegs.filter(r => r.hat_dokument_generator), [allRegs])

  // ── Filter & Suche ────────────────────────────────────────────────────────────
  const gefiltert = useMemo(() => allRegs.filter(r => {
    if (statusFilter !== 'alle' && r.status !== statusFilter) return false
    if (kategorieFilter !== 'alle' && r.category !== kategorieFilter) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return r.title.toLowerCase().includes(q) ||
             r.beschreibung.toLowerCase().includes(q) ||
             r.category.toLowerCase().includes(q)
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

  const tabBtn = (tab: Tab, label: string, count: number, icon: React.ReactNode) => (
    <button key={tab} onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-3 px-4 py-4 text-sm font-medium border-b-2 transition-colors rounded-t-lg ${
        activeTab === tab
          ? 'border-teal text-teal bg-teal-light'
          : 'border-transparent text-muted hover:text-ink hover:bg-sand-light'
      }`}>
      {icon}
      {label}
      <span className={`text-xs font-mono leading-none px-2 py-1 rounded-full ${
        activeTab === tab ? 'bg-teal text-white' : 'bg-sand-mid text-muted-dark'
      }`}>{count}</span>
    </button>
  )

  if (!profil) return null

  return (
    <div className="min-h-screen bg-sand-light font-sans">

      {/* Header */}
      <header className="bg-white border-b border-sand-border px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <span className="font-serif text-ink text-xl font-bold">ComplianceKit</span>
          <span className="text-sand-border text-lg">|</span>
          <span className="text-sm text-muted font-sans">Compliance & Förderungen für KMU</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/onboarding')}
            className="flex items-center gap-3 hover:opacity-70 transition-opacity text-sm font-sans bg-sand-light px-4 py-2 rounded-lg">
            <Settings size={16} />
            <span className="text-ink font-medium">{profil.name}</span>
            <span className="text-muted">·</span>
            <span className="text-muted">{profil.bundesland}</span>
            <span className="text-muted">·</span>
            <span className="text-muted">{profil.mitarbeiter} MA</span>
          </button>
        </div>
      </header>

      {/* Lade-Indikator */}
      {loading && (
        <div className="h-0.5 bg-sand-border">
          <div className="h-full bg-teal animate-pulse w-full" />
        </div>
      )}

      {/* Tabs */}
      <nav className="bg-white border-b border-sand-border px-6 flex gap-2">
        {tabBtn('pflichten',   'Pflichten',   allRegs.length,    <CheckCircle size={18} />)}
        {tabBtn('foerderungen','Förderungen', allFundings.length, <TrendingUp size={18} />)}
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-8">

        {/* ── PFLICHTEN ── */}
        {activeTab === 'pflichten' && (
          <div className="flex gap-6">
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
                {backendOnline && companyId && (
                  <p className="text-xs font-mono text-muted mt-2">↑ Live-Sync aktiv</p>
                )}
              </div>

              {/* Status filter */}
              <div>
                <p className="text-xs font-mono text-muted uppercase tracking-wider px-1 mb-1">Status</p>
                {(['alle', 'offen', 'erledigt', 'nicht_relevant'] as const).map(val => (
                  <button key={val} onClick={() => setStatusFilter(val)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                      statusFilter === val ? 'bg-ink text-sand-light' : 'text-ink hover:bg-sand-mid'
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

            <main className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-serif text-2xl text-ink font-bold">Compliance-Pflichten</h1>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input type="text" placeholder="Suchen..." value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full bg-white border border-sand-border rounded-lg pl-9 pr-4 py-2 text-sm text-ink placeholder-muted focus:outline-none focus:border-ink-border font-sans" />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink text-lg leading-none">×</button>
                )}
              </div>

              <div className="space-y-2">
                {gefiltert.map(reg => (
                  <div key={reg.id} className={`bg-white border rounded-xl overflow-hidden transition-colors hover:border-sand ${
                    reg.status === 'nicht_relevant' ? 'border-sand-border opacity-60' : 'border-sand-border'
                  }`}>
                    <div className="p-4 flex items-start gap-3">
                      <button onClick={() => {
                        const next: PflichtStatus = reg.status === 'offen' ? 'erledigt'
                          : reg.status === 'erledigt' ? 'nicht_relevant' : 'offen'
                        setStatus(reg.id, next)
                      }} title="Status wechseln"
                        className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold transition-colors mt-0.5 ${
                          reg.status === 'erledigt' ? 'bg-teal text-white'
                          : reg.status === 'nicht_relevant' ? 'bg-sand-mid text-muted'
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
                        <p className="text-xs text-muted-dark font-sans mt-0.5 leading-relaxed">{reg.beschreibung}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-xs font-mono text-muted">{reg.rechtsgrundlage}</span>
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
              <h1 className="font-serif text-2xl text-ink font-bold">Förderungen & Steuervorteile</h1>
              <span className="text-sm font-mono text-muted-dark">{allFundings.length} passende Programme</span>
            </div>
            <div className="space-y-3">
              {allFundings.map(f => (
                <div key={f.id} className="bg-white border border-sand-border rounded-xl hover:border-sand transition-colors">
                  <div className="p-5 flex items-start gap-4">
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
                        <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${TYP_COLORS[f.typ] ?? 'bg-sand-mid text-muted-dark'}`}>{f.typ}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${QUELLE_COLORS[f.quelle] ?? 'bg-sand-mid text-muted-dark'}`}>{f.quelle}</span>
                      </div>
                      <p className="text-xs text-muted font-sans">{f.foerderer}</p>
                      <p className="text-sm text-muted-dark font-sans mt-1">{f.beschreibung}</p>
                      {f.max_betrag && (
                        <p className="text-xs font-mono text-ink mt-1.5">
                          Max. {f.max_betrag >= 1_000_000
                            ? `${(f.max_betrag / 1_000_000).toFixed(1)} Mio. €`
                            : `${(f.max_betrag / 1000).toFixed(0)}k €`}
                          {f.zins && ` · ${f.zins}`}
                        </p>
                      )}
                    </div>

                    <a href={f.antrag_url} target="_blank" rel="noopener noreferrer"
                      className="flex-shrink-0 text-xs bg-ink text-sand-light px-3 py-2 rounded-lg font-sans font-medium hover:bg-ink-light transition-colors whitespace-nowrap">
                      Direkt beantragen ↗
                    </a>
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
        {activeTab === 'dokumente' && (() => {
          const genCount = dokRegs.filter(r => docTimestamps[r.id]).length
          const filtered = dokRegs.filter(r => {
            if (docStatusFilter === 'fertig') return !!docTimestamps[r.id]
            if (docStatusFilter === 'ausstehend') return !docTimestamps[r.id]
            return true
          })
          return (
            <div className="flex gap-0">
              <aside className="w-64 flex-shrink-0 border-r border-sand-border pr-8 space-y-6 pt-1">
                <div>
                  <div className="text-5xl font-serif text-ink leading-none">{genCount}/{dokRegs.length}</div>
                  <div className="text-xs font-mono text-muted uppercase tracking-widest mt-1">Generiert</div>
                  <div className="text-xs text-muted-dark font-sans mt-0.5">{genCount} Dokumente bereit</div>
                </div>
                <div>
                  <p className="text-xs font-mono text-muted uppercase tracking-widest mb-2">Status</p>
                  {([['alle', 'Alle', dokRegs.length], ['fertig', 'Fertig', genCount], ['ausstehend', 'Ausstehend', dokRegs.length - genCount]] as const).map(([val, label, cnt]) => (
                    <button key={val} onClick={() => setDocStatusFilter(val)}
                      className={`w-full flex items-center justify-between py-1.5 text-sm transition-colors ${
                        docStatusFilter === val ? 'text-ink font-semibold' : 'text-muted-dark hover:text-ink'
                      }`}>
                      <span>{label}</span>
                      <span className="font-mono text-xs">{cnt}</span>
                    </button>
                  ))}
                </div>
              </aside>

              <main className="flex-1 pl-8">
                <h1 className="font-serif text-2xl text-ink font-bold mb-6">Compliance-Dokumente</h1>
                <div className="divide-y divide-sand-border border-t border-sand-border">
                  {filtered.map(reg => {
                    const abbr = DOK_ABBR[reg.dokument_typ ?? ''] ?? '??'
                    const ts = docTimestamps[reg.id]
                    const dateStr = ts ? new Date(ts).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : null
                    const isGenerated = !!ts
                    const handleDownload = async (ext: 'docx' | 'pdf') => {
                      const content = buildDocument(reg.dokument_typ as DokumentTyp, profil)
                      const filename = `${reg.dokument_typ}-${profil.name.replace(/\s+/g, '-')}`
                      if (ext === 'pdf') {
                        downloadAsPDF(content, filename)
                      } else {
                        await downloadAsDOCX(content, filename)
                      }
                      setDocGenerated(reg.id)
                      setStatus(reg.id, 'erledigt')
                    }
                    return (
                      <div key={reg.id} className={`flex items-center gap-4 py-4 ${!isGenerated ? 'opacity-50' : ''}`}>
                        <div className={`w-10 h-10 rounded flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold ${
                          isGenerated ? 'bg-ink text-sand-light' : 'bg-sand-mid text-muted'
                        }`}>{abbr}</div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-sans font-medium ${isGenerated ? 'text-ink' : 'text-muted-dark'}`}>{reg.title}</p>
                          <p className="text-xs text-muted font-sans mt-0.5">
                            {isGenerated ? `Generiert ${dateStr} · ${profil.rechtsform} · ${profil.bundesland}` : 'Noch nicht generiert'}
                          </p>
                        </div>
                        {isGenerated ? (
                          <div className="flex gap-2 flex-shrink-0">
                            <button onClick={() => handleDownload('docx')}
                              className="text-xs font-mono border border-sand-border text-ink px-3 py-1.5 rounded hover:bg-sand-mid transition-colors">DOCX ↗</button>
                            <button onClick={() => handleDownload('pdf')}
                              className="text-xs font-mono border border-teal/40 bg-teal-light text-teal-dark px-3 py-1.5 rounded hover:bg-teal/20 transition-colors">PDF ↗</button>
                          </div>
                        ) : (
                          <button onClick={() => handleDownload('docx')}
                            className="text-xs font-mono border border-sand-border text-muted-dark px-3 py-1.5 rounded hover:border-ink hover:text-ink transition-colors flex-shrink-0">
                            Generieren →
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </main>
            </div>
          )
        })()}
      </div>

      {/* Footer */}
      <footer className="border-t border-sand-border bg-white px-6 py-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-sans text-muted">
          <span>
            ComplianceKit ersetzt keine individuelle Rechtsberatung. Alle Angaben ohne Gewähr auf Vollständigkeit und Aktualität.
          </span>
          <div className="flex items-center gap-4">
            <Link to="/konto" className="hover:text-ink transition-colors">Konto</Link>
            <span className="text-sand-border">|</span>
            <Link to="/impressum" className="hover:text-ink transition-colors">Impressum</Link>
            <span className="text-sand-border">|</span>
            <Link to="/datenschutz" className="hover:text-ink transition-colors">Datenschutz</Link>
            <span className="text-sand-border">|</span>
            <Link to="/statistik" className="hover:text-ink transition-colors">Statistik</Link>
          </div>
        </div>
      </footer>

      {wizard && <ApplicationWizard funding={wizard} profil={profil} onClose={() => setWizard(null)} />}
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
