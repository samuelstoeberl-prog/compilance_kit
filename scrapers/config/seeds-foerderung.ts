// ═══════════════════════════════════════════════════════════════════════════
//  ComplianceKit – Förderung Seed Sources
//  100+ deutsche Institutionen: Bund, EU, alle 16 Bundesländer, Kommunen, IHK
// ═══════════════════════════════════════════════════════════════════════════

export interface DomainConfig {
  origin: string
  seeds: string[]
  label: string
  region: 'EU' | 'Bund' | string   // Bundesland-Name oder 'Bund'
  skipPatterns: RegExp[]
  maxPages: number
  priority: 'high' | 'medium' | 'low'
}

const GLOBAL_SKIP = [
  /\.(pdf|docx?|xlsx?|pptx?|zip|png|jpe?g|gif|svg|css|js|woff2?)$/i,
  /sitemap/i, /login/i, /logout/i, /register/i,
  /datenschutz/i, /impressum/i, /kontakt/i, /presse/i,
  /newsletter/i, /rss/i, /feed/i, /cookie/i,
  /mediathek/i, /video/i, /karriere/i, /stellenangebote/i,
]

// ── Bundesweit / Bund ───────────────────────────────────────────────────────
const BUND: DomainConfig[] = [
  {
    origin: 'https://www.foerderdatenbank.de',
    seeds: [
      '/FDB/Content/DE/Foerderprogramm/list.html',
      '/FDB/Content/DE/Foerderprogramm/Bund/',
      '/FDB/Content/DE/Foerderprogramm/Laender/',
      '/FDB/Content/DE/Foerderprogramm/EU/',
      '/FDB/Content/DE/Suche/suche.html?query=KMU',
      '/FDB/Content/DE/Suche/suche.html?query=Digitalisierung',
      '/FDB/Content/DE/Suche/suche.html?query=Innovation',
      '/FDB/Content/DE/Suche/suche.html?query=Gruendung',
    ],
    label: 'Förderdatenbank Bund',
    region: 'Bund',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 500,
    priority: 'high',
  },
  {
    origin: 'https://www.kfw.de',
    seeds: [
      '/inlandsfoerderung/Unternehmen/',
      '/inlandsfoerderung/Unternehmen/Gruenden-und-Nachfolgen/',
      '/inlandsfoerderung/Unternehmen/Innovation-und-Digitalisierung/',
      '/inlandsfoerderung/Unternehmen/Energie-und-Umwelt/',
      '/inlandsfoerderung/Unternehmen/Wachsen-und-Investieren/',
      '/inlandsfoerderung/Unternehmen/Freie-Berufe/',
    ],
    label: 'KfW Bankengruppe',
    region: 'Bund',
    skipPatterns: [...GLOBAL_SKIP, /\/Themen\//, /\/Service\//],
    maxPages: 120,
    priority: 'high',
  },
  {
    origin: 'https://www.bafa.de',
    seeds: [
      '/DE/Wirtschaft/Beratung_Finanzierung/',
      '/DE/Energie/',
      '/DE/Transformation/',
      '/DE/Aussenwirtschaft/',
    ],
    label: 'BAFA',
    region: 'Bund',
    skipPatterns: [...GLOBAL_SKIP, /Formulare/, /Publikationen/],
    maxPages: 120,
    priority: 'high',
  },
  {
    origin: 'https://www.bmwk.de',
    seeds: [
      '/Redaktion/DE/Artikel/Digitale-Welt/',
      '/Redaktion/DE/Artikel/Mittelstand/',
      '/Redaktion/DE/Artikel/Gruendung/',
      '/Redaktion/DE/Artikel/Innovation/',
      '/Redaktion/DE/Artikel/Energie/',
    ],
    label: 'BMWK',
    region: 'Bund',
    skipPatterns: [...GLOBAL_SKIP, /Publikationen/, /Studien/],
    maxPages: 100,
    priority: 'high',
  },
  {
    origin: 'https://www.bmbf.de',
    seeds: [
      '/de/foerderung/',
      '/de/foerderprogramme/',
    ],
    label: 'BMBF',
    region: 'Bund',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 80,
    priority: 'medium',
  },
  {
    origin: 'https://www.zim.de',
    seeds: ['/ZIM/Navigation/DE/Foerderung/'],
    label: 'ZIM Innovationsprogramm',
    region: 'Bund',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 40,
    priority: 'high',
  },
  {
    origin: 'https://www.exist.de',
    seeds: ['/EXIST/Navigation/DE/Gruendungsfoerderung/'],
    label: 'EXIST Gründungsförderung',
    region: 'Bund',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 40,
    priority: 'medium',
  },
  {
    origin: 'https://www.bescheinigung-forschungszulage.de',
    seeds: ['/BSFZ/Navigation/DE/Antragsteller/'],
    label: 'BSFZ Forschungszulage',
    region: 'Bund',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 20,
    priority: 'medium',
  },
  {
    origin: 'https://www.bundesanzeiger.de',
    seeds: ['/pub/de/start'],
    label: 'Bundesanzeiger',
    region: 'Bund',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'low',
  },
  {
    origin: 'https://www.arbeitsagentur.de',
    seeds: [
      '/unternehmen/finanziell/',
      '/unternehmen/aus-und-weiterbildung/',
    ],
    label: 'Bundesagentur für Arbeit',
    region: 'Bund',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 60,
    priority: 'medium',
  },
]

// ── EU ──────────────────────────────────────────────────────────────────────
const EU: DomainConfig[] = [
  {
    origin: 'https://ec.europa.eu',
    seeds: [
      '/regional_policy/de/',
      '/info/funding-tenders/opportunities/portal/screen/programmes/',
    ],
    label: 'EU Kommission – Förderprogramme',
    region: 'EU',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 80,
    priority: 'medium',
  },
  {
    origin: 'https://www.esf.de',
    seeds: ['/DE/Foerderperiode-2021-2027/'],
    label: 'ESF Deutschland',
    region: 'EU',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 40,
    priority: 'medium',
  },
]

// ── Bayern ───────────────────────────────────────────────────────────────────
const BAYERN: DomainConfig[] = [
  {
    origin: 'https://www.lfa.de',
    seeds: [
      '/foerderprodukte/',
      '/foerderprodukte/gruenden-und-nachfolgen/',
      '/foerderprodukte/investieren-und-innovieren/',
      '/foerderprodukte/digitalisieren/',
      '/foerderprodukte/energie-und-umwelt/',
      '/foerderprodukte/internationalisieren/',
    ],
    label: 'LfA Förderbank Bayern',
    region: 'Bayern',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 80,
    priority: 'high',
  },
  {
    origin: 'https://www.digitalbonus.bayern',
    seeds: ['/'],
    label: 'Digitalbonus Bayern',
    region: 'Bayern',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 20,
    priority: 'high',
  },
  {
    origin: 'https://www.stmwi.bayern.de',
    seeds: [
      '/wirtschaft/foerderprogramme/',
      '/wirtschaft/digitalisierung/',
    ],
    label: 'StMWi Bayern',
    region: 'Bayern',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 60,
    priority: 'medium',
  },
  {
    origin: 'https://www.wifoe.de',
    seeds: ['/'],
    label: 'Wirtschaftsförderung Bayern',
    region: 'Bayern',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 40,
    priority: 'medium',
  },
]

// ── Baden-Württemberg ─────────────────────────────────────────────────────────
const BW: DomainConfig[] = [
  {
    origin: 'https://www.l-bank.de',
    seeds: [
      '/foerderung/',
      '/foerderung/wirtschaft/',
      '/foerderung/wohnraumfoerderung/',
    ],
    label: 'L-Bank Baden-Württemberg',
    region: 'Baden-Württemberg',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 80,
    priority: 'high',
  },
  {
    origin: 'https://wm.baden-wuerttemberg.de',
    seeds: ['/themen/wirtschaft/foerderung/'],
    label: 'Wirtschaftsministerium BW',
    region: 'Baden-Württemberg',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 40,
    priority: 'medium',
  },
  {
    origin: 'https://www.bw-invest.de',
    seeds: ['/foerderung/'],
    label: 'BW Invest',
    region: 'Baden-Württemberg',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'medium',
  },
]

// ── NRW ──────────────────────────────────────────────────────────────────────
const NRW: DomainConfig[] = [
  {
    origin: 'https://www.nrwbank.de',
    seeds: [
      '/de/foerderangebote/',
      '/de/foerderangebote/unternehmensfoerderung/',
      '/de/foerderangebote/gruendungsfoerderung/',
    ],
    label: 'NRW.BANK',
    region: 'Nordrhein-Westfalen',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 80,
    priority: 'high',
  },
  {
    origin: 'https://www.wirtschaft.nrw',
    seeds: ['/foerderung/'],
    label: 'Wirtschaftsministerium NRW',
    region: 'Nordrhein-Westfalen',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 40,
    priority: 'medium',
  },
  {
    origin: 'https://www.efre.nrw.de',
    seeds: ['/foerderung/'],
    label: 'EFRE NRW',
    region: 'Nordrhein-Westfalen',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 40,
    priority: 'medium',
  },
]

// ── Berlin ────────────────────────────────────────────────────────────────────
const BERLIN: DomainConfig[] = [
  {
    origin: 'https://www.ibb.de',
    seeds: [
      '/foerderprodukte/',
      '/foerderprodukte/wirtschaft/',
      '/foerderprodukte/gruendung/',
    ],
    label: 'IBB Berlin',
    region: 'Berlin',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 60,
    priority: 'high',
  },
  {
    origin: 'https://www.berlin-partner.de',
    seeds: ['/foerderung/'],
    label: 'Berlin Partner',
    region: 'Berlin',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'medium',
  },
]

// ── Hamburg ───────────────────────────────────────────────────────────────────
const HAMBURG: DomainConfig[] = [
  {
    origin: 'https://www.ifbhh.de',
    seeds: [
      '/foerderprogramme/',
      '/foerderprogramme/wirtschaft/',
    ],
    label: 'IFB Hamburg',
    region: 'Hamburg',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 60,
    priority: 'high',
  },
  {
    origin: 'https://www.hamburg.de',
    seeds: [
      '/wirtschaft/foerderung/',
      '/foerderprogramme/',
    ],
    label: 'Hamburg Wirtschaft',
    region: 'Hamburg',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 40,
    priority: 'medium',
  },
]

// ── Hessen ────────────────────────────────────────────────────────────────────
const HESSEN: DomainConfig[] = [
  {
    origin: 'https://www.wtsh.de',
    seeds: ['/foerderberatung/'],
    label: 'Wirtschaftsförderung Hessen',
    region: 'Hessen',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 40,
    priority: 'medium',
  },
  {
    origin: 'https://www.lew-hessen.de',
    seeds: ['/'],
    label: 'LEW Hessen',
    region: 'Hessen',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'medium',
  },
  {
    origin: 'https://wirtschaft.hessen.de',
    seeds: ['/foerderung/'],
    label: 'Wirtschaftsministerium Hessen',
    region: 'Hessen',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 40,
    priority: 'medium',
  },
]

// ── Sachsen ───────────────────────────────────────────────────────────────────
const SACHSEN: DomainConfig[] = [
  {
    origin: 'https://www.sab.de',
    seeds: [
      '/foerderung/',
      '/foerderung/wirtschaft/',
      '/foerderung/gruendung/',
    ],
    label: 'SAB Sachsen',
    region: 'Sachsen',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 60,
    priority: 'high',
  },
  {
    origin: 'https://www.smwa.sachsen.de',
    seeds: ['/foerderung/'],
    label: 'Wirtschaftsministerium Sachsen',
    region: 'Sachsen',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'medium',
  },
]

// ── Niedersachsen ──────────────────────────────────────────────────────────────
const NIEDERSACHSEN: DomainConfig[] = [
  {
    origin: 'https://www.nbank.de',
    seeds: [
      '/Foerderprogramme/',
      '/Foerderprogramme/Wirtschaft/',
    ],
    label: 'NBank Niedersachsen',
    region: 'Niedersachsen',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 60,
    priority: 'high',
  },
  {
    origin: 'https://www.mw.niedersachsen.de',
    seeds: ['/wirtschaft/foerderung/'],
    label: 'Wirtschaftsministerium Niedersachsen',
    region: 'Niedersachsen',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'medium',
  },
]

// ── Thüringen ──────────────────────────────────────────────────────────────────
const THUERINGEN: DomainConfig[] = [
  {
    origin: 'https://www.aufbaubank.de',
    seeds: [
      '/foerderangebote/',
      '/foerderangebote/wirtschaft/',
    ],
    label: 'Thüringer Aufbaubank',
    region: 'Thüringen',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 60,
    priority: 'high',
  },
  {
    origin: 'https://wirtschaft.thueringen.de',
    seeds: ['/foerderung/'],
    label: 'Wirtschaftsministerium Thüringen',
    region: 'Thüringen',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'medium',
  },
]

// ── Rheinland-Pfalz ────────────────────────────────────────────────────────────
const RLP: DomainConfig[] = [
  {
    origin: 'https://isb.de',
    seeds: [
      '/foerderangebote/',
      '/foerderangebote/wirtschaft/',
    ],
    label: 'ISB Rheinland-Pfalz',
    region: 'Rheinland-Pfalz',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 50,
    priority: 'high',
  },
  {
    origin: 'https://mwvlw.rlp.de',
    seeds: ['/foerderung/'],
    label: 'Wirtschaftsministerium RLP',
    region: 'Rheinland-Pfalz',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'medium',
  },
]

// ── Sachsen-Anhalt ─────────────────────────────────────────────────────────────
const SACHSEN_ANHALT: DomainConfig[] = [
  {
    origin: 'https://www.ib-sachsen-anhalt.de',
    seeds: ['/foerderprogramme/'],
    label: 'Investitionsbank Sachsen-Anhalt',
    region: 'Sachsen-Anhalt',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 50,
    priority: 'high',
  },
]

// ── Brandenburg ────────────────────────────────────────────────────────────────
const BRANDENBURG: DomainConfig[] = [
  {
    origin: 'https://www.ilb.de',
    seeds: [
      '/de/foerderprogramme/',
      '/de/foerderprogramme/wirtschaft/',
    ],
    label: 'ILB Brandenburg',
    region: 'Brandenburg',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 50,
    priority: 'high',
  },
]

// ── Mecklenburg-Vorpommern ─────────────────────────────────────────────────────
const MV: DomainConfig[] = [
  {
    origin: 'https://www.lfi-mv.de',
    seeds: ['/foerderung/'],
    label: 'LFI Mecklenburg-Vorpommern',
    region: 'Mecklenburg-Vorpommern',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 40,
    priority: 'medium',
  },
  {
    origin: 'https://www.regierung-mv.de',
    seeds: ['/wirtschaft/foerderung/'],
    label: 'Landesregierung MV',
    region: 'Mecklenburg-Vorpommern',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'low',
  },
]

// ── Schleswig-Holstein ─────────────────────────────────────────────────────────
const SH: DomainConfig[] = [
  {
    origin: 'https://www.ib-sh.de',
    seeds: ['/foerderung/'],
    label: 'IB Schleswig-Holstein',
    region: 'Schleswig-Holstein',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 50,
    priority: 'high',
  },
]

// ── Saarland ───────────────────────────────────────────────────────────────────
const SAARLAND: DomainConfig[] = [
  {
    origin: 'https://www.saarland.de',
    seeds: [
      '/wirtschaft/foerderung/',
      '/de/portale/wirtschaft/',
    ],
    label: 'Saarland Wirtschaft',
    region: 'Saarland',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 40,
    priority: 'medium',
  },
  {
    origin: 'https://www.sikb.de',
    seeds: ['/foerderung/'],
    label: 'SIKB Saarland',
    region: 'Saarland',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'medium',
  },
]

// ── Bremen ─────────────────────────────────────────────────────────────────────
const BREMEN: DomainConfig[] = [
  {
    origin: 'https://www.bab-bremen.de',
    seeds: ['/foerderangebote/'],
    label: 'BAB Bremen',
    region: 'Bremen',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 40,
    priority: 'high',
  },
]

// ── Kommunale Wirtschaftsförderungen (Großstädte + Landkreise) ─────────────────
const KOMMUNEN: DomainConfig[] = [
  // München
  {
    origin: 'https://www.muenchen.de',
    seeds: ['/rathaus/wirtschaft/foerderung/'],
    label: 'Wirtschaftsförderung München',
    region: 'Bayern',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'medium',
  },
  // Hamburg (Stadt)
  {
    origin: 'https://www.wifoe.hamburg.de',
    seeds: ['/'],
    label: 'Wirtschaftsförderung Hamburg',
    region: 'Hamburg',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'medium',
  },
  // Köln
  {
    origin: 'https://www.stadt-koeln.de',
    seeds: ['/wirtschaft/foerderung/'],
    label: 'Wirtschaftsförderung Köln',
    region: 'Nordrhein-Westfalen',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'low',
  },
  // Frankfurt
  {
    origin: 'https://www.frankfurt.de',
    seeds: ['/wirtschaft/foerderung/'],
    label: 'Wirtschaftsförderung Frankfurt',
    region: 'Hessen',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'low',
  },
  // Stuttgart
  {
    origin: 'https://www.stuttgart.de',
    seeds: ['/wirtschaft/foerderung/'],
    label: 'Wirtschaftsförderung Stuttgart',
    region: 'Baden-Württemberg',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'low',
  },
  // Düsseldorf
  {
    origin: 'https://www.duesseldorf.de',
    seeds: ['/wirtschaft/foerderung/'],
    label: 'Wirtschaftsförderung Düsseldorf',
    region: 'Nordrhein-Westfalen',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'low',
  },
  // Leipzig
  {
    origin: 'https://www.leipzig.de',
    seeds: ['/wirtschaft/foerderung/'],
    label: 'Wirtschaftsförderung Leipzig',
    region: 'Sachsen',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'low',
  },
  // Dresden
  {
    origin: 'https://www.dresden.de',
    seeds: ['/wirtschaft/foerderung/'],
    label: 'Wirtschaftsförderung Dresden',
    region: 'Sachsen',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'low',
  },
  // Nürnberg
  {
    origin: 'https://www.nuernberg.de',
    seeds: ['/wirtschaft/foerderung/'],
    label: 'Wirtschaftsförderung Nürnberg',
    region: 'Bayern',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'low',
  },
]

// ── IHK-Netzwerk ──────────────────────────────────────────────────────────────
const IHK: DomainConfig[] = [
  {
    origin: 'https://www.ihk.de',
    seeds: [
      '/themen/foerderung/',
      '/themen/finanzierung/',
      '/themen/digitalisierung/foerderung/',
    ],
    label: 'IHK Deutschland',
    region: 'Bund',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 60,
    priority: 'medium',
  },
  {
    origin: 'https://www.ihk-muenchen.de',
    seeds: ['/foerderung/'],
    label: 'IHK München',
    region: 'Bayern',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'low',
  },
  {
    origin: 'https://www.ihk-berlin.de',
    seeds: ['/foerderung/'],
    label: 'IHK Berlin',
    region: 'Berlin',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'low',
  },
  {
    origin: 'https://www.ihk-koeln.de',
    seeds: ['/foerderung/'],
    label: 'IHK Köln',
    region: 'Nordrhein-Westfalen',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'low',
  },
  {
    origin: 'https://www.hwk-muenchen.de',
    seeds: ['/foerderung/'],
    label: 'HWK München',
    region: 'Bayern',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 30,
    priority: 'low',
  },
]

// ── Alle Quellen zusammengefasst ───────────────────────────────────────────────
export const ALL_FUNDING_DOMAINS: DomainConfig[] = [
  ...BUND,
  ...EU,
  ...BAYERN,
  ...BW,
  ...NRW,
  ...BERLIN,
  ...HAMBURG,
  ...HESSEN,
  ...SACHSEN,
  ...NIEDERSACHSEN,
  ...THUERINGEN,
  ...RLP,
  ...SACHSEN_ANHALT,
  ...BRANDENBURG,
  ...MV,
  ...SH,
  ...SAARLAND,
  ...BREMEN,
  ...KOMMUNEN,
  ...IHK,
]

export const PROGRAM_KEYWORDS = [
  'förderung', 'förderprogramm', 'fördermittel', 'zuschuss', 'kredit',
  'darlehen', 'antragstellung', 'förderfähig', 'fördervolumen', 'förderhöhe',
  'mittelstand', 'kmu', 'unternehmen', 'steuervorteil', 'subvention',
  'bundesförderung', 'landesförderung', 'beihilfe', 'finanzierungshilfe',
  'investitionszuschuss', 'innovationsförderung', 'digitalisierungsförderung',
]
