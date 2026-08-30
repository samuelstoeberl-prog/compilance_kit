// ═══════════════════════════════════════════════════════════════════════════
//  Regelbasierter Extraktor – KEIN API, KEINE KI-Kosten
//  Nutzt Keyword-Scanning + Regex + DOM-Analyse statt Claude API
// ═══════════════════════════════════════════════════════════════════════════

import * as cheerio from 'cheerio'
import type { Funding, Regulation } from '../../src/types.js'
import type { CrawledPage } from '../core/crawler.js'

// ── Typ-Erkennung ─────────────────────────────────────────────────────────────

function detectFundingType(text: string): 'Zuschuss' | 'Kredit' | 'Steuervorteil' {
  const t = text.toLowerCase()
  if (/steuerbonus|steuervorteil|steuerermäßigung|steuerlich|steuerabzug/.test(t)) return 'Steuervorteil'
  if (/kredit|darlehen|zinsgünst|zinsbind|rückzahl|annuitäten/.test(t)) return 'Kredit'
  return 'Zuschuss'
}

function detectQuelle(page: CrawledPage): 'EU' | 'Bund' | 'Bundesland' {
  if (page.region === 'EU' || /europa\.eu|esf\.de|efre/i.test(page.url)) return 'EU'
  if (page.region === 'Bund' || /bund\.de|kfw\.de|bafa\.de|bmwk\.de|bmbf\.de|exist\.de|zim\.de/.test(page.url)) return 'Bund'
  return 'Bundesland'
}

// ── Betrag-Extraktion ─────────────────────────────────────────────────────────

function extractMaxBetrag(text: string): number | null {
  const patterns = [
    // "bis zu 2 Mio. Euro" / "bis zu 2.000.000 €"
    /bis\s+zu\s+([\d.,]+)\s*(?:Mio\.?)?\s*(?:Euro|€)/gi,
    // "maximal 50.000 Euro"
    /max(?:imal|\.?)?\s+([\d.,]+)\s*(?:Mio\.?)?\s*(?:Euro|€)/gi,
    // "100.000 Euro Zuschuss" / "Förderbetrag: 500.000 €"
    /(?:Förderbetrag|Zuschuss|Kredit|Darlehen)[^\d]*([\d.,]+)\s*(?:Mio\.?)?\s*(?:Euro|€)/gi,
    // "Fördervolumen bis 1 Mio"
    /Fördervolumen[^\d]*([\d.,]+)\s*(?:Mio\.?)?/gi,
    // "Förderhöhe: 25.000 €"
    /Förderhöhe[:\s]*([\d.,]+)\s*(?:Mio\.?)?\s*(?:Euro|€)/gi,
  ]

  let best = 0
  for (const pattern of patterns) {
    pattern.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = pattern.exec(text)) !== null) {
      const raw = m[1].replace(/\./g, '').replace(',', '.')
      let val = parseFloat(raw)
      if (isNaN(val)) continue
      // Erkenne "Mio." im Match
      if (/mio/i.test(m[0])) val *= 1_000_000
      if (val > best && val <= 100_000_000) best = val
    }
  }
  return best > 0 ? Math.round(best) : null
}

// ── Prozentsatz ───────────────────────────────────────────────────────────────

function extractFoerderquote(text: string): string | null {
  const m = text.match(/(\d{1,3})\s*%\s*(?:der|Förder|Zuschuss|Kosten|förderfähig)/i)
  return m ? `bis zu ${m[1]} % der förderfähigen Kosten` : null
}

// ── Zinssatz ──────────────────────────────────────────────────────────────────

function extractZins(text: string): string | null {
  const m = text.match(/(\d+[.,]\d+)\s*%\s*(?:p\.a\.|pro Jahr|Zinsen|Zinssatz|effektiv)/i)
  return m ? `ab ${m[1].replace(',', '.')} % p.a.` : null
}

// ── Bearbeitungszeit ──────────────────────────────────────────────────────────

function extractBearbeitungszeit(text: string): [number, number] {
  const m = text.match(/(\d+)\s*(?:bis\s*(\d+))?\s*Wochen/i)
  if (m) {
    const min = parseInt(m[1])
    const max = m[2] ? parseInt(m[2]) : min + 2
    return [min, max]
  }
  const mMon = text.match(/(\d+)\s*(?:bis\s*(\d+))?\s*Monate?/i)
  if (mMon) {
    const min = parseInt(mMon[1]) * 4
    const max = (mMon[2] ? parseInt(mMon[2]) : parseInt(mMon[1]) + 1) * 4
    return [min, max]
  }
  return [4, 8] // Default-Schätzung
}

