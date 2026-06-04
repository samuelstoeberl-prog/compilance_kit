// ── Profile ──────────────────────────────────────────────────────────────
export interface UnternehmensProfil {
  name: string
  rechtsform: string
  branche: string
  mitarbeiter: string   // '0' | '1–9' | '10–49' | '50–249' | '250+'
  bundesland: string
  umsatz: string
  gruendungsjahr: string
  foerderzweck: string[] // was sucht das Unternehmen?
  // Kontaktdaten (optional, für Dokumente)
  email?: string
  telefon?: string
  strasse?: string
  plz_ort?: string
  website?: string
}

// ── Regulations ──────────────────────────────────────────────────────────
export type PflichtStatus = 'offen' | 'erledigt' | 'nicht_relevant'

export type DokumentTyp =
  | 'datenschutzerklaerung'
  | 'impressum'
  | 'arbeitszeitnachweis'
  | 'arbeitsschutz-unterweisung'
  | 'kassenbuch'
  | 'datenschutz-folgenabschaetzung'
  | 'it-sicherheitsrichtlinie'
  | 'arbeitsvertrag'
  | 'sozialversicherung-anmeldung'
  | 'gewaehrleistung-agb'

export interface GiltFuer {
  rechtsformen: string[]
  branchen?: string[]
  mitarbeiter_min?: number
  bundeslaender?: string[]
}

export interface Regulation {
  id: string
  title: string
  category: string
  beschreibung: string
  rechtsgrundlage: string
  quelle_url: string
  gilt_fuer: GiltFuer
  hat_dokument_generator: boolean
  dokument_typ?: DokumentTyp
}

export interface RegulationMitStatus extends Regulation {
  status: PflichtStatus
}

// ── Fundings ─────────────────────────────────────────────────────────────
export interface BenoetigtsDokument {
  name: string
  auto: boolean
}

export interface FundingGiltFuer {
  rechtsformen: string[]
  mitarbeiter_max?: number
  umsatz_max?: string | null
  bundeslaender?: string[]
  gruendungsjahr?: string[]
}

export interface FundingRelevanzBoost {
  branchen?: string[]
  mitarbeiter?: string[]
  gruendungsjahr?: string[]
}

export interface Funding {
  id: string
  title: string
  beschreibung: string
  typ: 'Zuschuss' | 'Kredit' | 'Steuervorteil' | 'Bürgschaft' | 'Beteiligung' | 'Beratungszuschuss'
  quelle: 'EU' | 'Bund' | 'Bundesland' | 'Gemeinde'
  foerderer: string
  max_betrag: number | null
  zins: string | null
  antrag_url: string
  bearbeitungszeit_wochen: [number, number]
  ausschlusskriterien: string[]
  benoetigte_dokumente: BenoetigtsDokument[]
  gilt_fuer: FundingGiltFuer
  relevanz_boost?: FundingRelevanzBoost
}

export interface FundingMitScore extends Funding {
  score: number
}
