import { Foerderung } from '../types'

const EBENE_COLORS: Record<string, string> = {
  'EU': 'bg-blue-100 text-blue-800',
  'Bund': 'bg-gray-100 text-gray-700',
  'Bundesland': 'bg-green-100 text-green-800',
}

interface Props {
  foerderung: Foerderung
  relevant: boolean
}

export default function FoerderungCard({ foerderung, relevant }: Props) {
  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden border-l-4 ${relevant ? 'border-l-emerald-400' : 'border-l-gray-200'}`}>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className={`font-semibold ${relevant ? 'text-gray-900' : 'text-gray-400'}`}>
                {foerderung.name}
              </h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${EBENE_COLORS[foerderung.ebene]}`}>
                {foerderung.ebene}
              </span>
              {relevant && (
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-800">
                  Passend
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mb-2">{foerderung.traeger}</p>
            <p className={`text-sm ${relevant ? 'text-gray-600' : 'text-gray-400'}`}>
              {foerderung.beschreibung}
            </p>
            <div className="flex items-center gap-4 mt-3">
              {foerderung.maxBetrag && (
                <div>
                  <span className="text-xs text-gray-400">Max. Betrag</span>
                  <p className="text-sm font-semibold text-gray-800">{foerderung.maxBetrag}</p>
                </div>
              )}
              {foerderung.foerderquote && (
                <div>
                  <span className="text-xs text-gray-400">Förderquote</span>
                  <p className="text-sm font-semibold text-gray-800">{foerderung.foerderquote}</p>
                </div>
              )}
            </div>
          </div>
          <a href={foerderung.antragUrl} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 text-xs bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap">
            Zum Antrag →
          </a>
        </div>
      </div>
    </div>
  )
}