// ── Antrag-URL ────────────────────────────────────────────────────────────────

function extractAntragUrl(html: string, baseUrl: string): string {
  const $ = cheerio.load(html)
  const antragKeywords = [
    'jetzt beantragen', 'antrag stellen', 'antragstellung', 'zum antrag',
    'online beantragen', 'förderantrag', 'beantragen', 'antragstellen',
  ]
  let best = ''

  $('a').each((_, el) => {
    const linkText = $(el).text().toLowerCase().trim()
    const href = $(el).attr('href') ?? ''
    const isAntrag =
      antragKeywords.some(kw => linkText.includes(kw)) ||
      /antrag/i.test(href)

    if (isAntrag && href && !best) {
      try { best = new URL(href, baseUrl).href } catch { /* skip */ }
    }
  })

  return best || baseUrl
}

// ── Ausschlusskriterien ───────────────────────────────────────────────────────

function extractAusschluesse(text: string): string[] {
  const results: string[] = []
  // Sätze mit Ausschluss-Signalwörtern
  const sentences = text.split(/[.!?]\s+/)
  const negationKw = ['nicht förderfähig', 'ausgeschlossen', 'kein anspruch', 'nicht berechtigt', 'nicht antragsberechtigt']
  for (const s of sentences) {
    const lower = s.toLowerCase()
    if (negationKw.some(kw => lower.includes(kw)) && s.length < 200) {
      results.push(s.trim())
      if (results.length >= 4) break
    }
  }
  // Regex für explizite Limits
  const maxMA = text.match(/(?:max(?:imal)?\.?|bis zu|höchstens)\s*(\d+)\s*Mitarbeitende?/i)
  if (maxMA) results.push(`Max. ${maxMA[1]} Mitarbeitende`)
  const maxUmsatz = text.match(/(?:Jahresumsatz|Umsatz)\s*(?:max\.?|bis zu|unter)\s*([\d,.]+\s*(?:Mio\.?)?\s*€?)/i)
  if (maxUmsatz) results.push(`Max. Jahresumsatz ${maxUmsatz[1].trim()}`)

  return results.slice(0, 5)
}

// ── Mitarbeiter-Limit ─────────────────────────────────────────────────────────

function extractMitarbeiterMax(text: string): number | undefined {
  const m = text.match(/(?:max\.?|bis zu|weniger als|unter)\s*(\d+)\s*(?:Mitarbeiter|Beschäftigte|Mitarbeitende)/i)
  return m ? parseInt(m[1]) : undefined
}

// ── Bundesland-Erkennung ──────────────────────────────────────────────────────

function extractBundeslaender(page: CrawledPage): string[] {
  const LAENDER = [
    'Bayern', 'Baden-Württemberg', 'Nordrhein-Westfalen', 'Berlin',
    'Hamburg', 'Hessen', 'Sachsen', 'Niedersachsen', 'Thüringen',
    'Rheinland-Pfalz', 'Sachsen-Anhalt', 'Brandenburg', 'Mecklenburg-Vorpommern',
    'Schleswig-Holstein', 'Saarland', 'Bremen',
  ]
  if (page.region === 'Bund' || page.region === 'EU') return ['alle']
  const found = LAENDER.filter(l =>
    page.rawText.includes(l) || page.region === l
  )
  return found.length > 0 ? found : [page.region]
}

// ── Branchen-Relevanz ─────────────────────────────────────────────────────────

function detectBranchen(text: string): string[] {
  const map: Record<string, string[]> = {
    'Software / IT': ['software', 'it-sicherheit', 'digitalisierung', 'cloud', 'künstliche intelligenz', 'ki ', ' it '],
    'Produktion / Fertigung': ['produktion', 'fertigung', 'industrie', 'maschinen', 'manufacturing'],
    'Handel / E-Commerce': ['handel', 'e-commerce', 'einzelhandel', 'onlineshop', 'vertrieb'],
    'Dienstleistungen': ['dienstleistung', 'beratung', 'consulting'],
    'Bau / Handwerk': ['bau ', 'handwerk', 'baugewerbe', 'sanierung'],
    'Gastronomie / Hotellerie': ['gastronomie', 'hotel', 'restaurant', 'tourismus'],
    'Gesundheit': ['gesundheit', 'medizin', 'pflege', 'arzt', 'klinik'],
    'Landwirtschaft': ['landwirtschaft', 'agrar', 'forst'],
  }
  const lower = text.toLowerCase()
  return Object.entries(map)
    .filter(([, kws]) => kws.some(kw => lower.includes(kw)))
    .map(([label]) => label)
}

