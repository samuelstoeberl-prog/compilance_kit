export type Kategorie = 'Datenschutz' | 'IT-Sicherheit' | 'Arbeitsrecht' | 'Branche' | 'Recht' | 'Reporting'

export type PflichtStatus = 'offen' | 'erledigt' | 'nicht_relevant'

export interface Pflicht {
  id: string
  titel: string
  kategorie: Kategorie
  beschreibung: string
  quelle: string
  quelleUrl: string
  bedingungen: {
    minMitarbeiter?: number
    maxMitarbeiter?: number
    rechtsformen?: string[]
    bundeslaender?: string[]
    branchen?: string[]
  }
}

export interface Foerderung {
  id: string
  name: string
  traeger: string
  ebene: 'EU' | 'Bund' | 'Bundesland'
  kategorie: string
  beschreibung: string
  maxBetrag?: string
  foerderquote?: string
  antragUrl: string
  bedingungen: {
    maxMitarbeiter?: number
    bundeslaender?: string[]
    branchen?: string[]
  }
}

export interface UnternehmensProfil {
  name: string
  rechtsform: string
  branche: string
  mitarbeiter: number
  bundesland: string
  umsatzklasse: string
  gruendungsjahr: number
}

export interface PflichtMitStatus extends Pflicht {
  status: PflichtStatus
}
