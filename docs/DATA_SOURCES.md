# Datenquellen

Stand: 2026-08-30. Aktueller Datenbestand: **558 Regulierungen**,
**346 Förderprogramme** (`src/data/regulations.json`,
`src/data/fundings.json`).

## Entscheidung: Scraping statt API

Es gibt in Deutschland **keine nutzbare, offizielle API** für die Daten,
die ComplianceKit braucht:

- **Förderdatenbank des Bundes** (foerderdatenbank.de): keine öffentliche
  API, nur eine durchsuchbare Website
- **KfW**: keine öffentliche Förderprodukt-API
- **BAFA, BMWK, Bundesagentur für Arbeit**: keine strukturierten
  Förder-/Regulierungs-Feeds
- **Gesetze im Internet / EUR-Lex**: liefern Gesetzestexte als HTML-Seiten,
  keine strukturierte "was gilt für wen"-API

Die einzigen praktikablen Optionen waren: (a) alles manuell pflegen (nicht
skalierbar auf hunderte Positionen), oder (b) die öffentlich zugänglichen
Webseiten strukturiert crawlen. Das Projekt implementiert **(b)**: ein
eigener Keyword-basierter Scraper in `scrapers/`, kein Web-API-Client.

Das ist eine **Hybrid-Architektur im Betrieb**, auch wenn die
Datenbeschaffung reines Scraping ist:

1. Scraper laufen offline/manuell und schreiben nach
   `src/data/regulations.json` / `src/data/fundings.json`
2. Diese JSON-Dateien sind der **Offline-Fallback** — bei fehlender
   Backend-Verbindung liest das Frontend direkt daraus
3. Im Normalbetrieb liegen dieselben Daten zusätzlich in **PostgreSQL**
   (`backend/src/db/schema.sql`, Tabellen `regulations`/`fundings` mit
   `scraped_at`/`updated_at`-Spalten) und werden über die REST-API
   (`/api/match/:id/regulations`, `/api/match/:id/fundings`) ausgeliefert

## Wie der Scraper funktioniert

`scrapers/config/seeds-foerderung.ts` und `seeds-regulatorik.ts` definieren
pro Institution eine Domain-Konfiguration (Start-URLs, Regionen,
Skip-Patterns für irrelevante Seiten wie Impressum/Datenschutz/Karriere,
maximale Seitenzahl, Priorität). Aktuell abgedeckt:

- **Förderungen** (`seeds-foerderung.ts`): Förderdatenbank Bund, KfW, alle
  16 Bundesländer, ausgewählte Kommunen, Bürgschaftsbanken — 100+
  Institutionen
- **Regulierungen** (`seeds-regulatorik.ts`): EUR-Lex (DSGVO, NIS2, Data
  Act, AI Act), Gesetze im Internet (ArbZG, MuSchG, BetrVG, BGB, HGB, AO,
  UStG), weitere Bundes- und Fachbehörden

`scrapers/core/crawler.ts` crawlt diese Seeds (mit Tiefenbegrenzung,
Concurrency-Limit, Checkpointing für Resume nach Abbruch),
`scrapers/processors/keyword-extractor.ts` /
`ai-funding.ts` / `ai-regulation.ts` filtern per Keyword-Matching auf
relevante Seiten und extrahieren Strukturdaten (Titel, Betrag, Frist,
Quelle-URL). Ergebnis wird mit dem bestehenden Datenbestand gemerged
(`mergeAndSave` — neue/geänderte Einträge per ID überschrieben, Rest
bleibt erhalten) und nach `src/data/*.json` geschrieben.

```bash
npm run scrape:foerderung          # nur Förderungen
npm run scrape:regulatorik         # nur Regulierungen
npm run scrape:all                 # beides
npm run scrape:foerderung -- --dry-run           # nur anzeigen, nichts schreiben
npm run scrape:foerderung -- --domain=kfw        # eine Institution
npm run scrape:foerderung -- --priority=high      # nur High-Priority-Quellen
npm run scrape:foerderung -- --resume=<runId>      # nach Abbruch fortsetzen
```

Nach einem Scraper-Lauf müssen die JSON-Dateien noch in die Postgres-DB
übernommen werden (`backend/src/db/migrate.ts` bzw.
`migrate-regulierung.ts` — liest die JSON, schreibt/upsert't in die
DB-Tabellen).

## Update-Rhythmus: aktuell manuell, nicht automatisiert

**Das ist die größte verbleibende Lücke in der Datenpipeline.** Der
Scraper läuft nur, wenn ihn jemand manuell startet
(`npm run scrape:all`). Es gibt aktuell:

- ❌ Keinen Cron-Job / Scheduled Workflow
- ❌ Keinen Hinweis in der UI, wie alt die aktuell angezeigten Daten sind
- ❌ Keinen Review-Schritt vor Übernahme (frisch gescrapte Daten werden
  direkt gemerged)

**Empfehlung für den nächsten Schritt** (bewusst nicht in diesem
Durchlauf umgesetzt, siehe Decision Memo): ein wöchentlicher
GitHub-Actions-Scheduled-Workflow, der `npm run scrape:all` ausführt und
das Ergebnis als PR statt als direkten Commit vorschlägt — damit jemand
vor der Übernahme drüberschaut (gerade bei Keyword-Extraktion aus
Freitext ist eine Fehlerquote realistisch, ein automatischer Merge in die
Produktivdaten ohne Review wäre riskant).

## Datenqualität & Haftung

Keyword-basierte Extraktion aus Freitext ist naturgemäß fehleranfällig
(Beträge, Fristen, Zuständigkeiten können falsch erkannt werden). Deshalb:

- Jeder Eintrag trägt `quelle_url` (Regulierungen) bzw. `antrag_url`
  (Förderungen) — ein Link zur Originalquelle, nicht nur der extrahierte
  Text
- Der Footer-Disclaimer im Dashboard ("ersetzt keine individuelle
  Rechtsberatung... ohne Gewähr auf Vollständigkeit und Aktualität") gilt
  ausdrücklich auch für diese Daten
- **Wer haftet bei falschen Daten?** ComplianceKit liefert unverbindliche
  Informationen mit Verweis auf die Originalquelle, keine Rechtsberatung.
  Das ist der Stand nach Selbsteinschätzung im Code/Disclaimer — für eine
  belastbare rechtliche Einordnung (insb. bei kommerziellem Betrieb mit
  zahlenden Kunden) ist ein anwaltlicher Review des Disclaimer-Wortlauts
  zu empfehlen, keine rein technische Entscheidung.

## Geografischer Scope

Nur Deutschland (16 Bundesländer, Bundes- und EU-Recht mit
Deutschland-Bezug). Österreich/Schweiz sind bewusst nicht im Scope — die
Datenmodelle (`bundesland`, `rechtsform`-Enums) sind aktuell DE-spezifisch
und müssten für eine Erweiterung eigens angepasst werden, nicht nur um
neue Scraper-Seeds ergänzt.
