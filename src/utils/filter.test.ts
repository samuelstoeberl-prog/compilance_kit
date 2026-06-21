import { describe, it, expect } from 'vitest'
import { filterRegulations, scoreFunding, sortedFundings } from './filter'
import type { Regulation, Funding, UnternehmensProfil } from '../types'

function profil(overrides: Partial<UnternehmensProfil> = {}): UnternehmensProfil {
  return {
    name: 'Test GmbH',
    rechtsform: 'GmbH',
    branche: 'IT-Dienstleistungen & Software',
    mitarbeiter: '1–9',
    bundesland: 'Bayern',
    umsatz: '100.000 – 500.000 €',
    gruendungsjahr: '2020 oder später',
    foerderzweck: [],
    ...overrides,
  }
}

function regulation(overrides: Partial<Regulation> = {}): Regulation {
  return {
    id: 'test-reg',
    title: 'Test-Pflicht',
    category: 'Recht',
    beschreibung: 'Beschreibung',
    rechtsgrundlage: '§1 TestG',
    quelle_url: 'https://example.com',
    gilt_fuer: { rechtsformen: ['alle'] },
    hat_dokument_generator: false,
    ...overrides,
  }
}

function funding(overrides: Partial<Funding> = {}): Funding {
  return {
    id: 'test-funding',
    title: 'Test-Förderung',
    beschreibung: 'Beschreibung',
    typ: 'Zuschuss',
    quelle: 'Bund',
    foerderer: 'Bund',
    max_betrag: 50_000,
    zins: null,
    antrag_url: 'https://example.com',
    bearbeitungszeit_wochen: [2, 4],
    ausschlusskriterien: [],
    benoetigte_dokumente: [],
    gilt_fuer: { rechtsformen: ['alle'] },
    ...overrides,
  }
}

describe('filterRegulations', () => {
  it('markiert eine für alle geltende Pflicht als offen', () => {
    const [result] = filterRegulations([regulation()], profil(), {})
    expect(result.status).toBe('offen')
  })

  it('schließt nach Rechtsform aus', () => {
    const reg = regulation({ gilt_fuer: { rechtsformen: ['Einzelunternehmen'] } })
    const [result] = filterRegulations([reg], profil({ rechtsform: 'GmbH' }), {})
    expect(result.status).toBe('nicht_relevant')
  })

  it('lässt passende Rechtsform durch', () => {
    const reg = regulation({ gilt_fuer: { rechtsformen: ['GmbH', 'UG (haftungsbeschränkt)'] } })
    const [result] = filterRegulations([reg], profil({ rechtsform: 'GmbH' }), {})
    expect(result.status).toBe('offen')
  })

  it('schließt nach Branche aus, auch wenn rechtsformen "alle" ist', () => {
    const reg = regulation({
      gilt_fuer: { rechtsformen: ['alle'], branchen: ['Gastronomie / Hotellerie'] },
    })
    const [result] = filterRegulations([reg], profil({ branche: 'IT-Dienstleistungen & Software' }), {})
    expect(result.status).toBe('nicht_relevant')
  })

  it('matched Branche über die normalisierte Onboarding-Branche', () => {
    // 'IT-Dienstleistungen & Software' wird intern zu 'Software / IT' normalisiert
    const reg = regulation({
      gilt_fuer: { rechtsformen: ['alle'], branchen: ['Software / IT'] },
    })
    const [result] = filterRegulations([reg], profil({ branche: 'IT-Dienstleistungen & Software' }), {})
    expect(result.status).toBe('offen')
  })

  it('schließt nach Mindestmitarbeiterzahl aus', () => {
    const reg = regulation({ gilt_fuer: { rechtsformen: ['alle'], mitarbeiter_min: 50 } })
    const [solo] = filterRegulations([reg], profil({ mitarbeiter: '1–9' }), {})
    const [gross] = filterRegulations([reg], profil({ mitarbeiter: '50–249' }), {})
    expect(solo.status).toBe('nicht_relevant')
    expect(gross.status).toBe('offen')
  })

  it('schließt nach Bundesland aus', () => {
    const reg = regulation({ gilt_fuer: { rechtsformen: ['alle'], bundeslaender: ['Berlin'] } })
    const [result] = filterRegulations([reg], profil({ bundesland: 'Bayern' }), {})
    expect(result.status).toBe('nicht_relevant')
  })

  it('übernimmt einen vorhandenen Status aus der statusMap, wenn relevant', () => {
    const reg = regulation({ id: 'erledigt-reg' })
    const [result] = filterRegulations([reg], profil(), { 'erledigt-reg': 'erledigt' })
    expect(result.status).toBe('erledigt')
  })

  it('überschreibt einen vorhandenen Status mit "nicht_relevant", wenn nicht (mehr) relevant', () => {
    const reg = regulation({ id: 'erledigt-reg', gilt_fuer: { rechtsformen: ['Einzelunternehmen'] } })
    const [result] = filterRegulations([reg], profil({ rechtsform: 'GmbH' }), { 'erledigt-reg': 'erledigt' })
    expect(result.status).toBe('nicht_relevant')
  })
})

