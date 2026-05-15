// Seed URLs: starting points for the crawler.
// The crawler follows all internal links from these pages up to MAX_DEPTH hops.

export interface DomainConfig {
  // Base URL – crawler stays within this origin
  origin: string
  // Seed path(s) to start crawling from
  seeds: string[]
  // URL path segments that indicate a program detail page (for prioritization)
  programPathHints: string[]
  // URL path segments to skip (pagination noise, login, downloads, etc.)
  skipPatterns: RegExp[]
  // Max pages to crawl per domain (safety cap)
  maxPages: number
  // Human-readable label for logging
  label: string
}

export const DOMAINS: DomainConfig[] = [
  // ── Bundesweite Förderdatenbank (Bund/Länder/EU, ~2.000 Programme) ─────
  {
    origin: 'https://www.foerderdatenbank.de',
    seeds: [
      '/fdb/content/de/index.html',
      '/fdb/content/de/foerderprogramme/bundesfoerderung.html',
      '/fdb/content/de/foerderprogramme/laenderfoerderung.html',
      '/fdb/content/de/foerderprogramme/eu-foerderung.html',
    ],
    programPathHints: ['/foerderprogramme/', '/programm/', '/massnahme/'],
    skipPatterns: [/sitemap/, /login/, /impressum/, /datenschutz/, /\.pdf$/i, /\.xml$/i],
    maxPages: 300,
    label: 'Förderdatenbank Bund',
  },

  // ── KfW Bankengruppe ──────────────────────────────────────────────────
  {
    origin: 'https://www.kfw.de',
    seeds: [
      '/inlandsfoerderung/Unternehmen/',
      '/inlandsfoerderung/Unternehmen/Gruenden-und-Nachfolgen/',
      '/inlandsfoerderung/Unternehmen/Innovation-und-Digitalisierung/',
      '/inlandsfoerderung/Unternehmen/Energie-und-Umwelt/',
      '/inlandsfoerderung/Unternehmen/Wachsen-und-Investieren/',
    ],
    programPathHints: ['/F%C3%B6rderprodukte/', '/Foerderprodukte/', '/produkte/'],
    skipPatterns: [/\/Themen\//, /\/Service\//, /\.pdf$/i, /sitemap/, /login/],
    maxPages: 80,
    label: 'KfW',
  },

  // ── BAFA ──────────────────────────────────────────────────────────────
  {
    origin: 'https://www.bafa.de',
    seeds: [
      '/DE/Wirtschaft/Beratung_Finanzierung/',
      '/DE/Energie/',
      '/DE/Aussenwirtschaft/',
    ],
    programPathHints: ['_node.html', '/foerderung/', '/programm/'],
    skipPatterns: [/Formulare/, /Mediathek/, /Presse/, /\.pdf$/i, /sitemap/],
    maxPages: 80,
    label: 'BAFA',
  },

  // ── BMWK / go-digital ─────────────────────────────────────────────────
  {
    origin: 'https://www.bmwk.de',
    seeds: [
      '/Redaktion/DE/Artikel/Digitale-Welt/',
      '/Redaktion/DE/Artikel/Mittelstand/',
    ],
    programPathHints: ['/Artikel/', '/Dossier/'],
    skipPatterns: [/Publikationen/, /Presse/, /sitemap/, /\.pdf$/i],
    maxPages: 60,
    label: 'BMWK',
  },

  // ── Digitalbonus Bayern ───────────────────────────────────────────────
  {
    origin: 'https://www.digitalbonus.bayern',
    seeds: ['/'],
    programPathHints: ['/antragstellung/', '/foerderung/', '/programm/'],
    skipPatterns: [/\.pdf$/i, /sitemap/, /login/],
    maxPages: 30,
    label: 'Digitalbonus Bayern',
  },

  // ── LfA Bayern ────────────────────────────────────────────────────────
  {
    origin: 'https://www.lfa.de',
    seeds: [
      '/foerderprodukte/',
      '/foerderprodukte/gruenden-und-nachfolgen/',
      '/foerderprodukte/investieren-und-innovieren/',
      '/foerderprodukte/digitalisieren/',
    ],
    programPathHints: ['/foerderprodukte/'],
    skipPatterns: [/\.pdf$/i, /sitemap/, /login/, /presse/],
    maxPages: 60,
    label: 'LfA Bayern',
  },

  // ── NRW.BANK ──────────────────────────────────────────────────────────
  {
    origin: 'https://www.nrwbank.de',
    seeds: ['/de/foerderangebote/'],
    programPathHints: ['/foerderangebote/', '/produkte/'],
    skipPatterns: [/\.pdf$/i, /sitemap/, /login/, /presse/],
    maxPages: 60,
    label: 'NRW.BANK',
  },

  // ── IBB Berlin ────────────────────────────────────────────────────────
  {
    origin: 'https://www.ibb.de',
    seeds: ['/foerderprodukte/'],
    programPathHints: ['/foerderprodukte/'],
    skipPatterns: [/\.pdf$/i, /sitemap/, /login/],
    maxPages: 50,
    label: 'IBB Berlin',
  },

  // ── L-Bank Baden-Württemberg ──────────────────────────────────────────
  {
    origin: 'https://www.l-bank.de',
    seeds: ['/foerderung/'],
    programPathHints: ['/foerderung/'],
    skipPatterns: [/\.pdf$/i, /sitemap/, /login/],
    maxPages: 60,
    label: 'L-Bank BW',
  },
]

// Keyword filter: a page must contain at least one of these to be processed by AI
export const PROGRAM_KEYWORDS = [
  'förderung', 'förderprogramm', 'zuschuss', 'kredit', 'darlehen',
  'antragstellung', 'förderfähig', 'fördervolumen', 'förderhöhe',
  'mittelstand', 'kmu', 'unternehmen', 'steuervorteil', 'subvention',
  'bundesförderung', 'landesförderung',
]
