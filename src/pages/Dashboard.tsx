import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfil } from '../context/ProfilContext'
import { filterRegulations, sortedFundings } from '../utils/filter'
import ApplicationWizard from '../components/ApplicationWizard'
import DocumentGenerator from '../components/DocumentGenerator'
import regulationData from '../data/regulations.json'
import fundingData from '../data/fundings.json'
import type { Regulation, Funding, PflichtStatus, FundingMitScore, RegulationMitStatus } from '../types'

type Tab = 'pflichten' | 'foerderungen'
type StatusFilter = 'alle' | 'offen' | 'erledigt' | 'nicht_relevant'

const KATEGORIE_COLORS: Record<string, string> = {
  'Datenschutz': 'bg-blue-900/40 text-blue-300',
  'IT-Sicherheit': 'bg-orange-900/40 text-orange-300',
  'Arbeitsrecht': 'bg-purple-900/40 text-purple-300',
  'Recht': 'bg-ink-border text-muted',
  'Steuer': 'bg-yellow-900/40 text-yellow-300',
  'Umwelt': 'bg-green-900/40 text-green-300',
}

const TYP_COLORS: Record<string, string> = {
  'Zuschuss': 'bg-teal-dark/40 text-teal',
  'Kredit': 'bg-blue-900/40 text-blue-300',
  'Steuervorteil': 'bg-yellow-900/40 text-yellow-300',
}