describe('scoreFunding', () => {
  it('gibt 0 bei Überschreitung der maximalen Mitarbeiterzahl', () => {
    const f = funding({ gilt_fuer: { rechtsformen: ['alle'], mitarbeiter_max: 9 } })
    const score = scoreFunding(f, profil({ mitarbeiter: '50–249' }))
    expect(score).toBe(0)
  })

  it('gibt 0 bei nicht passender Rechtsform', () => {
    const f = funding({ gilt_fuer: { rechtsformen: ['Einzelunternehmen'] } })
    const score = scoreFunding(f, profil({ rechtsform: 'GmbH' }))
    expect(score).toBe(0)
  })

  it('gibt 0 bei nicht passendem Bundesland', () => {
    const f = funding({ gilt_fuer: { rechtsformen: ['alle'], bundeslaender: ['Berlin'] } })
    const score = scoreFunding(f, profil({ bundesland: 'Bayern' }))
    expect(score).toBe(0)
  })

  it('gibt 0 bei Überschreitung der Umsatzgrenze', () => {
    const f = funding({ gilt_fuer: { rechtsformen: ['alle'], umsatz_max: '1 Mio. €' } })
    const score = scoreFunding(f, profil({ umsatz: '2 – 10 Mio. €' }))
    expect(score).toBe(0)
  })

  it('vergibt einen Basisscore von 40 ohne weitere Treffer', () => {
    const f = funding()
    const score = scoreFunding(f, profil())
    expect(score).toBeGreaterThanOrEqual(40)
  })

  it('erhöht den Score bei Branchenboost', () => {
    const ohneBoost = funding({ id: 'a' })
    const mitBoost = funding({ id: 'b', relevanz_boost: { branchen: ['Software / IT'] } })
    const scoreOhne = scoreFunding(ohneBoost, profil())
    const scoreMit = scoreFunding(mitBoost, profil())
    expect(scoreMit).toBeGreaterThan(scoreOhne)
  })

  it('begrenzt den Score auf maximal 100', () => {
    const f = funding({
      max_betrag: 2_000_000,
      relevanz_boost: {
        branchen: ['Software / IT'],
        mitarbeiter: ['1–9'],
        gruendungsjahr: ['2020 oder später'],
      },
      gilt_fuer: { rechtsformen: ['alle'], bundeslaender: ['Bayern'] },
    })
    const score = scoreFunding(f, profil({ foerderzweck: ['digitalisierung'] }))
    expect(score).toBeLessThanOrEqual(100)
  })

  it('blendet Programme aus, wenn Förderzweck angegeben aber nicht passend ist', () => {
    const f = funding({ id: 'zim-innovationsfoerderung', title: 'ZIM Innovationsförderung' })
    const score = scoreFunding(f, profil({ foerderzweck: ['gruendung'] }))
    expect(score).toBe(0)
  })
})

describe('sortedFundings', () => {
  it('filtert Programme mit Score 0 heraus und sortiert absteigend', () => {
    const passend = funding({ id: 'passend', relevanz_boost: { branchen: ['Software / IT'] } })
    const nichtPassend = funding({ id: 'nicht-passend', gilt_fuer: { rechtsformen: ['Einzelunternehmen'] } })
    const result = sortedFundings([nichtPassend, passend], profil())

    expect(result.map(f => f.id)).toEqual(['passend'])
    expect(result.every((f, i) => i === 0 || f.score <= result[i - 1].score)).toBe(true)
  })
})
