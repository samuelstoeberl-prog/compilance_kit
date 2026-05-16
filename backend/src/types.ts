// Shared types für Backend

export interface CompanyProfile {
  name: string
  rechtsform: string
  branche: string
  mitarbeiter: string   // '0' | '1–9' | '10–49' | '50–249' | '250+'
  bundesland: string
  umsatz: string
  gruendungsjahr: string
  foerderzweck: string[]
}

// DB-Row-Typen (wie sie aus PostgreSQL kommen)
export interface FundingRow {
  id: string
  title: string
  beschreibung: string
  typ: 'Zuschuss' | 'Kredit' | 'Steuervorteil'
  quelle: 'EU' | 'Bund' | 'Bundesland'
  foerderer: string
  max_betrag: number | null
  zins: string | null
  antrag_url: string
  bearbeitungszeit_min: number
  bearbeitungszeit_max: number
  ausschlusskriterien: string[]
  benoetigte_dokumente: unknown
  gilt_fuer: unknown
  relevanz_boost: unknown
  scraped_at: string
  updated_at: string
}

export interface RegulationRow {
  id: string
  title: string
  category: string
  beschreibung: string
  rechtsgrundlage: string
  quelle_url: string
  gilt_fuer: unknown
  hat_dokument_generator: boolean
  dokument_typ: string | null
  scraped_at: string
  updated_at: string
}

export interface CompanyRow {
  id: string
  name: string
  rechtsform: string
  branche: string
  mitarbeiter: string
  bundesland: string
  umsatz: string
  gruendungsjahr: string
  foerderzweck: string[]
  created_at: string
  updated_at: string
}