function detectMitarbeiterBand(text: string): string[] {
  const bands: string[] = []
  if (/(?:ein|1)\s*bis\s*(?:neun|9)|kleinstunternehmen|solo.?selbständig/i.test(text)) bands.push('1–9')
  if (/10\s*bis\s*49|kleinunternehmen/i.test(text)) bands.push('10–49')
  if (/50\s*bis\s*249|mittelständisch/i.test(text)) bands.push('50–249')
  if (/250\s*(bis|und mehr|oder mehr)/i.test(text)) bands.push('250+')
  return bands.length ? bands : ['1–9', '10–49'] // KMU-Default
}

// ── Slug-Generator ────────────────────────────────────────────────────────────

function toId(title: string, domain: string): string {
  const base = title
    .toLowerCase()
    .replace(/[äöüß]/g, c => ({ ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' }[c] ?? c))
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
  const host = new URL(domain).hostname.replace('www.', '').split('.')[0]
  return `${host}-${base}`
}

// ── Beschreibung ──────────────────────────────────────────────────────────────

function extractDescription(text: string, title: string): string {
  // Ersten sinnvollen Absatz nach dem Titel finden
  const idx = text.indexOf(title)
  const after = idx >= 0 ? text.slice(idx + title.length) : text
  const sentences = after.split(/[.!?]\s+/).filter(s => s.length > 40 && s.length < 300)
  return sentences.slice(0, 2).join('. ').trim() + '.' || text.slice(0, 200)
}

// ── Hauptfunktion: Förderung extrahieren ──────────────────────────────────────

export function extractFundingFromPage(page: CrawledPage, html: string): Funding | null {
  const text = page.rawText
  const title = page.title

  // Mindest-Qualitätsprüfung
  if (!title || title.length < 5) return null
  if (text.length < 300) return null

  const maxBetrag = extractMaxBetrag(text)
  const quote = extractFoerderquote(text)

  // Wenn weder Betrag noch Quote gefunden: kein konkretes Programm
  if (!maxBetrag && !quote) return null

  const beschreibungBase = extractDescription(text, title)
  const beschreibung = quote
    ? `${beschreibungBase} Förderhöhe: ${quote}.`
    : beschreibungBase

  return {
    id: toId(title, page.url),
    title: title.slice(0, 120),
    beschreibung: beschreibung.slice(0, 400),
    typ: detectFundingType(text),
    quelle: detectQuelle(page),
    foerderer: page.domainLabel,
    max_betrag: maxBetrag,
    zins: extractZins(text),
    antrag_url: extractAntragUrl(html, page.url),
    bearbeitungszeit_wochen: extractBearbeitungszeit(text),
    ausschlusskriterien: extractAusschluesse(text),
    benoetigte_dokumente: [
      { name: 'Handelsregisterauszug', auto: true },
      { name: 'Aktueller Jahresabschluss', auto: false },
    ],
    gilt_fuer: {
      rechtsformen: ['alle'],
      mitarbeiter_max: extractMitarbeiterMax(text),
      umsatz_max: null,
      bundeslaender: extractBundeslaender(page),
    },
    relevanz_boost: {
      branchen: detectBranchen(text),
      mitarbeiter: detectMitarbeiterBand(text),
    },
  }
}

// ── Hauptfunktion: Regulierung extrahieren ────────────────────────────────────

const REGULATION_CATEGORIES = [
  { category: 'IT-Sicherheit', keywords: ['nis2', 'it-sicherheit', 'informationssicherheit', 'bsi', 'cyber'] },
  { category: 'Datenschutz', keywords: ['dsgvo', 'datenschutz', 'personenbezogen', 'datenschutzbeauftragter'] },
  { category: 'Arbeitsrecht', keywords: ['arbeitszeitgesetz', 'arbeitsschutz', 'betriebsrat', 'arbeitnehmer', 'mutterschutz'] },
  { category: 'Buchführung', keywords: ['buchführung', 'jahresabschluss', 'aufbewahrungspflicht', 'bilanz', 'hgb'] },
  { category: 'Umwelt', keywords: ['umwelt', 'emissionen', 'nachhaltigkeit', 'co2', 'klimaschutz'] },
  { category: 'Lieferkette', keywords: ['lieferkette', 'lksg', 'sorgfaltspflicht', 'lieferant'] },
  { category: 'Vertragsrecht', keywords: ['agb', 'verbraucherschutz', 'widerrufsrecht', 'gewährleistung'] },
]

function detectCategory(text: string): string {
  const lower = text.toLowerCase()
  for (const { category, keywords } of REGULATION_CATEGORIES) {
    if (keywords.filter(kw => lower.includes(kw)).length >= 2) return category
  }
  return 'Sonstiges'
}

function extractRechtsgrundlage(text: string): string {
  // Sucht nach Paragraph-Angaben: "§ 33 DSGVO", "Art. 5 Abs. 1 DSGVO", "§ 8a BSIG"
  const m = text.match(/(?:Art\.|§)\s*\d+[a-z]?\s*(?:Abs\.\s*\d+)?\s*[A-Z]{2,}/i)
  return m ? m[0].trim() : 'Siehe Quelle'
}

function extractPflichtTitle(text: string, pageTitle: string): string {
  // Versuche einen präzisen Kurznamen zu extrahieren
  const obligations = [
    'Meldepflicht', 'Dokumentationspflicht', 'Registrierungspflicht',
    'Nachweispflicht', 'Aufbewahrungspflicht', 'Berichtspflicht',
    'Schulungspflicht', 'Zertifizierungspflicht',
  ]
  for (const obl of obligations) {
    if (text.includes(obl)) return `${pageTitle} – ${obl}`
  }
  return pageTitle.slice(0, 80)
}

export function extractRegulationFromPage(page: CrawledPage): Regulation | null {
  const text = page.rawText
  if (!page.title || text.length < 200) return null

  const category = detectCategory(text)
  if (category === 'Sonstiges' && !/pflicht|anforderung|frist|bußgeld/i.test(text)) return null

  return {
    id: toId(page.title, page.url),
    title: extractPflichtTitle(text, page.title),
    category,
    beschreibung: extractDescription(text, page.title).slice(0, 400),
    rechtsgrundlage: extractRechtsgrundlage(text),
    quelle_url: page.url,
    gilt_fuer: {
      rechtsformen: ['alle'],
      mitarbeiter_min: extractMitarbeiterMax(text) ?? undefined,
    },
    hat_dokument_generator: false,
  }
}

// ── Batch-Verarbeitung ────────────────────────────────────────────────────────

export function batchExtractFundings(pages: CrawledPage[], htmlMap: Map<string, string>): Funding[] {
  const results: Funding[] = []
  const seenIds = new Set<string>()

  console.log(`\n[Keyword-Extraktor] Verarbeite ${pages.length} Seiten (kein API) …`)

  for (const page of pages) {
    const html = htmlMap.get(page.url) ?? ''
    const funding = extractFundingFromPage(page, html)
    if (funding && !seenIds.has(funding.id)) {
      seenIds.add(funding.id)
      results.push(funding)
      console.log(`  ✓ [${funding.typ}] ${funding.title.slice(0, 60)} – max. ${funding.max_betrag?.toLocaleString('de-DE') ?? '?'} €`)
    }
  }

  console.log(`[Keyword-Extraktor] Gesamt: ${results.length} Programme extrahiert`)
  return results
}

export function batchExtractRegulations(pages: CrawledPage[]): Regulation[] {
  const results: Regulation[] = []
  const seenIds = new Set<string>()

  console.log(`\n[Keyword-Extraktor] Verarbeite ${pages.length} Regulatorik-Seiten …`)

  for (const page of pages) {
    const reg = extractRegulationFromPage(page)
    if (reg && !seenIds.has(reg.id)) {
      seenIds.add(reg.id)
      results.push(reg)
      console.log(`  ✓ [${reg.category}] ${reg.title.slice(0, 60)}`)
    }
  }

  console.log(`[Keyword-Extraktor] Gesamt: ${results.length} Pflichten extrahiert`)
  return results
}
