import { useState } from 'react'
import type { RegulationMitStatus, UnternehmensProfil, DokumentTyp } from '../types'
import { downloadAsPDF, downloadAsDOCX } from '../utils/exportDoc'

interface Props {
  regulation: RegulationMitStatus
  profil: UnternehmensProfil
  onComplete: (id: string) => void
  onClose: () => void
}

export { buildDocument }

const DOK_LABELS: Record<DokumentTyp, string> = {
  datenschutzerklaerung: 'Datenschutzerklärung',
  impressum: 'Impressum',
  arbeitszeitnachweis: 'Arbeitszeitnachweis-Vorlage',
  'arbeitsschutz-unterweisung': 'Arbeitsschutzunterweisung-Vorlage',
}

function ph(val: string | undefined, placeholder: string): string {
  return val?.trim() ? val.trim() : `[${placeholder}]`
}

function generateDatenschutzerklaerung(profil: UnternehmensProfil): string {
  return `DATENSCHUTZERKLÄRUNG
gemäß Art. 13, 14 DSGVO

Stand: ${new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. VERANTWORTLICHER

${profil.name}
${ph(profil.strasse, 'STRASSE UND HAUSNUMMER')}
${ph(profil.plz_ort, 'PLZ ORT')}

E-Mail: ${ph(profil.email, 'EMAIL-ADRESSE')}
Telefon: ${ph(profil.telefon, 'TELEFONNUMMER')}
${profil.rechtsform !== 'Einzelunternehmen' && profil.rechtsform !== 'GbR' ? 'Handelsregister: [AMTSGERICHT], HRB [NUMMER]' : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2. ARTEN DER VERARBEITETEN DATEN

Wir verarbeiten folgende Kategorien personenbezogener Daten:

• Bestandsdaten (Name, Anschrift, Kontaktdaten)
• Vertragsdaten (Vertragsgegenstand, Laufzeit, Kundenkategorie)
• Nutzungsdaten (besuchte Webseiten, Interesse an Inhalten)
• Kommunikationsdaten (Gerätekennungen, IP-Adressen)
${profil.branche === 'Gesundheit / Pflege' ? '• Gesundheitsdaten (nur soweit für die Leistungserbringung erforderlich, Art. 9 Abs. 2 lit. h DSGVO)' : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3. ZWECK UND RECHTSGRUNDLAGEN DER VERARBEITUNG

3.1 Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO)
Wir verarbeiten Ihre Daten zur Durchführung und Abwicklung von Verträgen sowie zur
Beantwortung vorvertraglicher Anfragen.

3.2 Rechtliche Verpflichtungen (Art. 6 Abs. 1 lit. c DSGVO)
Die Verarbeitung erfolgt zur Erfüllung gesetzlicher Aufbewahrungspflichten gemäß
HGB (§ 257) und AO (§ 147).

3.3 Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO)
Für Direktmarketing gegenüber Bestandskunden, Betrugsverhinderung und
IT-Sicherheit verarbeiten wir Daten auf Grundlage unserer berechtigten Interessen.

3.4 Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)
Soweit Sie eine Einwilligung erteilt haben (z.B. Newsletter), kann diese jederzeit
mit Wirkung für die Zukunft widerrufen werden.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4. EMPFÄNGER UND WEITERGABE

Eine Übermittlung Ihrer Daten erfolgt an:

• Steuerberater / Wirtschaftsprüfer (gesetzliche Pflicht)
• IT-Dienstleister und Hostinganbieter (Auftragsverarbeitung gem. Art. 28 DSGVO)
• Zahlungsdienstleister (soweit erforderlich)
• Behörden (nur auf gesetzliche Anforderung)

Eine Übermittlung in Drittstaaten außerhalb der EU/EWR erfolgt nur bei Vorliegen
geeigneter Garantien (Standardvertragsklauseln gem. Art. 46 DSGVO).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5. SPEICHERDAUER

Wir speichern Ihre Daten nur so lange, wie es für den jeweiligen Zweck erforderlich
ist oder gesetzliche Aufbewahrungsfristen bestehen:

• Vertragsdaten:        10 Jahre (§ 257 HGB)
• Buchungsbelege:       10 Jahre (§ 147 AO)
• Korrespondenz:        6 Jahre (§ 147 AO)
• Einwilligungen:       bis zum Widerruf + 3 Jahre Nachweis

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

6. COOKIES UND TRACKING

Unsere Website verwendet:

• Technisch notwendige Cookies (keine Einwilligung erforderlich)
• [OPTIONAL: Analyse-Cookies (z.B. Matomo/Google Analytics) – nur mit Einwilligung]
• [OPTIONAL: Marketing-Cookies – nur mit Einwilligung]

Sie können Ihre Cookie-Einstellungen jederzeit über unser Cookie-Consent-Banner
anpassen.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

7. IHRE RECHTE (Art. 15-22 DSGVO)

Sie haben das Recht auf:
- Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)
- Berichtigung unrichtiger Daten (Art. 16 DSGVO)
- Löschung Ihrer Daten (Art. 17 DSGVO)
- Einschränkung der Verarbeitung (Art. 18 DSGVO)
- Datenübertragbarkeit (Art. 20 DSGVO)
- Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)
- Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO)

Zur Ausübung Ihrer Rechte wenden Sie sich an: ${ph(profil.email, 'EMAIL-ADRESSE')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

8. BESCHWERDERECHT

Sie haben das Recht, sich bei der zuständigen Datenschutzaufsichtsbehörde
zu beschweren. Die für ${profil.bundesland} zuständige Behörde ist:

[ZUSTÄNDIGE LANDESBEHÖRDE – siehe https://www.bfdi.bund.de]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HINWEIS: Dieses Dokument wurde auf Basis Ihres Unternehmensprofils
(${profil.rechtsform}, ${profil.branche}, ${profil.bundesland}) vorausgefüllt.
Bitte lassen Sie es von einem Rechtsanwalt prüfen und passen Sie alle
[PLATZHALTER] an Ihr Unternehmen an.`
}