export default function Dashboard() {
  const { profil, statusMap, setStatus } = useProfil()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('pflichten')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('alle')
  const [kategorieFilter, setKategorieFilter] = useState('alle')
  const [wizard, setWizard] = useState<FundingMitScore | null>(null)
  const [docGen, setDocGen] = useState<RegulationMitStatus | null>(null)

  if (!profil) { navigate('/'); return null }

  const allRegs = filterRegulations(regulationData as Regulation[], profil, statusMap)
  const allFundings = sortedFundings(fundingData as Funding[], profil)

  const gefiltert = allRegs.filter(r => {
    if (statusFilter !== 'alle' && r.status !== statusFilter) return false
    if (kategorieFilter !== 'alle' && r.category !== kategorieFilter) return false
    return true
  })

  const kategorien = [...new Set(allRegs.map(r => r.category))]
  const counts = {
    alle: allRegs.length,
    offen: allRegs.filter(r => r.status === 'offen').length,
    erledigt: allRegs.filter(r => r.status === 'erledigt').length,
    nicht_relevant: allRegs.filter(r => r.status === 'nicht_relevant').length,
  }
  const pct = Math.round((counts.erledigt / Math.max(counts.alle - counts.nicht_relevant, 1)) * 100)
  const initials = profil.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div className="min-h-screen bg-ink font-sans">
      {/* Header */}
      <header className="bg-ink-light border-b border-ink-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-sand rounded flex items-center justify-center">
            <span className="text-ink text-xs font-mono font-bold">CK</span>
          </div>
          <span className="font-serif text-sand-light text-lg">ComplianceKit</span>
          <span className="text-xs font-mono bg-ink border border-ink-border text-muted px-2 py-0.5 rounded">BETA</span>
        </div>
        <button onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-ink border border-ink-border hover:border-sand px-4 py-2 rounded-full text-sm transition-colors">
          <div className="w-6 h-6 bg-sand rounded-full flex items-center justify-center text-xs font-bold text-ink">{initials}</div>
          <span className="text-sand-light">{profil.name}</span>
          <span className="text-muted">·</span>
          <span className="text-muted text-xs">{profil.bundesland}</span>
          <span className="text-muted">·</span>
          <span className="text-muted text-xs">{profil.mitarbeiter} MA</span>
        </button>
      </header>

      {/* Tabs */}
      <nav className="bg-ink-light border-b border-ink-border px-6 flex gap-8">
        {([['pflichten', '01 — Pflichten & Regulierungen'], ['foerderungen', '02 — Förderungen & Steuervorteile']] as const).map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`py-3 text-sm font-mono border-b-2 transition-colors ${
              activeTab === tab ? 'border-sand text-sand' : 'border-transparent text-muted hover:text-sand-light'
            }`}>
            {label}
          </button>
        ))}
        <button onClick={() => navigate('/')} className="py-3 text-sm font-mono text-muted hover:text-sand-light ml-auto transition-colors">
          Profil bearbeiten
        </button>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        {/* ── PFLICHTEN TAB ── */}
        {activeTab === 'pflichten' && (
          <div className="flex gap-6">
            {/* Sidebar */}
            <aside className="w-52 flex-shrink-0 space-y-4">
              <div className="bg-ink-light border border-ink-border rounded-xl p-5">
                <div className="text-4xl font-serif text-sand-light">{pct}%</div>
                <div className="text-muted text-xs font-mono uppercase tracking-wider mt-1">erledigt</div>
                <div className="mt-3 bg-ink-border rounded-full h-1.5">
                  <div className="bg-sand h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>

              <div className="space-y-0.5">
                <p className="text-xs font-mono text-muted uppercase tracking-wider px-2 py-1">Status</p>
                {(['alle', 'offen', 'erledigt', 'nicht_relevant'] as const).map(val => (
                  <button key={val} onClick={() => setStatusFilter(val)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      statusFilter === val ? 'bg-ink-border text-sand-light' : 'text-muted hover:bg-ink-light hover:text-sand-light'
                    }`}>
                    <span>{val === 'alle' ? 'Alle' : val === 'offen' ? 'Offen' : val === 'erledigt' ? 'Erledigt' : 'Nicht relevant'}</span>
                    <span className="text-xs font-mono bg-ink px-1.5 py-0.5 rounded">{counts[val]}</span>
                  </button>
                ))}

                <p className="text-xs font-mono text-muted uppercase tracking-wider px-2 py-1 mt-2">Kategorie</p>
                <button onClick={() => setKategorieFilter('alle')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    kategorieFilter === 'alle' ? 'bg-ink-border text-sand-light' : 'text-muted hover:bg-ink-light hover:text-sand-light'
                  }`}>Alle</button>
                {kategorien.map(k => (
                  <button key={k} onClick={() => setKategorieFilter(k)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      kategorieFilter === k ? 'bg-ink-border text-sand-light' : 'text-muted hover:bg-ink-light hover:text-sand-light'
                    }`}>{k}</button>
                ))}
              </div>
            </aside>

            {/* Main */}
            <main className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-serif text-2xl text-sand-light">Ihre Pflichten</h1>
              </div>
              <div className="space-y-2">
                {gefiltert.map(reg => (
                  <div key={reg.id} className={`bg-ink-light rounded-xl border-l-4 ${
                    reg.status === 'erledigt' ? 'border-l-teal' :
                    reg.status === 'nicht_relevant' ? 'border-l-ink-border' : 'border-l-amber'
                  } border border-ink-border overflow-hidden`}>
                    <div className="p-4 flex items-start gap-4">
                      {/* Status circle */}
                      <button onClick={() => {
                        const next: PflichtStatus = reg.status === 'offen' ? 'erledigt' : reg.status === 'erledigt' ? 'nicht_relevant' : 'offen'
                        setStatus(reg.id, next)
                      }} className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs transition-colors ${
                        reg.status === 'erledigt' ? 'bg-teal text-ink-light' :
                        reg.status === 'nicht_relevant' ? 'bg-ink-border text-muted' : 'bg-amber text-ink-light'
                      }`}>
                        {reg.status === 'erledigt' ? '✓' : reg.status === 'nicht_relevant' ? '–' : '!'}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`font-sans font-semibold text-sm ${reg.status === 'nicht_relevant' ? 'text-muted' : 'text-sand-light'}`}>
                            {reg.title}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${KATEGORIE_COLORS[reg.category] ?? 'bg-ink-border text-muted'}`}>
                            {reg.category}
                          </span>
                        </div>
                        <p className={`text-xs mt-1 ${reg.status === 'nicht_relevant' ? 'text-muted-dark' : 'text-muted'}`}>
                          {reg.beschreibung}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs font-mono text-muted-dark">{reg.rechtsgrundlage}</span>
                          <a href={reg.quelle_url} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-sand/70 hover:text-sand transition-colors">→ Quelle</a>
                        </div>
                      </div>

                      {reg.hat_dokument_generator && (
                        <button onClick={() => setDocGen(reg)}
                          className="flex-shrink-0 text-xs bg-ink border border-ink-border hover:border-sand text-sand-light px-3 py-1.5 rounded-lg transition-colors">
                          Dokument generieren
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {gefiltert.length === 0 && (
                  <div className="text-center py-12 text-muted font-sans">Keine Einträge für diesen Filter.</div>
                )}
              </div>
            </main>
          </div>
        )}

        {/* ── FÖRDERUNGEN TAB ── */}
        {activeTab === 'foerderungen' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-serif text-2xl text-sand-light">Förderungen & Steuervorteile</h1>
              <span className="text-sm font-mono text-muted">{allFundings.length} passende Programme</span>
            </div>
            <div className="space-y-3">
              {allFundings.map(f => (
                <div key={f.id} className="bg-ink-light border border-ink-border rounded-xl overflow-hidden hover:border-sand/40 transition-colors">
                  <div className="p-5 flex items-start gap-4">
                    {/* Score badge */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center border ${
                      f.score >= 80 ? 'bg-teal-dark/30 border-teal-dark/50' :
                      f.score >= 60 ? 'bg-amber-dark/20 border-amber-dark/30' : 'bg-ink border-ink-border'
                    }`}>
                      <span className={`text-sm font-mono font-bold ${f.score >= 80 ? 'text-teal' : f.score >= 60 ? 'text-amber' : 'text-muted'}`}>
                        {f.score}
                      </span>
                      <span className="text-xs font-mono text-muted-dark">%</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-sans font-semibold text-sm text-sand-light">{f.title}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${TYP_COLORS[f.typ] ?? 'bg-ink-border text-muted'}`}>
                          {f.typ}
                        </span>
                        <span className="text-xs font-mono text-muted-dark bg-ink border border-ink-border px-2 py-0.5 rounded-full">
                          {f.quelle}
                        </span>
                      </div>
                      <p className="text-xs text-muted font-sans">{f.foerderer}</p>
                      <p className="text-sm text-muted font-sans mt-1">{f.beschreibung}</p>
                      {f.max_betrag && (
                        <p className="text-xs font-mono text-sand/70 mt-2">
                          Max. {f.max_betrag >= 1000000
                            ? `${(f.max_betrag / 1000000).toFixed(1)} Mio. €`
                            : `${(f.max_betrag / 1000).toFixed(0)}k €`}
                          {f.zins && ` · ${f.zins}`}
                        </p>
                      )}
                    </div>

                    <button onClick={() => setWizard(f)}
                      className="flex-shrink-0 text-xs bg-sand text-ink px-3 py-2 rounded-lg font-sans font-medium hover:bg-sand-mid transition-colors whitespace-nowrap">
                      Antrag vorbereiten →
                    </button>
                  </div>
                </div>
              ))}
              {allFundings.length === 0 && (
                <div className="text-center py-12 text-muted font-sans">Keine passenden Förderungen für Ihr Profil.</div>
              )}
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
