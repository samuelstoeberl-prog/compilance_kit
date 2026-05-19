import type { Regulation, RegulationMitStatus, PflichtStatus, Funding, FundingMitScore, UnternehmensProfil } from '../types'

const MIT_MAP: Record<string, number> = {
  '0': 0,
  '1–9': 5,
  '10–49': 25,
  '50–249': 100,
  '250+': 500,
}

// Onboarding-Branche → normalisierter Wert (passend zu fundings.json boost-branchen)
const BRANCHE_NORM: Record<string, string> = {
  'Handwerk': 'Bau / Handwerk',
  'Baugewerbe': 'Bau / Handwerk',
  'Industrie & Fertigung': 'Produktion / Fertigung',
  'Einzelhandel': 'Handel / E-Commerce',
  'Großhandel': 'Handel / E-Commerce',
  'E-Commerce': 'Handel / E-Commerce',
  'IT-Dienstleistungen & Software': 'Software / IT',
  'KI & Hochtechnologie': 'Software / IT',
  'Unternehmensberatung & Agentur': 'Dienstleistungen',
  'Kreativwirtschaft': 'Dienstleistungen',
  'Gastronomie & Cafés': 'Gastronomie / Hotellerie',
  'Hotellerie & Beherbergung': 'Gastronomie / Hotellerie',
  'Gesundheitswesen & Soziales': 'Gesundheit / Pflege',
  'Freie Berufe (Recht, Steuern, Architektur)': 'Dienstleistungen',
  'Transport & Logistik': 'Transport',
  'Immobilienwesen': 'Dienstleistungen',
  'Land- & Forstwirtschaft': 'Landwirtschaft',
}

// Für harte Ausschlüsse: Branchen-Gruppe
const BRANCHE_GRUPPE: Record<string, string> = {
  'Handwerk': 'handwerk',
  'Baugewerbe': 'handwerk',
  'Industrie & Fertigung': 'industrie',
  'Einzelhandel': 'handel',
  'Großhandel': 'handel',
  'E-Commerce': 'handel',
  'IT-Dienstleistungen & Software': 'it',
  'KI & Hochtechnologie': 'it',
  'Unternehmensberatung & Agentur': 'dienstleistung',
  'Kreativwirtschaft': 'dienstleistung',
  'Gastronomie & Cafés': 'gastronomie',
  'Hotellerie & Beherbergung': 'gastronomie',
  'Gesundheitswesen & Soziales': 'gesundheit',
  'Freie Berufe (Recht, Steuern, Architektur)': 'dienstleistung',
  'Transport & Logistik': 'transport',
  'Immobilienwesen': 'dienstleistung',
  'Land- & Forstwirtschaft': 'landwirtschaft',
}

// Branchen-Gruppen, die für dieses Programm strukturell nicht geeignet sind
const FUNDING_BRANCHE_AUSSCHLUSS: Record<string, string[]> = {
  // EXIST setzt Hochschulanbindung + innovatives Tech-Vorhaben voraus
  'exist-gruenderstipendium': ['handwerk', 'handel', 'gastronomie', 'transport', 'landwirtschaft', 'dienstleistung'],
  // ZIM: marktorientierte F&E – keine reinen Handels-/Servicebranchen
  'zim-innovationsfoerderung': ['handel', 'gastronomie', 'transport', 'landwirtschaft'],
  // Forschungszulage: nur für echte F&E-Tätigkeiten
  'forschungsbonus-kmu': ['handel', 'gastronomie', 'transport', 'landwirtschaft', 'dienstleistung'],
  // INVEST Wagniskapital: Tech-/Innovations-Startups mit externen Investoren
  'invest-zuschuss-wagniskapital': ['handwerk', 'gastronomie', 'transport', 'landwirtschaft'],
}

function inferZweck(id: string, title: string, typ: string): string[] {
  const s = (id + ' ' + title).toLowerCase()
  const z = new Set<string>()

  if (/digital|it[_-]sicher|cyber|software|cloud|spieleförd|spieleford|ikt/.test(s)) z.add('digitalisierung')
  if (/energ|beg[_-]|solar|erneuerbar|klima|wallbox|ladeinfra|wasserstoff|kälte|kalt|wärm|prozess/.test(s)) z.add('energie')
  if (/innov|forsch|zim[_-]|horizon|interreg|validier|quanten|patent|kreislauf|pflegeinno|bmbf[_-]/.test(s)) z.add('innovation')
  if (/exist/.test(s)) { z.add('gruendung'); z.add('innovation') }
  if (typ === 'Beteiligung' || /htgf|wagniskapital|beteiligung/.test(s)) { z.add('gruendung'); z.add('innovation') }
  if (/gr[uü]end|startup|preseed|mikrokred|mikrodarleh|stipendium/.test(s)) z.add('gruendung')
  if (typ === 'Beratungszuschuss' || /beratung|coaching|gutschein|transform/.test(s)) z.add('beratung')
  if (/ausbildung|fachkraft|azubi|meisterpräm|meisterpram|weiterbild|qualifiz|beschäftig|inklusionspräm|inklusionspram|eingliederung|esf[_-]|bafög|bafog|aufstieg|bildung/.test(s)) z.add('mitarbeiter')
  if (/au[sß]en(?:handel|wirt)|export|invest[_-]in[_-]germany|binnenschiff/.test(s)) z.add('internationalisierung')
  if (/mittelstand|wachstum|investit|betriebsmittel|nachfolge|barrieref|maschinen/.test(s)) z.add('investition')
  if (typ === 'Kredit' || typ === 'Bürgschaft') z.add('investition')
  if (id === 'de-minimis') return ['investition','gruendung','digitalisierung','energie','mitarbeiter','internationalisierung','beratung','innovation']

  return z.size > 0 ? [...z] : ['investition']
}