function generateImpressum(profil: UnternehmensProfil): string {
  const isGmbHArtig = ['GmbH', 'UG (haftungsbeschränkt)', 'AG'].includes(profil.rechtsform)
  const isEinzel = ['Einzelunternehmen', 'e.K.'].includes(profil.rechtsform)

  return `IMPRESSUM
gemäß § 5 DDG (Digitale-Dienste-Gesetz)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ANGABEN ZUM UNTERNEHMEN

${profil.name}
${ph(profil.strasse, 'STRASSE UND HAUSNUMMER')}
${ph(profil.plz_ort, 'PLZ ORT')}
Deutschland

Telefon: ${ph(profil.telefon, 'TELEFONNUMMER')}
E-Mail:  ${ph(profil.email, 'EMAIL-ADRESSE')}
Website: ${ph(profil.website, 'WEBSITE-URL')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RECHTSFORM UND VERTRETUNG

Rechtsform: ${profil.rechtsform}
${isGmbHArtig ? `Geschäftsführer: [VORNAME NACHNAME]
Registergericht: Amtsgericht [ORT]
Handelsregisternummer: HRB [NUMMER]` : ''}
${profil.rechtsform === 'GbR' ? `Gesellschafter: [NAME 1], [NAME 2]` : ''}
${isEinzel ? `Inhaber: [VORNAME NACHNAME]${profil.rechtsform === 'e.K.' ? '\nRegistergericht: Amtsgericht [ORT]\nHandelsregisternummer: HRA [NUMMER]' : ''}` : ''}
${profil.rechtsform === 'AG' ? `Vorstandsvorsitzender: [VORNAME NACHNAME]\nAufsichtsratsvorsitzender: [VORNAME NACHNAME]` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEUERLICHE ANGABEN

Umsatzsteuer-Identifikationsnummer (§ 27a UStG):
DE [NUMMER – falls vorhanden]

Steuernummer: [FINANZAMT] / [STEUERNUMMER]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VERANTWORTLICH FÜR DEN INHALT (§ 18 Abs. 2 MStV)

[VORNAME NACHNAME]
[STRASSE UND HAUSNUMMER]
[PLZ ORT]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BERUFLICHE ZULASSUNG / AUFSICHTSBEHÖRDE
(nur falls zutreffend)

${profil.branche === 'Gesundheit / Pflege' ? `Zuständige Aufsichtsbehörde: [ZUSTÄNDIGE BEHÖRDE, z.B. Kassenärztliche Vereinigung]
Berufsbezeichnung: [BEZEICHNUNG]
Staat der Verleihung: Deutschland` : '[Falls zutreffend: Angaben zur Berufszulassung eintragen]'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STREITSCHLICHTUNG

Die EU-Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:
https://ec.europa.eu/consumers/odr

Wir sind [bereit / nicht bereit – Zutreffendes auswählen], an einem
Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
teilzunehmen.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HAFTUNGSHINWEIS

Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die
Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich
deren Betreiber verantwortlich.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HINWEIS: Alle [PLATZHALTER] müssen vor Veröffentlichung ersetzt werden.
Branche: ${profil.branche} · Bundesland: ${profil.bundesland}`
}

