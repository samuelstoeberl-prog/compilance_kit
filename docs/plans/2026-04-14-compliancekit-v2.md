# ComplianceKit v2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Extend the existing TypeScript ComplianceKit prototype with a new color scheme, richer data structures, funding relevance scoring, an ApplicationWizard modal, and a DocumentGenerator backed by the Anthropic streaming API.

**Architecture:** The existing React 18 + TypeScript + Tailwind project is extended in-place. New data files (`regulations.json`, `fundings.json`) replace the old ones with richer schemas. New utility functions handle filtering and scoring. Two new overlay components (ApplicationWizard, DocumentGenerator) are added and wired into the existing Dashboard.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS v3, React Router v7, @anthropic-ai/sdk, localStorage.

---

### Task 1: Update Tailwind config and add Google Fonts

**Files:**
- Modify: `tailwind.config.js`
- Modify: `index.html`

**Step 1: Update `tailwind.config.js`** — replace entire content:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1A1814',
        'ink-light': '#2D2A24',
        'ink-border': '#3D3A34',
        sand: '#C5B99A',
        'sand-light': '#F4F2EE',
        'sand-mid': '#EDEAE4',
        'sand-border': '#D8D4CC',
        muted: '#9E9A93',
        'muted-dark': '#6B6760',
        teal: '#5DCAA5',
        'teal-light': '#E1F5EE',
        'teal-dark': '#085041',
        amber: '#EF9F27',
        'amber-light': '#FAEEDA',
        'amber-dark': '#633806',
        danger: '#E24B4A',
        'danger-light': '#FCEBEB',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        serif: ['"DM Serif Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
```

**Step 2: Add Google Fonts to `index.html`** — insert inside `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Step 3: Verify build still works**

```bash
cd "C:\Users\samue\OneDrive\Dokumente\projekte\compliancekit"
npx tsc --noEmit
```
Expected: 0 errors.

**Step 4: Commit**

```bash
git add tailwind.config.js index.html
git commit -m "feat: update color scheme and add Google Fonts"
```

---

### Task 2: Install Anthropic SDK and create .env.local

**Files:**
- No source files — install + env setup

**Step 1: Install SDK**

```bash
cd "C:\Users\samue\OneDrive\Dokumente\projekte\compliancekit"
npm install @anthropic-ai/sdk
```

**Step 2: Create `.env.local`**

```
VITE_ANTHROPIC_API_KEY=sk-ant-PLACEHOLDER
```

**Step 3: Verify `.env.local` is in `.gitignore`**

Check that `.gitignore` contains `.env.local`. If not, add it:

```bash
echo ".env.local" >> .gitignore
```

**Step 4: Commit**

```bash
git add package.json package-lock.json .gitignore
git commit -m "feat: add @anthropic-ai/sdk dependency"
```

---

### Task 3: Migrate to new data structures

**Files:**
- Create: `src/data/regulations.json`
- Create: `src/data/fundings.json`
- Modify: `src/types.ts`

**Step 1: Update `src/types.ts`** — replace entire content:

```ts
// ── Profile ──────────────────────────────────────────────────────────────
export interface UnternehmensProfil {
  name: string
  rechtsform: string
  branche: string
  mitarbeiter: string   // '1–9' | '10–49' | '50–249' | '250+'
  bundesland: string
  umsatz: string
  gruendungsjahr: string
}

// ── Regulations ──────────────────────────────────────────────────────────
export type PflichtStatus = 'offen' | 'erledigt' | 'nicht_relevant'

export type DokumentTyp =
  | 'datenschutzerklaerung'
  | 'impressum'
  | 'arbeitszeitnachweis'
  | 'arbeitsschutz-unterweisung'

export interface GiltFuer {
  rechtsformen: string[]   // ['alle'] or specific list
  branchen?: string[]      // ['alle'] or specific list
  mitarbeiter_min?: number
  bundeslaender?: string[] // ['alle'] or specific list
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
  typ: 'Zuschuss' | 'Kredit' | 'Steuervorteil'
  quelle: 'EU' | 'Bund' | 'Bundesland'
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
```

**Step 2: Create `src/data/regulations.json`**

```json
[
  {
    "id": "dsgvo-datenschutzerklaerung",
    "title": "DSGVO – Datenschutzerklärung",
    "category": "Datenschutz",
    "beschreibung": "Datenschutzerklärung auf der Website und Verarbeitungsverzeichnis müssen vorliegen.",
    "rechtsgrundlage": "Art. 13 DSGVO",
    "quelle_url": "https://dsgvo-gesetz.de/art-13-dsgvo/",
    "gilt_fuer": {
      "rechtsformen": ["alle"],
      "branchen": ["alle"],
      "mitarbeiter_min": 1,
      "bundeslaender": ["alle"]
    },
    "hat_dokument_generator": true,
    "dokument_typ": "datenschutzerklaerung"
  },
  {
    "id": "impressumspflicht",
    "title": "Impressumspflicht",
    "category": "Recht",
    "beschreibung": "Vollständiges Impressum mit Verantwortlichem, Kontakt und Handelsregisternummer auf der Website.",
    "rechtsgrundlage": "§5 DDG",
    "quelle_url": "https://www.gesetze-im-internet.de/ddg/__5.html",
    "gilt_fuer": {
      "rechtsformen": ["alle"],
      "branchen": ["alle"],
      "mitarbeiter_min": 1,
      "bundeslaender": ["alle"]
    },
    "hat_dokument_generator": true,
    "dokument_typ": "impressum"
  },
  {
    "id": "nis2",
    "title": "NIS2-Richtlinie – IT-Sicherheit",
    "category": "IT-Sicherheit",
    "beschreibung": "Cybersicherheitsmaßnahmen und Meldepflicht bei Sicherheitsvorfällen innerhalb von 24h.",
    "rechtsgrundlage": "BSI-Gesetz §8a / NIS2UmsuCG",
    "quelle_url": "https://www.bsi.bund.de/DE/Themen/Regulierte-Wirtschaft/NIS-2-regulierte-Unternehmen/nis-2-regulierte-unternehmen_node.html",
    "gilt_fuer": {
      "rechtsformen": ["alle"],
      "branchen": ["Software / IT", "Produktion / Fertigung", "Gesundheit / Pflege"],
      "mitarbeiter_min": 10,
      "bundeslaender": ["alle"]
    },
    "hat_dokument_generator": false
  },
  {
    "id": "mindestlohn-dokumentation",
    "title": "Mindestlohn-Dokumentationspflicht",
    "category": "Arbeitsrecht",
    "beschreibung": "Arbeitszeitaufzeichnung für Minijobber und bestimmte Branchen. Mindestlohn 2026: 13,90 €/Std.",
    "rechtsgrundlage": "§17 MiLoG",
    "quelle_url": "https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Mindestlohn/mindestlohn.html",
    "gilt_fuer": {
      "rechtsformen": ["alle"],
      "branchen": ["alle"],
      "mitarbeiter_min": 1,
      "bundeslaender": ["alle"]
    },
    "hat_dokument_generator": true,
    "dokument_typ": "arbeitszeitnachweis"
  },
  {
    "id": "lksg",
    "title": "Lieferkettensorgfaltspflichtengesetz (LkSG)",
    "category": "Recht",
    "beschreibung": "Sorgfaltspflichten für Menschenrechte und Umwelt in der Lieferkette.",
    "rechtsgrundlage": "LkSG §3",
    "quelle_url": "https://www.bafa.de/DE/Lieferketten/lieferketten_node.html",
    "gilt_fuer": {
      "rechtsformen": ["alle"],
      "branchen": ["alle"],
      "mitarbeiter_min": 1000,
      "bundeslaender": ["alle"]
    },
    "hat_dokument_generator": false
  },
  {
    "id": "dsgvo-datenschutzbeauftragter",
    "title": "Datenschutzbeauftragter benennen",
    "category": "Datenschutz",
    "beschreibung": "Ab 20 Personen mit regelmäßiger Datenverarbeitung ist ein Datenschutzbeauftragter zu benennen.",
    "rechtsgrundlage": "§38 BDSG / Art. 37 DSGVO",
    "quelle_url": "https://www.bfdi.bund.de",
    "gilt_fuer": {
      "rechtsformen": ["alle"],
      "branchen": ["alle"],
      "mitarbeiter_min": 20,
      "bundeslaender": ["alle"]
    },
    "hat_dokument_generator": false
  },
  {
    "id": "cookie-consent",
    "title": "Cookie-Consent / Einwilligungsmanagement",
    "category": "Datenschutz",
    "beschreibung": "Technisch nicht notwendige Cookies erfordern aktive Einwilligung der Nutzer (kein Opt-Out).",
    "rechtsgrundlage": "Art. 6 DSGVO / TTDSG §25",
    "quelle_url": "https://www.bfdi.bund.de",
    "gilt_fuer": {
      "rechtsformen": ["alle"],
      "branchen": ["alle"],
      "mitarbeiter_min": 1,
      "bundeslaender": ["alle"]
    },
    "hat_dokument_generator": false
  },
  {
    "id": "gewerbesteuer-erklaerung",
    "title": "Gewerbesteuererklärung",
    "category": "Steuer",
    "beschreibung": "Jährliche Gewerbesteuererklärung beim Finanzamt, Frist 31. Juli des Folgejahres.",
    "rechtsgrundlage": "§14a GewStG",
    "quelle_url": "https://www.elster.de",
    "gilt_fuer": {
      "rechtsformen": ["GmbH", "AG", "e.K.", "GbR"],
      "branchen": ["alle"],
      "mitarbeiter_min": 1,
      "bundeslaender": ["alle"]
    },
    "hat_dokument_generator": false
  },
  {
    "id": "arbeitsschutz-unterweisung",
    "title": "Arbeitsschutzunterweisung",
    "category": "Arbeitsrecht",
    "beschreibung": "Jährliche schriftliche Unterweisung aller Mitarbeitenden zu Arbeitsschutz und Unfallverhütung.",
    "rechtsgrundlage": "§12 ArbSchG",
    "quelle_url": "https://www.baua.de",
    "gilt_fuer": {
      "rechtsformen": ["alle"],
      "branchen": ["alle"],
      "mitarbeiter_min": 1,
      "bundeslaender": ["alle"]
    },
    "hat_dokument_generator": true,
    "dokument_typ": "arbeitsschutz-unterweisung"
  },
  {
    "id": "elektronische-rechnung",
    "title": "E-Rechnungspflicht (B2B ab 2025)",
    "category": "Steuer",
    "beschreibung": "Ab 2025 müssen inländische B2B-Rechnungen als strukturierte E-Rechnung (ZUGFeRD/XRechnung) ausgestellt werden.",
    "rechtsgrundlage": "§14 UStG (neu)",
    "quelle_url": "https://www.bundesfinanzministerium.de",
    "gilt_fuer": {
      "rechtsformen": ["GmbH", "AG", "UG (haftungsbeschränkt)", "GbR", "e.K.", "Einzelunternehmen"],
      "branchen": ["alle"],
      "mitarbeiter_min": 1,
      "bundeslaender": ["alle"]
    },
    "hat_dokument_generator": false
  },
  {
    "id": "verpackungsgesetz",
    "title": "Verpackungsgesetz (VerpackG)",
    "category": "Umwelt",
    "beschreibung": "Hersteller und Inverkehrbringer von Verpackungen müssen sich bei LUCID registrieren und lizenzieren.",
    "rechtsgrundlage": "§9 VerpackG",
    "quelle_url": "https://www.verpackungsregister.org",
    "gilt_fuer": {
      "rechtsformen": ["alle"],
      "branchen": ["Handel / E-Commerce", "Produktion / Fertigung"],
      "mitarbeiter_min": 1,
      "bundeslaender": ["alle"]
    },
    "hat_dokument_generator": false
  },
  {
    "id": "eu-ai-act",
    "title": "EU AI Act – Registrierungspflicht",
    "category": "IT-Sicherheit",
    "beschreibung": "Unternehmen die KI-Systeme einsetzen müssen diese ab 2026 klassifizieren und ggf. registrieren.",
    "rechtsgrundlage": "EU AI Act Art. 49",
    "quelle_url": "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689",
    "gilt_fuer": {
      "rechtsformen": ["alle"],
      "branchen": ["alle"],
      "mitarbeiter_min": 1,
      "bundeslaender": ["alle"]
    },
    "hat_dokument_generator": false
  }
]
```

**Step 3: Create `src/data/fundings.json`**

```json
[
  {
    "id": "kfw-digitalisierung",
    "title": "KfW ERP-Förderkredit Digitalisierung",
    "beschreibung": "Günstige Kredite für digitale Infrastruktur, Software und IT-Sicherheit. Zinsbindung 5–10 Jahre.",
    "typ": "Kredit",
    "quelle": "Bund",
    "foerderer": "KfW Bankengruppe",
    "max_betrag": 2000000,
    "zins": "ab 1,5 %",
    "antrag_url": "https://www.kfw.de/inlandsfoerderung/Unternehmen/Innovation-und-Digitalisierung/F%C3%B6rderprodukte/ERP-F%C3%B6rderkredit-Digitalisierung-(511-512)/",
    "bearbeitungszeit_wochen": [6, 8],
    "ausschlusskriterien": ["Kein Eigenkapitalersatz", "Nicht für laufende Betriebskosten", "Antrag über Hausbank"],
    "benoetigte_dokumente": [
      {"name": "Handelsregisterauszug", "auto": true},
      {"name": "Jahresabschluss letztes Jahr", "auto": false},
      {"name": "Investitionsplan", "auto": false},
      {"name": "Hausbanken-Bestätigung", "auto": false}
    ],
    "gilt_fuer": {
      "rechtsformen": ["alle"],
      "mitarbeiter_max": 249,
      "umsatz_max": "10 Mio. €",
      "bundeslaender": ["alle"]
    },
    "relevanz_boost": {
      "branchen": ["Software / IT", "Produktion / Fertigung"],
      "mitarbeiter": ["10–49", "50–249"]
    }
  },
  {
    "id": "go-digital-it-sicherheit",
    "title": "go-digital – Modul IT-Sicherheit",
    "beschreibung": "50 % Förderung für Beratungsleistungen zu IT-Sicherheit, NIS2-Compliance und Datenschutz.",
    "typ": "Zuschuss",
    "quelle": "Bund",
    "foerderer": "BMWK",
    "max_betrag": 16500,
    "zins": null,
    "antrag_url": "https://www.innovation-beratung-foerderung.de/INNO/Navigation/DE/Karten/Beratersuche-go-digital/karte.html",
    "bearbeitungszeit_wochen": [4, 6],
    "ausschlusskriterien": ["Max. 100 Mitarbeitende", "Max. 20 Mio. € Jahresumsatz", "Antrag über autorisierten Berater"],
    "benoetigte_dokumente": [
      {"name": "Handelsregisterauszug", "auto": true},
      {"name": "Beratungsangebot eines autorisierten Beraters", "auto": false}
    ],
    "gilt_fuer": {
      "rechtsformen": ["alle"],
      "mitarbeiter_max": 100,
      "umsatz_max": "20 Mio. €",
      "bundeslaender": ["alle"]
    },
    "relevanz_boost": {
      "branchen": ["Software / IT", "Handel / E-Commerce"],
      "mitarbeiter": ["1–9", "10–49"]
    }
  },
  {
    "id": "invest-zuschuss-wagniskapital",
    "title": "INVEST – Zuschuss für Wagniskapital",
    "beschreibung": "Privatinvestoren erhalten 20 % Erwerbszuschuss auf Beteiligungen an innovativen Start-ups.",
    "typ": "Zuschuss",
    "quelle": "Bund",
    "foerderer": "BAFA",
    "max_betrag": 500000,
    "zins": null,
    "antrag_url": "https://www.bafa.de/DE/Wirtschaft/Beratung_Finanzierung/Invest/invest_node.html",
    "bearbeitungszeit_wochen": [8, 12],
    "ausschlusskriterien": ["Nur für Unternehmen unter 7 Jahren", "Muss innovatives Geschäftsmodell nachweisen"],
    "benoetigte_dokumente": [
      {"name": "Handelsregisterauszug", "auto": true},
      {"name": "Innovationsnachweis / Pitch Deck", "auto": false},
      {"name": "Gesellschafterliste", "auto": false}
    ],
    "gilt_fuer": {
      "rechtsformen": ["GmbH", "UG (haftungsbeschränkt)", "AG"],
      "mitarbeiter_max": 49,
      "umsatz_max": "10 Mio. €",
      "bundeslaender": ["alle"],
      "gruendungsjahr": ["2020 oder später", "2011–2019"]
    },
    "relevanz_boost": {
      "branchen": ["Software / IT"],
      "gruendungsjahr": ["2020 oder später"]
    }
  },
  {
    "id": "bafa-energieberatung",
    "title": "BAFA Energieberatung für Nicht-Wohngebäude",
    "beschreibung": "Bis zu 80 % Zuschuss für professionelle Energieberatung im Unternehmen.",
    "typ": "Zuschuss",
    "quelle": "Bund",
    "foerderer": "BAFA",
    "max_betrag": 6000,
    "zins": null,
    "antrag_url": "https://www.bafa.de/DE/Energie/Energieberatung/Nichtwohngebaeude_Anlagen_Systeme/nichtwohngebaeude_anlagen_systeme_node.html",
    "bearbeitungszeit_wochen": [4, 8],
    "ausschlusskriterien": ["Energieberater muss zugelassen sein", "Antrag vor Beratungsbeginn"],
    "benoetigte_dokumente": [
      {"name": "Handelsregisterauszug", "auto": true},
      {"name": "Angebot des Energieberaters", "auto": false}
    ],
    "gilt_fuer": {
      "rechtsformen": ["alle"],
      "mitarbeiter_max": 999,
      "umsatz_max": null,
      "bundeslaender": ["alle"]
    },
    "relevanz_boost": {
      "branchen": ["Produktion / Fertigung", "Gastronomie / Hotellerie"],
      "mitarbeiter": ["10–49", "50–249"]
    }
  },
  {
    "id": "forschungsbonus-kmu",
    "title": "Forschungszulagengesetz (FZulG)",
    "beschreibung": "Steuerbonus von 25 % auf Forschungs- und Entwicklungsausgaben, auch für interne F&E-Projekte.",
    "typ": "Steuervorteil",
    "quelle": "Bund",
    "foerderer": "Bescheinigungsstelle Forschungszulage (BSFZ)",
    "max_betrag": 1000000,
    "zins": null,
    "antrag_url": "https://portal.bescheinigung-forschungszulage.de/",
    "bearbeitungszeit_wochen": [8, 14],
    "ausschlusskriterien": ["Nur für anspruchsberechtigte F&E-Tätigkeiten"],
    "benoetigte_dokumente": [
      {"name": "Beschreibung der F&E-Tätigkeit", "auto": false},
      {"name": "Kostenaufstellung Personalkosten F&E", "auto": false},
      {"name": "Steuerbescheid Vorjahr", "auto": false}
    ],
    "gilt_fuer": {
      "rechtsformen": ["alle"],
      "mitarbeiter_max": 999,
      "umsatz_max": null,
      "bundeslaender": ["alle"]
    },
    "relevanz_boost": {
      "branchen": ["Software / IT", "Produktion / Fertigung"],
      "mitarbeiter": ["10–49", "50–249"]
    }
  },
  {
    "id": "digitalbonus-bayern",
    "title": "Digitalbonus Bayern",
    "beschreibung": "Bis zu 50 % Zuschuss für Digitalisierungsprojekte: Software, Hardware, IT-Sicherheit.",
    "typ": "Zuschuss",
    "quelle": "Bundesland",
    "foerderer": "StMWi Bayern",
    "max_betrag": 50000,
    "zins": null,
    "antrag_url": "https://www.digitalbonus.bayern/antragstellung/",
    "bearbeitungszeit_wochen": [4, 8],
    "ausschlusskriterien": ["Nur Unternehmen mit Sitz in Bayern", "Max. 500 Mitarbeitende", "Antrag vor Projektbeginn"],
    "benoetigte_dokumente": [
      {"name": "Handelsregisterauszug", "auto": true},
      {"name": "Angebot des IT-Dienstleisters", "auto": false},
      {"name": "Projektbeschreibung", "auto": false}
    ],
    "gilt_fuer": {
      "rechtsformen": ["alle"],
      "mitarbeiter_max": 500,
      "umsatz_max": null,
      "bundeslaender": ["Bayern"]
    },
    "relevanz_boost": {
      "branchen": ["Handel / E-Commerce", "Software / IT", "Dienstleistungen"],
      "mitarbeiter": ["1–9", "10–49"]
    }
  },
  {
    "id": "foerderung-berufsausbildung",
    "title": "Förderung der Berufsausbildung (FbA)",
    "beschreibung": "Zuschüsse für Ausbildungsbetriebe, die über Bedarf ausbilden oder schwächere Azubis fördern.",
    "typ": "Zuschuss",
    "quelle": "Bund",
    "foerderer": "Bundesagentur für Arbeit",
    "max_betrag": 8000,
    "zins": null,
    "antrag_url": "https://www.arbeitsagentur.de/unternehmen/finanziell/foerderung-der-berufsausbildung",
    "bearbeitungszeit_wochen": [3, 5],
    "ausschlusskriterien": ["Nur für anerkannte Ausbildungsbetriebe"],
    "benoetigte_dokumente": [
      {"name": "Ausbildungsvertrag", "auto": false},
      {"name": "Bescheinigung Ausbildungseignung", "auto": false}
    ],
    "gilt_fuer": {
      "rechtsformen": ["alle"],
      "mitarbeiter_max": 499,
      "umsatz_max": null,
      "bundeslaender": ["alle"]
    },
    "relevanz_boost": {
      "branchen": ["Produktion / Fertigung", "Bau / Handwerk", "Gastronomie / Hotellerie"],
      "mitarbeiter": ["10–49", "50–249"]
    }
  },
  {
    "id": "gruendungszuschuss",
    "title": "Gründungszuschuss",
    "beschreibung": "Finanzielle Unterstützung für Gründer aus der Arbeitslosigkeit. Kombination aus ALG I und Pauschale.",
    "typ": "Zuschuss",
    "quelle": "Bund",
    "foerderer": "Bundesagentur für Arbeit",
    "max_betrag": 30000,
    "zins": null,
    "antrag_url": "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/arbeitslosengeld/gruendungszuschuss-beantragen",
    "bearbeitungszeit_wochen": [3, 6],
    "ausschlusskriterien": ["Nur für Gründer aus der Arbeitslosigkeit", "Anspruch auf ALG I erforderlich"],
    "benoetigte_dokumente": [
      {"name": "Businessplan", "auto": false},
      {"name": "Stellungnahme fachkundige Stelle", "auto": false}
    ],
    "gilt_fuer": {
      "rechtsformen": ["alle"],
      "mitarbeiter_max": 9,
      "umsatz_max": null,
      "bundeslaender": ["alle"],
      "gruendungsjahr": ["2020 oder später", "2011–2019"]
    },
    "relevanz_boost": {
      "gruendungsjahr": ["2020 oder später"],
      "mitarbeiter": ["1–9"]
    }
  }
]
```

**Step 4: Run TypeScript check**

```bash
cd "C:\Users\samue\OneDrive\Dokumente\projekte\compliancekit"
npx tsc --noEmit
```

There will be errors because old components import old types. That's expected — we fix them in later tasks.

**Step 5: Commit data files and types**

```bash
git add src/types.ts src/data/regulations.json src/data/fundings.json
git commit -m "feat: migrate to new data structure with regulations and fundings"
```

---

### Task 4: Update filter utilities

**Files:**
- Replace: `src/utils/filter.ts`

**Step 1: Replace `src/utils/filter.ts`** entirely:

```ts
import type { Regulation, RegulationMitStatus, PflichtStatus, Funding, FundingMitScore, UnternehmensProfil } from '../types'

const MIT_MAP: Record<string, number> = {
  '1–9': 5,
  '10–49': 25,
  '50–249': 100,
  '250+': 500,
}

export function filterRegulations(
  regulations: Regulation[],
  profil: UnternehmensProfil,
  statusMap: Record<string, PflichtStatus>
): RegulationMitStatus[] {
  const mitZahl = MIT_MAP[profil.mitarbeiter] ?? 1

  return regulations.map(reg => {
    const g = reg.gilt_fuer
    let relevant = true

    if (g.rechtsformen[0] !== 'alle' && !g.rechtsformen.includes(profil.rechtsform)) relevant = false
    if (g.branchen && g.branchen[0] !== 'alle' && !g.branchen.includes(profil.branche)) relevant = false
    if (g.mitarbeiter_min && mitZahl < g.mitarbeiter_min) relevant = false
    if (g.bundeslaender && g.bundeslaender[0] !== 'alle' && !g.bundeslaender.includes(profil.bundesland)) relevant = false

    const status: PflichtStatus = !relevant
      ? 'nicht_relevant'
      : (statusMap[reg.id] ?? 'offen')

    return { ...reg, status }
  })
}

export function scoreFunding(funding: Funding, profil: UnternehmensProfil): number {
  const g = funding.gilt_fuer
  const mitZahl = MIT_MAP[profil.mitarbeiter] ?? 1

  // Hard exclusions → score 0
  if (g.mitarbeiter_max && mitZahl > g.mitarbeiter_max) return 0
  if (g.rechtsformen[0] !== 'alle' && !g.rechtsformen.includes(profil.rechtsform)) return 0
  if (g.bundeslaender && g.bundeslaender[0] !== 'alle' && !g.bundeslaender.includes(profil.bundesland)) return 0
  if (g.gruendungsjahr && !g.gruendungsjahr.includes(profil.gruendungsjahr)) return 0

  let score = 40
  const boost = funding.relevanz_boost ?? {}
  if (boost.branchen?.includes(profil.branche)) score += 20
  if (boost.mitarbeiter?.includes(profil.mitarbeiter)) score += 20
  if (g.bundeslaender && g.bundeslaender[0] !== 'alle') score += 10
  if (boost.gruendungsjahr?.includes(profil.gruendungsjahr)) score += 10

  return Math.min(score, 100)
}

export function sortedFundings(fundings: Funding[], profil: UnternehmensProfil): FundingMitScore[] {
  return fundings
    .map(f => ({ ...f, score: scoreFunding(f, profil) }))
    .filter(f => f.score > 0)
    .sort((a, b) => b.score - a.score)
}
```

**Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Only errors from Dashboard/components that import old types should remain.

**Step 3: Commit**

```bash
git add src/utils/filter.ts
git commit -m "feat: update filter utilities for new data structure"
```

---

### Task 5: Update ProfilContext and Onboarding for new profile shape

**Files:**
- Modify: `src/context/ProfilContext.tsx`
- Modify: `src/pages/Onboarding.tsx`

**Step 1: Replace `src/context/ProfilContext.tsx`** entirely:

```tsx
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { UnternehmensProfil, PflichtStatus } from '../types'

interface ProfilContextValue {
  profil: UnternehmensProfil | null
  setProfil: (p: UnternehmensProfil) => void
  statusMap: Record<string, PflichtStatus>
  setStatus: (id: string, status: PflichtStatus) => void
}

const ProfilContext = createContext<ProfilContextValue | null>(null)

export function ProfilProvider({ children }: { children: ReactNode }) {
  const [profil, setProfilState] = useState<UnternehmensProfil | null>(() => {
    const stored = localStorage.getItem('ck_profil')
    return stored ? JSON.parse(stored) : null
  })

  const [statusMap, setStatusMap] = useState<Record<string, PflichtStatus>>(() => {
    const stored = localStorage.getItem('ck_status')
    return stored ? JSON.parse(stored) : {}
  })

  const setProfil = (p: UnternehmensProfil) => {
    setProfilState(p)
    localStorage.setItem('ck_profil', JSON.stringify(p))
  }

  const setStatus = (id: string, status: PflichtStatus) => {
    setStatusMap(prev => {
      const next = { ...prev, [id]: status }
      localStorage.setItem('ck_status', JSON.stringify(next))
      return next
    })
  }

  return (
    <ProfilContext.Provider value={{ profil, setProfil, statusMap, setStatus }}>
      {children}
    </ProfilContext.Provider>
  )
}

export function useProfil() {
  const ctx = useContext(ProfilContext)
  if (!ctx) throw new Error('useProfil must be used within ProfilProvider')
  return ctx
}
```

**Step 2: Replace `src/pages/Onboarding.tsx`** entirely (new fields: `umsatz`, `gruendungsjahr` as strings; updated Tailwind to use new color tokens):

```tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfil } from '../context/ProfilContext'
import type { UnternehmensProfil } from '../types'

const RECHTSFORMEN = ['GmbH', 'UG (haftungsbeschränkt)', 'AG', 'GbR', 'OHG', 'KG', 'Einzelunternehmen', 'e.K.']
const BRANCHEN = ['Software / IT', 'Handel / E-Commerce', 'Produktion / Fertigung', 'Dienstleistungen', 'Gastronomie / Hotellerie', 'Gesundheit / Pflege', 'Bau / Handwerk', 'Transport / Logistik', 'Sonstiges']
const BUNDESLAENDER = ['Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen', 'Nordrhein-Westfalen', 'Rheinland-Pfalz', 'Saarland', 'Sachsen', 'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen']
const MITARBEITER = ['1–9', '10–49', '50–249', '250+']
const UMSATZ = ['unter 500.000 €', '500.000 – 2 Mio. €', '2 – 10 Mio. €', 'über 10 Mio. €']
const GRUENDUNGSJAHR = ['vor 2000', '2000–2010', '2011–2019', '2020 oder später']

type FormState = {
  name: string
  rechtsform: string
  branche: string
  mitarbeiter: string
  bundesland: string
  umsatz: string
  gruendungsjahr: string
}

export default function Onboarding() {
  const { setProfil } = useProfil()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>({
    name: '', rechtsform: '', branche: '', mitarbeiter: '',
    bundesland: '', umsatz: '', gruendungsjahr: '',
  })

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))

  const isValid = Object.values(form).every(v => v !== '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProfil(form as UnternehmensProfil)
    navigate('/dashboard')
  }

  const inputCls = 'w-full bg-ink-light border border-ink-border rounded-lg px-4 py-2.5 text-sand-light placeholder-muted focus:outline-none focus:border-sand font-sans text-sm'
  const labelCls = 'block text-xs font-mono text-muted mb-1 uppercase tracking-wider'

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-sand rounded flex items-center justify-center">
            <span className="text-ink text-xs font-mono font-bold">CK</span>
          </div>
          <span className="font-serif text-sand-light text-xl">ComplianceKit</span>
          <span className="text-xs font-mono bg-ink-light border border-ink-border text-muted px-2 py-0.5 rounded">BETA</span>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-8">
          {[0, 1, 2].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-sand' : 'bg-ink-border'}`} />
          ))}
        </div>

        <h1 className="font-serif text-3xl text-sand-light mb-2">Unternehmensprofil</h1>
        <p className="text-muted font-sans text-sm mb-8">Einmalig. 5 Minuten. Dann alles Relevante auf einen Blick.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={labelCls}>Unternehmensname</label>
            <input type="text" placeholder="z.B. Müller GmbH" value={form.name} onChange={set('name')}
              onFocus={() => setStep(0)} className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Rechtsform</label>
              <select value={form.rechtsform} onChange={set('rechtsform')} onFocus={() => setStep(0)} className={inputCls}>
                <option value="">Auswählen</option>
                {RECHTSFORMEN.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Bundesland</label>
              <select value={form.bundesland} onChange={set('bundesland')} onFocus={() => setStep(1)} className={inputCls}>
                <option value="">Auswählen</option>
                {BUNDESLAENDER.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Branche</label>
            <select value={form.branche} onChange={set('branche')} onFocus={() => setStep(1)} className={inputCls}>
              <option value="">Auswählen</option>
              {BRANCHEN.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Mitarbeiterzahl</label>
              <select value={form.mitarbeiter} onChange={set('mitarbeiter')} onFocus={() => setStep(1)} className={inputCls}>
                <option value="">Auswählen</option>
                {MITARBEITER.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Jahresumsatz</label>
              <select value={form.umsatz} onChange={set('umsatz')} onFocus={() => setStep(2)} className={inputCls}>
                <option value="">Auswählen</option>
                {UMSATZ.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Gründungsjahr</label>
            <select value={form.gruendungsjahr} onChange={set('gruendungsjahr')} onFocus={() => setStep(2)} className={inputCls}>
              <option value="">Auswählen</option>
              {GRUENDUNGSJAHR.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>

          <button type="submit" disabled={!isValid}
            className="w-full bg-sand text-ink py-3 rounded-lg font-sans font-medium text-sm mt-2 disabled:opacity-30 hover:bg-sand-mid transition-colors">
            Dashboard öffnen →
          </button>
        </form>
      </div>
    </div>
  )
}
```

**Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

**Step 4: Commit**

```bash
git add src/context/ProfilContext.tsx src/pages/Onboarding.tsx
git commit -m "feat: update Onboarding and context for new profile shape and ink/sand theme"
```

---

### Task 6: Build ApplicationWizard component

**Files:**
- Create: `src/components/ApplicationWizard.tsx`

**Step 1: Create `src/components/ApplicationWizard.tsx`**:

```tsx
import { useState } from 'react'
import type { FundingMitScore, UnternehmensProfil } from '../types'

interface Props {
  funding: FundingMitScore
  profil: UnternehmensProfil
  onClose: () => void
}

export default function ApplicationWizard({ funding, profil, onClose }: Props) {
  const [phase, setPhase] = useState<1 | 2 | 3>(1)

  const autoCount = funding.benoetigte_dokumente.filter(d => d.auto).length
  const totalCount = funding.benoetigte_dokumente.length

  const isEligible = (() => {
    const g = funding.gilt_fuer
    if (g.rechtsformen[0] !== 'alle' && !g.rechtsformen.includes(profil.rechtsform)) return false
    if (g.bundeslaender && g.bundeslaender[0] !== 'alle' && !g.bundeslaender.includes(profil.bundesland)) return false
    return true
  })()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-ink/60 backdrop-blur-sm" onClick={onClose}>
      <div className="h-full w-full max-w-xl bg-ink-light border-l border-ink-border overflow-y-auto flex flex-col"
        onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-ink-border flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-muted uppercase tracking-wider mb-1">Antrag vorbereiten</p>
            <h2 className="font-serif text-xl text-sand-light">{funding.title}</h2>
            <p className="text-sm text-muted font-sans mt-1">{funding.foerderer}</p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-sand-light text-xl leading-none mt-1">×</button>
        </div>

        {/* Phase nav */}
        <div className="flex border-b border-ink-border">
          {([1, 2, 3] as const).map(p => (
            <button key={p} onClick={() => setPhase(p)}
              className={`flex-1 py-3 text-xs font-mono uppercase tracking-wider transition-colors ${
                phase === p ? 'text-sand border-b-2 border-sand' : 'text-muted hover:text-sand-light'
              }`}>
              {p === 1 ? '01 Berechtigung' : p === 2 ? '02 Unterlagen' : '03 Einreichen'}
            </button>
          ))}
        </div>

        <div className="flex-1 p-6">
          {/* Phase 1 */}
          {phase === 1 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">Voraussetzungen</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-teal text-sm">✓</span>
                    <span className="text-sand-light text-sm font-sans">Rechtsform: {profil.rechtsform}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-teal text-sm">✓</span>
                    <span className="text-sand-light text-sm font-sans">Mitarbeiterzahl: {profil.mitarbeiter}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-teal text-sm">✓</span>
                    <span className="text-sand-light text-sm font-sans">Bundesland: {profil.bundesland}</span>
                  </div>
                </div>
              </div>

              {funding.ausschlusskriterien.length > 0 && (
                <div>
                  <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">Ausschlusskriterien prüfen</p>
                  <div className="space-y-2">
                    {funding.ausschlusskriterien.map((k, i) => (
                      <div key={i} className="flex items-start gap-3 bg-amber-dark/20 border border-amber-dark/30 rounded-lg px-3 py-2">
                        <span className="text-amber text-sm mt-0.5">⚠</span>
                        <span className="text-amber-light text-sm font-sans">{k}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={`rounded-xl p-4 border ${isEligible ? 'bg-teal-dark/20 border-teal-dark/40' : 'bg-amber-dark/20 border-amber-dark/40'}`}>
                <div className="flex items-center gap-3">
                  <span className={`text-2xl ${isEligible ? 'text-teal' : 'text-amber'}`}>{isEligible ? '✓' : '!'}</span>
                  <div>
                    <p className={`font-sans font-semibold text-sm ${isEligible ? 'text-teal' : 'text-amber'}`}>
                      {isEligible ? 'Sie sind voraussichtlich antragsberechtigt' : 'Bitte Ausschlusskriterien manuell prüfen'}
                    </p>
                    <p className="text-muted text-xs font-sans mt-0.5">Angaben basieren auf Ihrem Unternehmensprofil</p>
                  </div>
                </div>
              </div>

              <button onClick={() => setPhase(2)}
                className="w-full bg-sand text-ink py-2.5 rounded-lg text-sm font-sans font-medium hover:bg-sand-mid transition-colors">
                Weiter zu Unterlagen →
              </button>
            </div>
          )}

          {/* Phase 2 */}
          {phase === 2 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">
                  Benötigte Unterlagen — {autoCount} von {totalCount} aus Ihrem Profil
                </p>
                <div className="space-y-2">
                  {funding.benoetigte_dokumente.map((doc, i) => (
                    <div key={i} className={`flex items-center gap-3 rounded-lg px-4 py-3 border ${
                      doc.auto
                        ? 'bg-teal-dark/20 border-teal-dark/30'
                        : 'bg-ink border-ink-border'
                    }`}>
                      <span className={`text-sm ${doc.auto ? 'text-teal' : 'text-amber'}`}>
                        {doc.auto ? '✓' : '○'}
                      </span>
                      <span className="text-sand-light text-sm font-sans flex-1">{doc.name}</span>
                      <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                        doc.auto
                          ? 'bg-teal-dark/40 text-teal'
                          : 'bg-amber-dark/30 text-amber'
                      }`}>
                        {doc.auto ? 'aus Profil' : 'manuell'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">Bearbeitungszeit</p>
                <div className="flex items-center gap-2">
                  {['Antrag', 'Prüfung', 'Auszahlung'].map((label, i) => (
                    <div key={i} className="flex items-center gap-2 flex-1">
                      <div className="flex-1">
                        <div className="h-1.5 bg-sand/30 rounded-full">
                          <div className="h-1.5 bg-sand rounded-full" style={{ width: `${(i + 1) * 33}%` }} />
                        </div>
                        <p className="text-xs text-muted font-mono mt-1">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted font-sans mt-2">
                  Typisch {funding.bearbeitungszeit_wochen[0]}–{funding.bearbeitungszeit_wochen[1]} Wochen gesamt
                </p>
              </div>

              <button onClick={() => setPhase(3)}
                className="w-full bg-sand text-ink py-2.5 rounded-lg text-sm font-sans font-medium hover:bg-sand-mid transition-colors">
                Weiter zur Einreichung →
              </button>
            </div>
          )}

          {/* Phase 3 */}
          {phase === 3 && (
            <div className="space-y-6">
              <div className="bg-ink border border-ink-border rounded-xl p-4">
                <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">Zusammenfassung</p>
                <div className="space-y-2 text-sm font-sans">
                  <div className="flex justify-between">
                    <span className="text-muted">Förderung</span>
                    <span className="text-sand-light">{funding.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Max. Betrag</span>
                    <span className="text-sand-light">
                      {funding.max_betrag ? `${(funding.max_betrag / 1000).toFixed(0)}k €` : '–'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Unterlagen bereit</span>
                    <span className="text-teal">{autoCount} / {totalCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Bearbeitungszeit</span>
                    <span className="text-sand-light">{funding.bearbeitungszeit_wochen[0]}–{funding.bearbeitungszeit_wochen[1]} Wochen</span>
                  </div>
                </div>
              </div>

              <a href={funding.antrag_url} target="_blank" rel="noopener noreferrer"
                className="block w-full bg-sand text-ink py-3 rounded-lg text-sm font-sans font-semibold text-center hover:bg-sand-mid transition-colors">
                Jetzt Antrag stellen →
              </a>

              <p className="text-xs text-muted font-sans text-center">
                Sie werden zur offiziellen Antragsseite weitergeleitet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/components/ApplicationWizard.tsx
git commit -m "feat: add ApplicationWizard 3-phase overlay"
```

---

### Task 7: Build DocumentGenerator component

**Files:**
- Create: `src/components/DocumentGenerator.tsx`

**Step 1: Create `src/components/DocumentGenerator.tsx`**:

```tsx
import { useState } from 'react'
import Anthropic from '@anthropic-ai/sdk'
import type { RegulationMitStatus, UnternehmensProfil, DokumentTyp } from '../types'

interface Props {
  regulation: RegulationMitStatus
  profil: UnternehmensProfil
  onComplete: (id: string) => void
  onClose: () => void
}

const DOK_LABELS: Record<DokumentTyp, string> = {
  datenschutzerklaerung: 'Datenschutzerklärung',
  impressum: 'Impressum',
  arbeitszeitnachweis: 'Arbeitszeitnachweis-Vorlage',
  'arbeitsschutz-unterweisung': 'Arbeitsschutzunterweisung-Vorlage',
}

function buildPrompt(typ: DokumentTyp, profil: UnternehmensProfil): string {
  const base = `Unternehmensform: ${profil.rechtsform}, Branche: ${profil.branche}, Bundesland: ${profil.bundesland}, Mitarbeiterzahl: ${profil.mitarbeiter}`

  const prompts: Record<DokumentTyp, string> = {
    datenschutzerklaerung: `Erstelle eine vollständige, rechtskonforme DSGVO-Datenschutzerklärung für folgendes Unternehmen: ${base}. Pflichtangaben nach Art. 13 DSGVO, branchenspezifisch zugeschnitten. Abschnitte: Verantwortlicher, Zweck der Verarbeitung, Rechtsgrundlagen, Empfänger, Speicherdauer, Betroffenenrechte, Cookies. Verwende [FIRMENNAME], [ADRESSE], [EMAIL] als Platzhalter. Nur das Dokument ausgeben, keine Einleitung.`,
    impressum: `Erstelle ein vollständiges, rechtskonformes Impressum nach §5 DDG für: ${base}. Alle Pflichtfelder, mit [PLATZHALTERN] für unternehmensspezifische Daten. Nur das Impressum ausgeben.`,
    arbeitszeitnachweis: `Erstelle eine professionelle Arbeitszeitnachweis-Vorlage nach §17 MiLoG für: ${base}. Monatsformular mit Tabelle (Tag, Von, Bis, Pause, Gesamt). Erkläre kurz Aufbewahrungsfrist (2 Jahre). Nur die Vorlage ausgeben.`,
    'arbeitsschutz-unterweisung': `Erstelle eine Arbeitsschutzunterweisung-Vorlage nach §12 ArbSchG für: ${base}. Unterweisungsnachweis mit Datum, branchenspezifischen Themen, Unterschriftsfeldern. Nur die Vorlage ausgeben.`,
  }

  return prompts[typ]
}

export default function DocumentGenerator({ regulation, profil, onComplete, onClose }: Props) {
  const typ = regulation.dokument_typ as DokumentTyp
  const [content, setContent] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const generate = async () => {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
    if (!apiKey || apiKey === 'sk-ant-PLACEHOLDER') {
      setError('Kein API-Key konfiguriert. Bitte VITE_ANTHROPIC_API_KEY in .env.local setzen.')
      return
    }

    setStreaming(true)
    setContent('')
    setError('')
    setDone(false)

    try {
      const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })
      const stream = client.messages.stream({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        messages: [{ role: 'user', content: buildPrompt(typ, profil) }],
      })

      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          setContent(prev => prev + event.delta.text)
        }
      }
      setDone(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unbekannter Fehler')
    } finally {
      setStreaming(false)
    }
  }

  const download = () => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${typ}-${profil.name || 'dokument'}.txt`
    a.click()
    URL.revokeObjectURL(url)
    onComplete(regulation.id)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-ink/60 backdrop-blur-sm" onClick={onClose}>
      <div className="h-full w-full max-w-2xl bg-ink-light border-l border-ink-border overflow-y-auto flex flex-col"
        onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-ink-border flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-muted uppercase tracking-wider mb-1">Dokument generieren</p>
            <h2 className="font-serif text-xl text-sand-light">{DOK_LABELS[typ]}</h2>
            <p className="text-sm text-muted font-sans mt-1">{regulation.title}</p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-sand-light text-xl leading-none mt-1">×</button>
        </div>

        <div className="flex-1 p-6 flex flex-col gap-6">
          {/* Info */}
          {!streaming && !done && (
            <div className="bg-ink border border-ink-border rounded-xl p-4">
              <p className="text-sm font-sans text-muted mb-1">Dieses Dokument wird auf Basis Ihres Profils generiert:</p>
              <ul className="text-sm font-sans text-sand-light space-y-1 mt-2">
                <li>· {profil.rechtsform} · {profil.branche}</li>
                <li>· {profil.bundesland} · {profil.mitarbeiter} Mitarbeitende</li>
              </ul>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-danger-light border border-danger/30 rounded-xl p-4">
              <p className="text-sm font-sans text-danger">{error}</p>
            </div>
          )}

          {/* Content preview */}
          {(content || streaming) && (
            <div className="flex-1 bg-ink rounded-xl border border-ink-border p-4 overflow-y-auto">
              <pre className="text-sm font-mono text-sand-light whitespace-pre-wrap leading-relaxed">
                {content}
                {streaming && <span className="animate-pulse text-sand">▊</span>}
              </pre>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {!done ? (
              <button onClick={generate} disabled={streaming}
                className="flex-1 bg-sand text-ink py-2.5 rounded-lg text-sm font-sans font-medium disabled:opacity-40 hover:bg-sand-mid transition-colors">
                {streaming ? 'Generiert...' : 'Dokument generieren'}
              </button>
            ) : (
              <>
                <button onClick={generate}
                  className="bg-ink-light border border-ink-border text-sand-light py-2.5 px-4 rounded-lg text-sm font-sans hover:border-sand transition-colors">
                  Neu generieren
                </button>
                <button onClick={download}
                  className="flex-1 bg-teal text-ink-light py-2.5 rounded-lg text-sm font-sans font-medium hover:bg-teal/90 transition-colors">
                  Download (.txt) — Pflicht als erledigt markieren
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/components/DocumentGenerator.tsx
git commit -m "feat: add DocumentGenerator with Anthropic streaming API"
```

---

### Task 8: Rebuild Dashboard with new components

**Files:**
- Replace: `src/pages/Dashboard.tsx`
- Delete: `src/components/PflichtCard.tsx` (inline into Dashboard)
- Delete: `src/components/FoerderungCard.tsx` (inline into Dashboard)

**Step 1: Replace `src/pages/Dashboard.tsx`** entirely:

```tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfil } from '../context/ProfilContext'
import { filterRegulations, sortedFundings } from '../utils/filter'
import ApplicationWizard from '../components/ApplicationWizard'
import DocumentGenerator from '../components/DocumentGenerator'
import regulationData from '../data/regulations.json'
import fundingData from '../data/fundings.json'
import type { Regulation, Funding, PflichtStatus, FundingMitScore, RegulationMitStatus } from '../types'

type Tab = 'pflichten' | 'foerderungen'
type StatusFilter = 'alle' | 'offen' | 'erledigt' | 'nicht_relevant'

const KATEGORIE_COLORS: Record<string, string> = {
  'Datenschutz': 'bg-blue-900/40 text-blue-300',
  'IT-Sicherheit': 'bg-orange-900/40 text-orange-300',
  'Arbeitsrecht': 'bg-purple-900/40 text-purple-300',
  'Recht': 'bg-ink-border text-muted',
  'Steuer': 'bg-yellow-900/40 text-yellow-300',
  'Umwelt': 'bg-green-900/40 text-green-300',
}

const TYP_COLORS: Record<string, string> = {
  'Zuschuss': 'bg-teal-dark/40 text-teal',
  'Kredit': 'bg-blue-900/40 text-blue-300',
  'Steuervorteil': 'bg-yellow-900/40 text-yellow-300',
}

export default function Dashboard() {
  const { profil, statusMap, setStatus } = useProfil()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('pflichten')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('alle')
  const [kategorieFilter, setKategorieFilter] = useState('alle')
  const [wizard, setWizard] = useState<FundingMitScore | null>(null)
  const [docGen, setDocGen] = useState<RegulationMitStatus | null>(null)

  if (!profil) { navigate('/'); return null }

  const allRegs = filterRegulations(regulationData as Regulation[], profil, statusMap)
  const allFundings = sortedFundings(fundingData as Funding[], profil)

  const gefiltert = allRegs.filter(r => {
    if (statusFilter !== 'alle' && r.status !== statusFilter) return false
    if (kategorieFilter !== 'alle' && r.category !== kategorieFilter) return false
    return true
  })

  const kategorien = [...new Set(allRegs.map(r => r.category))]
  const counts = {
    alle: allRegs.length,
    offen: allRegs.filter(r => r.status === 'offen').length,
    erledigt: allRegs.filter(r => r.status === 'erledigt').length,
    nicht_relevant: allRegs.filter(r => r.status === 'nicht_relevant').length,
  }
  const pct = Math.round((counts.erledigt / Math.max(counts.alle - counts.nicht_relevant, 1)) * 100)
  const initials = profil.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div className="min-h-screen bg-ink font-sans">
      {/* Header */}
      <header className="bg-ink-light border-b border-ink-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-sand rounded flex items-center justify-center">
            <span className="text-ink text-xs font-mono font-bold">CK</span>
          </div>
          <span className="font-serif text-sand-light text-lg">ComplianceKit</span>
          <span className="text-xs font-mono bg-ink border border-ink-border text-muted px-2 py-0.5 rounded">BETA</span>
        </div>
        <button onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-ink border border-ink-border hover:border-sand px-4 py-2 rounded-full text-sm transition-colors">
          <div className="w-6 h-6 bg-sand rounded-full flex items-center justify-center text-xs font-bold text-ink">{initials}</div>
          <span className="text-sand-light">{profil.name}</span>
          <span className="text-muted">·</span>
          <span className="text-muted text-xs">{profil.bundesland}</span>
          <span className="text-muted">·</span>
          <span className="text-muted text-xs">{profil.mitarbeiter} MA</span>
        </button>
      </header>

      {/* Tabs */}
      <nav className="bg-ink-light border-b border-ink-border px-6 flex gap-8">
        {([['pflichten', '01 — Pflichten & Regulierungen'], ['foerderungen', '02 — Förderungen & Steuervorteile']] as const).map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`py-3 text-sm font-mono border-b-2 transition-colors ${
              activeTab === tab ? 'border-sand text-sand' : 'border-transparent text-muted hover:text-sand-light'
            }`}>
            {label}
          </button>
        ))}
        <button onClick={() => navigate('/')} className="py-3 text-sm font-mono text-muted hover:text-sand-light ml-auto transition-colors">
          Profil bearbeiten
        </button>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        {/* ── PFLICHTEN TAB ── */}
        {activeTab === 'pflichten' && (
          <div className="flex gap-6">
            {/* Sidebar */}
            <aside className="w-52 flex-shrink-0 space-y-4">
              <div className="bg-ink-light border border-ink-border rounded-xl p-5">
                <div className="text-4xl font-serif text-sand-light">{pct}%</div>
                <div className="text-muted text-xs font-mono uppercase tracking-wider mt-1">erledigt</div>
                <div className="mt-3 bg-ink-border rounded-full h-1.5">
                  <div className="bg-sand h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>

              <div className="space-y-0.5">
                <p className="text-xs font-mono text-muted uppercase tracking-wider px-2 py-1">Status</p>
                {(['alle', 'offen', 'erledigt', 'nicht_relevant'] as const).map(val => (
                  <button key={val} onClick={() => setStatusFilter(val)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      statusFilter === val ? 'bg-ink-border text-sand-light' : 'text-muted hover:bg-ink-light hover:text-sand-light'
                    }`}>
                    <span>{val === 'alle' ? 'Alle' : val === 'offen' ? 'Offen' : val === 'erledigt' ? 'Erledigt' : 'Nicht relevant'}</span>
                    <span className="text-xs font-mono bg-ink px-1.5 py-0.5 rounded">{counts[val]}</span>
                  </button>
                ))}

                <p className="text-xs font-mono text-muted uppercase tracking-wider px-2 py-1 mt-2">Kategorie</p>
                <button onClick={() => setKategorieFilter('alle')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    kategorieFilter === 'alle' ? 'bg-ink-border text-sand-light' : 'text-muted hover:bg-ink-light hover:text-sand-light'
                  }`}>Alle</button>
                {kategorien.map(k => (
                  <button key={k} onClick={() => setKategorieFilter(k)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      kategorieFilter === k ? 'bg-ink-border text-sand-light' : 'text-muted hover:bg-ink-light hover:text-sand-light'
                    }`}>{k}</button>
                ))}
              </div>
            </aside>

            {/* Main */}
            <main className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-serif text-2xl text-sand-light">Ihre Pflichten</h1>
              </div>
              <div className="space-y-2">
                {gefiltert.map(reg => (
                  <div key={reg.id} className={`bg-ink-light rounded-xl border-l-4 ${
                    reg.status === 'erledigt' ? 'border-l-teal' :
                    reg.status === 'nicht_relevant' ? 'border-l-ink-border' : 'border-l-amber'
                  } border border-ink-border overflow-hidden`}>
                    <div className="p-4 flex items-start gap-4">
                      {/* Status circle */}
                      <button onClick={() => {
                        const next: PflichtStatus = reg.status === 'offen' ? 'erledigt' : reg.status === 'erledigt' ? 'nicht_relevant' : 'offen'
                        if (reg.status !== 'nicht_relevant' || next !== 'offen') setStatus(reg.id, next)
                        else setStatus(reg.id, next)
                      }} className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs transition-colors ${
                        reg.status === 'erledigt' ? 'bg-teal text-ink-light' :
                        reg.status === 'nicht_relevant' ? 'bg-ink-border text-muted' : 'bg-amber text-ink-light'
                      }`}>
                        {reg.status === 'erledigt' ? '✓' : reg.status === 'nicht_relevant' ? '–' : '!'}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`font-sans font-semibold text-sm ${reg.status === 'nicht_relevant' ? 'text-muted' : 'text-sand-light'}`}>
                            {reg.title}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${KATEGORIE_COLORS[reg.category] ?? 'bg-ink-border text-muted'}`}>
                            {reg.category}
                          </span>
                        </div>
                        <p className={`text-xs mt-1 ${reg.status === 'nicht_relevant' ? 'text-muted-dark' : 'text-muted'}`}>
                          {reg.beschreibung}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs font-mono text-muted-dark">{reg.rechtsgrundlage}</span>
                          <a href={reg.quelle_url} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-sand/70 hover:text-sand transition-colors">→ Quelle</a>
                        </div>
                      </div>

                      {reg.hat_dokument_generator && (
                        <button onClick={() => setDocGen(reg)}
                          className="flex-shrink-0 text-xs bg-ink border border-ink-border hover:border-sand text-sand-light px-3 py-1.5 rounded-lg transition-colors">
                          Dokument generieren
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {gefiltert.length === 0 && (
                  <div className="text-center py-12 text-muted font-sans">Keine Einträge für diesen Filter.</div>
                )}
              </div>
            </main>
          </div>
        )}

        {/* ── FÖRDERUNGEN TAB ── */}
        {activeTab === 'foerderungen' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-serif text-2xl text-sand-light">Förderungen & Steuervorteile</h1>
              <span className="text-sm font-mono text-muted">{allFundings.length} passende Programme</span>
            </div>
            <div className="space-y-3">
              {allFundings.map(f => (
                <div key={f.id} className="bg-ink-light border border-ink-border rounded-xl overflow-hidden hover:border-sand/40 transition-colors">
                  <div className="p-5 flex items-start gap-4">
                    {/* Score badge */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center border ${
                      f.score >= 80 ? 'bg-teal-dark/30 border-teal-dark/50' :
                      f.score >= 60 ? 'bg-amber-dark/20 border-amber-dark/30' : 'bg-ink border-ink-border'
                    }`}>
                      <span className={`text-sm font-mono font-bold ${f.score >= 80 ? 'text-teal' : f.score >= 60 ? 'text-amber' : 'text-muted'}`}>
                        {f.score}
                      </span>
                      <span className="text-xs font-mono text-muted-dark">%</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-sans font-semibold text-sm text-sand-light">{f.title}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${TYP_COLORS[f.typ] ?? 'bg-ink-border text-muted'}`}>
                          {f.typ}
                        </span>
                        <span className="text-xs font-mono text-muted-dark bg-ink border border-ink-border px-2 py-0.5 rounded-full">
                          {f.quelle}
                        </span>
                      </div>
                      <p className="text-xs text-muted font-sans">{f.foerderer}</p>
                      <p className="text-sm text-muted font-sans mt-1">{f.beschreibung}</p>
                      {f.max_betrag && (
                        <p className="text-xs font-mono text-sand/70 mt-2">
                          Max. {f.max_betrag >= 1000000
                            ? `${(f.max_betrag / 1000000).toFixed(1)} Mio. €`
                            : `${(f.max_betrag / 1000).toFixed(0)}k €`}
                          {f.zins && ` · ${f.zins}`}
                        </p>
                      )}
                    </div>

                    <button onClick={() => setWizard(f)}
                      className="flex-shrink-0 text-xs bg-sand text-ink px-3 py-2 rounded-lg font-sans font-medium hover:bg-sand-mid transition-colors whitespace-nowrap">
                      Antrag vorbereiten →
                    </button>
                  </div>
                </div>
              ))}
              {allFundings.length === 0 && (
                <div className="text-center py-12 text-muted font-sans">Keine passenden Förderungen für Ihr Profil.</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Overlays */}
      {wizard && (
        <ApplicationWizard funding={wizard} profil={profil} onClose={() => setWizard(null)} />
      )}
      {docGen && (
        <DocumentGenerator
          regulation={docGen}
          profil={profil}
          onComplete={id => { setStatus(id, 'erledigt'); setDocGen(null) }}
          onClose={() => setDocGen(null)}
        />
      )}
    </div>
  )
}
```

**Step 2: Remove old card components** (now inlined in Dashboard):

```bash
cd "C:\Users\samue\OneDrive\Dokumente\projekte\compliancekit"
git rm src/components/PflichtCard.tsx src/components/FoerderungCard.tsx
```

**Step 3: Run TypeScript check**

```bash
npx tsc --noEmit
```

Fix any remaining errors.

**Step 4: Commit**

```bash
git add src/pages/Dashboard.tsx
git commit -m "feat: rebuild dashboard with ApplicationWizard and DocumentGenerator integration"
```

---

### Task 9: Final build verification

**Step 1: Run production build**

```bash
cd "C:\Users\samue\OneDrive\Dokumente\projekte\compliancekit"
npm run build
```

Expected: No errors. `dist/` created.

**Step 2: Run dev server and smoke test**

```bash
npm run dev
```

Manually verify:
- Onboarding form shows in new dark ink/sand theme with 3-step progress bar
- Filling out form and submitting navigates to Dashboard
- Pflichten tab shows filtered list with correct status indicators
- Clicking status circle cycles through offen → erledigt → nicht_relevant
- "Dokument generieren" button appears on regulations with `hat_dokument_generator: true`
- Clicking it opens DocumentGenerator panel
- Förderungen tab shows funding cards with score badges
- Clicking "Antrag vorbereiten" opens ApplicationWizard 3-phase overlay

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: compliancekit v2 complete — theme, ApplicationWizard, DocumentGenerator, scoring"
```
