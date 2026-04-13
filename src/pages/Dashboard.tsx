import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfil } from '../context/ProfilContext'
import { filterPflichten, filterFoerderungen } from '../utils/filter'
import PflichtCard from '../components/PflichtCard'
import FoerderungCard from '../components/FoerderungCard'
import pflichtData from '../data/pflichten.json'
import foerderungData from '../data/foerderungen.json'
import { Pflicht, Foerderung, PflichtStatus } from '../types'

type Tab = 'pflichten' | 'foerderungen'
type StatusFilter = 'alle' | 'offen' | 'erledigt' | 'nicht_relevant'

export default function Dashboard() {
  const { profil, statusMap, setStatus } = useProfil()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('pflichten')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('alle')
  const [kategorieFilter, setKategorieFilter] = useState<string>('alle')

  if (!profil) {
    navigate('/')
    return null
  }

  const allePflichten = filterPflichten(pflichtData as Pflicht[], profil, statusMap)
  const alleFoerderungen = filterFoerderungen(foerderungData as Foerderung[], profil)

  const gefilterte = allePflichten.filter(p => {
    if (statusFilter !== 'alle' && p.status !== statusFilter) return false
    if (kategorieFilter !== 'alle' && p.kategorie !== kategorieFilter) return false
    return true
  })

  const kategorien = [...new Set(allePflichten.map(p => p.kategorie))]
  const statusCounts = {
    alle: allePflichten.length,
    offen: allePflichten.filter(p => p.status === 'offen').length,
    erledigt: allePflichten.filter(p => p.status === 'erledigt').length,
    nicht_relevant: allePflichten.filter(p => p.status === 'nicht_relevant').length,
  }
  const erledigtProzent = Math.round(
    (statusCounts.erledigt / (allePflichten.length - statusCounts.nicht_relevant || 1)) * 100
  )

  const initials = profil.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      {/* Header */}
      <header className="bg-[#1a1a1a] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-white rounded flex items-center justify-center">
            <span className="text-black text-xs font-bold">CK</span>
          </div>
          <span className="font-bold">ComplianceKit</span>
          <span className="text-xs bg-gray-600 px-2 py-0.5 rounded font-mono">BETA</span>
        </div>
        <button onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full text-sm transition-colors">
          <div className="w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center text-xs font-bold text-white">
            {initials}
          </div>
          <span>{profil.name}</span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-300">{profil.bundesland}</span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-300">{profil.mitarbeiter} MA</span>
        </button>
      </header>

      {/* Tabs */}
      <nav className="bg-[#1a1a1a] px-6 pb-0 flex gap-8">
        {([['pflichten', '01 — Pflichten & Regulierungen'], ['foerderungen', '02 — Förderungen & Steuervorteile']] as const).map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`pb-3 pt-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-orange-400 text-orange-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}>
            {label}
          </button>
        ))}
        <button onClick={() => navigate('/')}
          className="pb-3 pt-1 text-sm text-gray-500 hover:text-gray-300 ml-auto transition-colors">
          Onboarding-Ansicht
        </button>
      </nav>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        {activeTab === 'pflichten' ? (
          <div className="flex gap-6">
            {/* Sidebar */}
            <aside className="w-56 flex-shrink-0">
              <div className="bg-[#1a1a1a] rounded-xl p-5 mb-4">
                <div className="text-4xl font-bold text-white">{erledigtProzent}%</div>
                <div className="text-gray-400 text-sm mt-1">erledigt</div>
                <div className="mt-3 bg-gray-700 rounded-full h-2">
                  <div className="bg-emerald-400 h-2 rounded-full transition-all" style={{ width: `${erledigtProzent}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider px-2 mb-2">Status</p>
                {(['alle', 'offen', 'erledigt', 'nicht_relevant'] as const).map(val => (
                  <button key={val} onClick={() => setStatusFilter(val)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      statusFilter === val ? 'bg-[#1a1a1a] text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}>
                    <span>{val === 'alle' ? 'Alle' : val === 'offen' ? 'Offen' : val === 'erledigt' ? 'Erledigt' : 'Nicht relevant'}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusFilter === val ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-500'}`}>
                      {statusCounts[val]}
                    </span>
                  </button>
                ))}

                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider px-2 mb-2 mt-4">Kategorie</p>
                <button onClick={() => setKategorieFilter('alle')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    kategorieFilter === 'alle' ? 'bg-[#1a1a1a] text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}>
                  <span>Alle</span>
                </button>
                {kategorien.map(k => (
                  <button key={k} onClick={() => setKategorieFilter(k)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      kategorieFilter === k ? 'bg-[#1a1a1a] text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}>
                    <span>{k}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${kategorieFilter === k ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-500'}`}>
                      {allePflichten.filter(p => p.kategorie === k).length}
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            {/* Main */}
            <main className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Ihre Pflichten</h1>
                <button className="text-sm text-gray-500 border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-white transition-colors">
                  Priorität ↑
                </button>
              </div>
              <div className="space-y-3">
                {gefilterte.map(p => (
                  <PflichtCard key={p.id} pflicht={p} onStatusChange={setStatus} />
                ))}
                {gefilterte.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    Keine Einträge für diesen Filter.
                  </div>
                )}
              </div>
            </main>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Förderungen & Steuervorteile</h1>
              <span className="text-sm text-gray-500">{alleFoerderungen.filter(f => f.relevant).length} passende Programme</span>
            </div>
            <div className="space-y-3">
              {alleFoerderungen.map(({ foerderung, relevant }) => (
                <FoerderungCard key={foerderung.id} foerderung={foerderung} relevant={relevant} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