function umsatzToNum(umsatz: string): number {
  const map: Record<string, number> = {
    'unter 22.000 €': 15_000,
    '22.000 – 50.000 €': 36_000,
    '50.000 – 100.000 €': 75_000,
    '100.000 – 500.000 €': 300_000,
    '500.000 € – 1 Mio. €': 750_000,
    '1 – 2 Mio. €': 1_500_000,
    '2 – 10 Mio. €': 6_000_000,
    '10 – 50 Mio. €': 30_000_000,
    'über 50 Mio. €': 100_000_000,
  }
  return map[umsatz] ?? 0
}

function umsatzMaxToNum(umsatzMax: string): number {
  const mioMatch = umsatzMax.match(/([\d,.]+)\s*Mio/)
  if (mioMatch) return parseFloat(mioMatch[1].replace(',', '.')) * 1_000_000
  return Infinity
}

export function filterRegulations(
  regulations: Regulation[],
  profil: UnternehmensProfil,
  statusMap: Record<string, PflichtStatus>
): RegulationMitStatus[] {
  const mitZahl = MIT_MAP[profil.mitarbeiter] ?? 0
  const brancheNorm = BRANCHE_NORM[profil.branche] ?? profil.branche

  return regulations.map(reg => {
    const g = reg.gilt_fuer
    let relevant = true

    if (g.rechtsformen[0] !== 'alle' && !g.rechtsformen.includes(profil.rechtsform)) relevant = false

    if (g.branchen && g.branchen[0] !== 'alle') {
      const match = g.branchen.some(b => b === profil.branche || b === brancheNorm)
      if (!match) relevant = false
    }

    if (g.mitarbeiter_min !== undefined && g.mitarbeiter_min > 0 && mitZahl < g.mitarbeiter_min) relevant = false
    if (g.bundeslaender && g.bundeslaender[0] !== 'alle' && !g.bundeslaender.includes(profil.bundesland)) relevant = false

    const status: PflichtStatus = !relevant
      ? 'nicht_relevant'
      : (statusMap[reg.id] ?? 'offen')

    return { ...reg, status }
  })
}

export function scoreFunding(funding: Funding, profil: UnternehmensProfil): number {
  const g = funding.gilt_fuer
  const mitZahl = MIT_MAP[profil.mitarbeiter] ?? 0
  const brancheGruppe = BRANCHE_GRUPPE[profil.branche] ?? 'sonstige'
  const brancheNorm = BRANCHE_NORM[profil.branche] ?? profil.branche
  const foerderzweck = profil.foerderzweck ?? []

  // Harte Ausschlüsse
  if (g.mitarbeiter_max != null && mitZahl > g.mitarbeiter_max) return 0
  if (g.rechtsformen[0] !== 'alle' && !g.rechtsformen.includes(profil.rechtsform)) return 0
  if (g.bundeslaender && g.bundeslaender[0] !== 'alle' && !g.bundeslaender.includes(profil.bundesland)) return 0
  if (g.gruendungsjahr && !g.gruendungsjahr.includes(profil.gruendungsjahr)) return 0

  if (g.umsatz_max) {
    const limit = umsatzMaxToNum(g.umsatz_max as string)
    if (umsatzToNum(profil.umsatz) > limit) return 0
  }

  // Harte Branchenausschlüsse – strukturell unpassende Programme ausblenden
  const ausschluss = FUNDING_BRANCHE_AUSSCHLUSS[funding.id] ?? []
  if (ausschluss.includes(brancheGruppe)) return 0

  // Förder-Zweck: wenn Nutzer Zwecke angegeben hat und Programm nicht passt → ausblenden
  const programmZwecke = inferZweck(funding.id, funding.title, funding.typ)
  if (foerderzweck.length > 0) {
    const hatOverlap = foerderzweck.some(z => programmZwecke.includes(z))
    if (!hatOverlap) return 0
  }

  // Relevanz-Score
  let score = 40

  const boost = funding.relevanz_boost ?? {}

  // Branchenboost: direkt (falls Daten schon migriert) oder normalisiert
  const brancheBoost = boost.branchen?.some(b => b === profil.branche || b === brancheNorm) ?? false
  if (brancheBoost) score += 25

  if (boost.mitarbeiter?.includes(profil.mitarbeiter)) score += 15

  if (g.bundeslaender && g.bundeslaender[0] !== 'alle') score += 10

  if (boost.gruendungsjahr?.includes(profil.gruendungsjahr)) score += 5

  // Bonus für Förder-Zweck-Treffer
  if (foerderzweck.length > 0) {
    const treffer = foerderzweck.filter(z => programmZwecke.includes(z)).length
    score += Math.min(treffer * 10, 15)
  }

  if ((funding.max_betrag ?? 0) > 500_000) score += 3
  if ((funding.max_betrag ?? 0) > 1_000_000) score += 3

  return Math.min(score, 100)
}

export function sortedFundings(fundings: Funding[], profil: UnternehmensProfil): FundingMitScore[] {
  return fundings
    .map(f => ({ ...f, score: scoreFunding(f, profil) }))
    .filter(f => f.score > 0)
    .sort((a, b) => b.score - a.score)
}