function generateArbeitszeitnachweis(profil: UnternehmensProfil): string {
  const monat = new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })

  const wochentage = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
  const tableRows = ['Tag|Datum|Beginn|Ende|Pause|Nettozeit']
  for (let woche = 0; woche < 4; woche++) {
    for (const tag of wochentage) {
      tableRows.push(`${tag}|__.__.____| | | | `)
    }
  }
  const tabelle = `[[TABLE]]\n${tableRows.join('\n')}\n[[/TABLE]]`

  return `ARBEITSZEITNACHWEIS
gemäß § 16 Abs. 2 ArbZG und § 17 MiLoG

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

UNTERNEHMEN:    ${profil.name}
MONAT / JAHR:   ${monat}
MITARBEITER/IN: ___________________________
ABTEILUNG:      ___________________________
PERSONALNUMMER: ___________________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TÄGLICHE ARBEITSZEITEN

${tabelle}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MONATSZUSAMMENFASSUNG

Soll-Arbeitszeit (Monat):   _______ Stunden
Ist-Arbeitszeit gesamt:     _______ Stunden
Davon Überstunden:          _______ Stunden
Davon Minusstunden:         _______ Stunden
Urlaub / Krank / Feiertage: _______ Tage

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MINDESTLOHN-KONTROLLE (2026)

Geleistete Stunden:        _______ h
Mindestlohn 2026:          13,90 € / Stunde
Mindestvergütung gesamt:   _______ €
Tatsächliche Vergütung:    _______ €
Differenz:                 _______ €

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

UNTERSCHRIFTEN

Mitarbeiter/in:
Datum: ________________  Unterschrift: _______________________________

Arbeitgeber / Vorgesetzte/r (${profil.name}):
Datum: ________________  Unterschrift: _______________________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RECHTLICHE HINWEISE

Aufzeichnungspflicht: Gemäß § 16 Abs. 2 ArbZG ist die über die werktägliche
Arbeitszeit von 8 Stunden hinausgehende Arbeitszeit aufzuzeichnen und
mindestens 2 Jahre aufzubewahren.

Höchstarbeitszeit: 8 Stunden täglich, max. 10 Stunden bei Ausgleich
innerhalb von 6 Kalendermonaten (§ 3 ArbZG).

Mindestruhezeit: 11 Stunden nach Arbeitsende (§ 5 ArbZG).

Aufbewahrungsfrist (MiLoG): 2 Jahre ab Erstellungsdatum (§ 17 Abs. 2 MiLoG),
im Betrieb für Kontrollen durch die Zollbehörden bereitzuhalten. Gilt
insbesondere für geringfügig Beschäftigte, Arbeitnehmer in Branchen nach
§ 2a SchwarzArbG sowie Beschäftigte bis 2.000 EUR Monatsverdienst.

Unternehmen: ${profil.name} · ${profil.rechtsform} · ${profil.bundesland}
Branche: ${profil.branche}`
}

