import { useState } from 'react'
import { PflichtMitStatus, PflichtStatus } from '../types'

const KATEGORIE_COLORS: Record<string, string> = {
  'Datenschutz': 'bg-blue-100 text-blue-800',
  'IT-Sicherheit': 'bg-orange-100 text-orange-800',
  'Arbeitsrecht': 'bg-purple-100 text-purple-800',
  'Branche': 'bg-green-100 text-green-800',
  'Recht': 'bg-gray-100 text-gray-700',
  'Reporting': 'bg-yellow-100 text-yellow-800',
}

interface Props {
  pflicht: PflichtMitStatus
  onStatusChange: (id: string, status: PflichtStatus) => void
}

export default function PflichtCard({ pflicht, onStatusChange }: Props) {
  const [expanded, setExpanded] = useState(false)

  const borderColor = pflicht.status === 'erledigt'
    ? 'border-l-4 border-l-emerald-400'
    : pflicht.status === 'nicht_relevant'
    ? 'border-l-4 border-l-gray-300'
    : 'border-l-4 border-l-orange-400'

  const StatusIcon = () => {
    if (pflicht.status === 'erledigt') return (
      <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center flex-shrink-0">
        <span className="text-white text-sm">✓</span>
      </div>
    )
    if (pflicht.status === 'nicht_relevant') return (
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
        <span className="text-gray-500 text-sm">—</span>
      </div>
    )
    return (
      <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center flex-shrink-0">
        <span className="text-white text-sm font-bold">!</span>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-xl ${borderColor} shadow-sm overflow-hidden`}>
      <div className="p-5">
        <div className="flex items-start gap-4">
          <StatusIcon />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`font-semibold ${pflicht.status === 'nicht_relevant' ? 'text-gray-400' : 'text-gray-900'}`}>
                {pflicht.titel}
              </h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${KATEGORIE_COLORS[pflicht.kategorie]}`}>
                {pflicht.kategorie}
              </span>
            </div>
            <p className={`text-sm mt-1 ${pflicht.status === 'nicht_relevant' ? 'text-gray-400' : 'text-gray-600'}`}>
              {pflicht.beschreibung}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-gray-400 font-mono">{pflicht.quelle}</span>
              <a href={pflicht.quelleUrl} target="_blank" rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline">
                → Quelle
              </a>
            </div>
          </div>
          <button onClick={() => setExpanded(!expanded)}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0 hover:bg-gray-50 transition-colors">
            <span className="text-gray-400">{expanded ? '∨' : '›'}</span>
          </button>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-3">Status ändern:</p>
            <div className="flex gap-2">
              {(['offen', 'erledigt', 'nicht_relevant'] as PflichtStatus[]).map(s => (
                <button key={s} onClick={() => onStatusChange(pflicht.id, s)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                    pflicht.status === s
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                  }`}>
                  {s === 'offen' ? 'Offen' : s === 'erledigt' ? 'Erledigt' : 'Nicht relevant'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
