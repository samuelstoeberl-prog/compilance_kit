import type { DomainConfig } from './seeds-foerderung.js'

const GLOBAL_SKIP = [
  /\.(pdf|docx?|xlsx?|zip|png|jpe?g|gif|svg|css|js|woff2?)$/i,
  /sitemap/i, /login/i, /presse/i, /newsletter/i, /rss/i,
]

export const ALL_REGULATION_DOMAINS: DomainConfig[] = [
  // ── EU-Recht ──────────────────────────────────────────────────────────────
  {
    origin: 'https://eur-lex.europa.eu',
    seeds: [
      '/legal-content/DE/TXT/HTML/?uri=CELEX:32016R0679',  // DSGVO
      '/legal-content/DE/TXT/HTML/?uri=CELEX:32022L2555',  // NIS2
      '/legal-content/DE/TXT/HTML/?uri=CELEX:32023R2854',  // Data Act
      '/legal-content/DE/TXT/HTML/?uri=CELEX:32024R1689',  // AI Act
    ],
    label: 'EUR-Lex (EU-Recht)',
    region: 'EU',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 40,
    priority: 'high',
  },

  // ── Deutsches Bundesrecht ─────────────────────────────────────────────────
  {
    origin: 'https://www.gesetze-im-internet.de',
    seeds: [
      '/BJNR280310016.html',   // DSGVO
      '/arbzg/index.html',     // Arbeitszeitgesetz
      '/muschg/index.html',    // Mutterschutzgesetz
      '/betrVG/index.html',    // Betriebsverfassungsgesetz
      '/bgb/index.html',       // BGB (relevant für AGB, Verträge)
      '/hgb/index.html',       // HGB (Buchführung, Aufbewahrung)
      '/ao_1977/index.html',   // Abgabenordnung
      '/ustg_1980/index.html', // Umsatzsteuergesetz
    ],
    label: 'Gesetze im Internet',
    region: 'Bund',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 60,
    priority: 'high',
  },

  // ── BSI (IT-Sicherheit, NIS2) ──────────────────────────────────────────────
  {
    origin: 'https://www.bsi.bund.de',
    seeds: [
      '/DE/Themen/Unternehmen-und-Organisationen/',
      '/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/',
      '/DE/Themen/Unternehmen-und-Organisationen/Gesetzliche-Grundlagen/NIS-2/',
    ],
    label: 'BSI – IT-Sicherheit',
    region: 'Bund',
    skipPatterns: [...GLOBAL_SKIP, /Publikationen/],
    maxPages: 80,
    priority: 'high',
  },

  // ── Datenschutz ────────────────────────────────────────────────────────────
  {
    origin: 'https://www.bfdi.bund.de',
    seeds: [
      '/DE/Buergerinnen-Buerger/Datenschutz/',
      '/DE/Unternehmen/',
    ],
    label: 'BfDI – Datenschutz',
    region: 'Bund',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 50,
    priority: 'high',
  },

  // ── Arbeitsrecht ───────────────────────────────────────────────────────────
  {
    origin: 'https://www.bmas.de',
    seeds: [
      '/DE/Arbeit/',
      '/DE/Arbeit/Arbeitsrecht/',
      '/DE/Arbeit/Arbeitsschutz/',
    ],
    label: 'BMAS – Arbeitsrecht',
    region: 'Bund',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 60,
    priority: 'high',
  },

  // ── Lieferkettengesetz ─────────────────────────────────────────────────────
  {
    origin: 'https://www.bmwk.de',
    seeds: ['/Redaktion/DE/Artikel/Aussenwirtschaft/lieferkettensorgfaltspflichtengesetz.html'],
    label: 'BMWK – LkSG Lieferkette',
    region: 'Bund',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 20,
    priority: 'high',
  },

  // ── Umwelt / Nachhaltigkeit ────────────────────────────────────────────────
  {
    origin: 'https://www.umweltbundesamt.de',
    seeds: [
      '/themen/wirtschaft-konsum/wirtschaft-umwelt/',
      '/themen/nachhaltigkeit/',
    ],
    label: 'Umweltbundesamt',
    region: 'Bund',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 40,
    priority: 'medium',
  },

  // ── Steuerrecht ───────────────────────────────────────────────────────────
  {
    origin: 'https://www.bundesfinanzministerium.de',
    seeds: ['/Steuern/'],
    label: 'Bundesfinanzministerium',
    region: 'Bund',
    skipPatterns: [...GLOBAL_SKIP],
    maxPages: 40,
    priority: 'medium',
  },
]

export const REGULATION_KEYWORDS = [
  'pflicht', 'verpflichtung', 'anforderung', 'frist', 'meldepflicht',
  'dokumentationspflicht', 'gesetz', 'verordnung', 'richtlinie', 'paragraph',
  'sanktion', 'bußgeld', 'compliance', 'nachweis', 'zertifizierung',
  'datenschutz', 'sicherheit', 'arbeitsschutz', 'aufbewahrung',
]