function generateArbeitsschutzUnterweisung(profil: UnternehmensProfil): string {
  const branchenThemen: Record<string, string[]> = {
    'Software / IT': [
      'Ergonomischer Büroarbeitsplatz (Bildschirmarbeitsverordnung)',
      'Richtige Sitzhaltung und Pausenregelung (ArbStättV)',
      'Schutz vor psychischer Belastung / Stress',
      'Sicherheit im Homeoffice',
      'Brandschutz und Fluchtweg-Kennzeichnung',
    ],
    'Produktion / Fertigung': [
      'Maschinensicherheit und Schutzeinrichtungen (MaschVO)',
      'Persönliche Schutzausrüstung (PSA-Pflicht)',
      'Lärm- und Vibrationsschutz (LärmVibrationsArbSchV)',
      'Gefahrstoffe und Sicherheitsdatenblätter (GefStoffV)',
      'Brandschutz und Explosionsschutz',
      'Heben und Tragen (Lastenhandhabungsverordnung)',
    ],
    'Handel / E-Commerce': [
      'Heben und Tragen schwerer Lasten',
      'Stolper- und Sturzgefahren im Lager',
      'Bildschirmarbeit und Ergonomie',
      'Brandschutz und Evakuierung',
      'Elektrische Sicherheit',
    ],
    'Gastronomie / Hotellerie': [
      'Schnittschutz und Umgang mit Messern',
      'Brandschutz und Fettbrand-Prävention',
      'Rutschgefahr auf nassen Böden',
      'Gefahrstoffe: Reinigungsmittel richtig handhaben',
      'Körperliche Belastung / Tragen von Lasten',
      'Hygiene und Infektionsschutz',
    ],
    'Gesundheit / Pflege': [
      'Infektionsschutz und Hygiene (IfSG)',
      'Umgang mit Körperflüssigkeiten / Nadelstichverletzungen',
      'Heben und Lagern von Patienten (Rückenschutz)',
      'Umgang mit Arzneimitteln und medizinischen Geräten',
      'Psychische Belastung / Umgang mit Stress',
      'Brandschutz und Notfallpläne',
    ],
    'Bau / Handwerk': [
      'Absturzschutz und Leitersicherheit (DGUV V38)',
      'Persönliche Schutzausrüstung (Helm, Handschuhe, Schutzschuhe)',
      'Elektrische Gefährdungen',
      'Umgang mit Gefahrstoffen (Asbest, Quarzstaub)',
      'Maschinensicherheit (Sägen, Bohrer, Winkelschleifer)',
      'Sonnenschutz bei Außenarbeiten',
    ],
    'Transport / Logistik': [
      'Fahrersicherheit und Fahrtüchtigkeit',
      'Ladungssicherung (StVO § 22)',
      'Gefahrguttransport (ADR) falls zutreffend',
      'Heben und Tragen im Lager',
      'Gabelstaplerbetrieb (DGUV V68)',
      'Brandschutz im Lager',
    ],
  }

  const themen = branchenThemen[profil.branche] ?? [
    'Allgemeine Unfallverhütung',
    'Brandschutz und Evakuierung',
    'Erste Hilfe im Betrieb',
    'Ergonomie am Arbeitsplatz',
    'Elektrische Sicherheit',
  ]

  return `ARBEITSSCHUTZUNTERWEISUNG
gemäß § 12 ArbSchG (Arbeitsschutzgesetz)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

UNTERWEISUNGSNACHWEIS

Unternehmen:      ${profil.name}
Branche:          ${profil.branche}
Unterweisungsort: ___________________________
Datum:            ___________________________
Unterweiser/in:   ___________________________
Anlass:           Erstunterweisung / Jährliche Wiederholung / Anlassbezogen

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

UNTERWEISUNGSTHEMEN (branchenspezifisch: ${profil.branche})

${themen.map((t, i) => `${i + 1}. ${t}`).join('\n')}

Zusätzliche betriebsspezifische Themen:
___________________________________________
___________________________________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOTFALLINFORMATIONEN

Notruf:          112
Betriebsarzt:    ___________________________
Ersthelfer:      ___________________________
Verbandskasten:  ___________________________
Fluchtweg:       ___________________________
Sammelplatz:     ___________________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TEILNEHMERLISTE UND BESTÄTIGUNG

Die unterzeichnenden Personen bestätigen, dass sie an der Unterweisung
teilgenommen haben und die Inhalte verstanden haben.

[[TABLE]]
Nr.|Name (Druck)|Datum|Unterschrift
1| | |
2| | |
3| | |
4| | |
5| | |
6| | |
7| | |
8| | |
9| | |
10| | |
[[/TABLE]]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BESTÄTIGUNG DES UNTERWEISERS

Ich bestätige, dass die oben genannten Mitarbeitenden über die relevanten
Arbeitsschutzthemen unterwiesen wurden.

Datum: ________________  Unterschrift: _______________________________
Name:  ________________________________  Funktion: ___________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RECHTLICHE HINWEISE

Pflicht:            Mindestens jährlich, bei neuen Mitarbeitenden sofort
Aufbewahrung:       Mindestens 2 Jahre nach Durchführung
Rechtsgrundlagen:   § 12 ArbSchG, § 4 BGV A1, DGUV Vorschrift 1

Unternehmen: ${profil.name} · ${profil.mitarbeiter} Mitarbeitende · ${profil.bundesland}`
}

function buildDocument(typ: DokumentTyp, profil: UnternehmensProfil): string {
  switch (typ) {
    case 'datenschutzerklaerung': return generateDatenschutzerklaerung(profil)
    case 'impressum': return generateImpressum(profil)
    case 'arbeitszeitnachweis': return generateArbeitszeitnachweis(profil)
    case 'arbeitsschutz-unterweisung': return generateArbeitsschutzUnterweisung(profil)
  }
}

export default function DocumentGenerator({ regulation, profil, onComplete, onClose }: Props) {
  const typ = regulation.dokument_typ as DokumentTyp
  const filename = `${typ}-${(profil.name || 'dokument').replace(/\s+/g, '-')}`

  const [content] = useState(() => buildDocument(typ, profil))
  const [downloading, setDownloading] = useState<'pdf' | 'docx' | null>(null)

  const download = async (ext: 'pdf' | 'docx') => {
    setDownloading(ext)
    try {
      if (ext === 'pdf') {
        downloadAsPDF(content, filename)
      } else {
        await downloadAsDOCX(content, filename)
      }
      onComplete(regulation.id)
    } finally {
      setDownloading(null)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-ink/40 backdrop-blur-sm" onClick={onClose}>
      <div className="h-full w-full max-w-2xl bg-white border-l border-sand-border overflow-y-auto flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="p-6 border-b border-sand-border flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-muted uppercase tracking-wider mb-1">Dokument generieren</p>
            <h2 className="font-serif text-xl text-ink">{DOK_LABELS[typ]}</h2>
            <p className="text-sm text-muted-dark font-sans mt-1">{regulation.title}</p>
          </div>
          <button onClick={onClose} aria-label="Schließen" className="text-muted hover:text-ink text-xl leading-none mt-1">×</button>
        </div>

        {/* Status banner */}
        <div className="mx-6 mt-5 rounded-xl p-4 flex gap-3 border bg-teal-light border-teal/30">
          <span className="text-lg leading-none mt-0.5 text-teal-dark">✓</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-sans font-medium text-teal-dark">Vorlage fertig</p>
            <p className="text-xs text-muted-dark font-sans mt-0.5">
              Vorausgefüllt für: {profil.rechtsform} · {profil.branche} · {profil.bundesland}
            </p>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 m-6 bg-sand-light rounded-xl border border-sand-border p-5 overflow-y-auto">
          <pre className="text-sm font-mono text-ink whitespace-pre-wrap leading-relaxed">
            {content}
          </pre>
        </div>

        {/* Actions */}
        <div className="p-6 pt-0 flex gap-3">
          <button onClick={onClose}
            className="bg-white border border-sand-border text-ink py-2.5 px-4 rounded-lg text-sm font-sans hover:border-ink transition-colors">
            Schließen
          </button>
          <button
            onClick={() => download('pdf')}
            disabled={!!downloading}
            className="flex-1 bg-sand-mid border border-sand-border text-ink py-2.5 rounded-lg text-sm font-sans font-medium hover:bg-sand transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloading === 'pdf' ? 'Wird erstellt…' : 'PDF herunterladen'}
          </button>
          <button
            onClick={() => download('docx')}
            disabled={!!downloading}
            className="flex-1 bg-ink text-sand-light py-2.5 rounded-lg text-sm font-sans font-medium hover:bg-ink-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloading === 'docx' ? 'Wird erstellt…' : 'DOCX herunterladen'}
          </button>
        </div>
      </div>
    </div>
  )
}
