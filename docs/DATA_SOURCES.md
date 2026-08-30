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
`scrapers/processors/keyword-extractor.ts` filtert per Keyword-Matching
auf relevante Seiten und extrahiert Strukturdaten (Titel, Betrag, Frist,
Quelle-URL). Ergebnis wird mit dem bestehenden Datenbestand gemerged
(`mergeAndSave` — neue/geänderte Einträge per ID überschrieben, Rest
bleibt erhalten) und nach `src/data/*.json` geschrieben. Jeder Lauf
aktualisiert außerdem `src/data/meta.json` (`scrapers/core/meta.ts`) mit
dem Zeitstempel des letzten erfolgreichen Durchlaufs — das ist die
Grundlage für den "Daten-Stand"-Hinweis im Dashboard.

> **Unwired Alternative:** `scrapers/processors/ai-funding.ts` und
> `ai-regulation.ts` enthalten eine LLM-basierte Extraktion (Anthropic
> API statt Keyword-Regex) als potenziell robustere Alternative zur
> Freitext-Erkennung. Sie sind aktuell **nicht in `run-foerderung.ts`/
> `run-regulatorik.ts` eingebunden** und referenzieren `@anthropic-ai/sdk`,
> das im Root-`package.json` nicht als Abhängigkeit installiert ist —
> beim direkten Ausführen würden sie fehlschlagen. Sieht nach begonnener,
> nicht abgeschlossener Arbeit aus (nicht nach totem Code), deshalb bewusst
> nicht gelöscht, aber auch nicht in diesem Durchlauf aktiviert: das würde
> laufende Anthropic-API-Kosten in einem automatisierten,
> zeitgesteuerten Workflow bedeuten — eine Kostenentscheidung, die der
> Betreiber treffen sollte, keine rein technische.

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

## Update-Rhythmus: wöchentlich automatisiert, mit Review-Pflicht

`.github/workflows/scrape.yml` läuft **wöchentlich** (montags 03:00 UTC,
außerhalb der üblichen Nutzungszeit) und kann zusätzlich manuell über
"Run workflow" in GitHub Actions ausgelöst werden. Der Workflow:

1. führt `npm run scrape:all` aus (Förderungen + Regulierungen,
   Playwright-Browser wird vorher installiert)
2. prüft, ob sich `src/data/regulations.json`, `fundings.json` oder
   `meta.json` geändert haben
3. öffnet — **falls ja** — einen Pull Request mit den Änderungen
   (`peter-evans/create-pull-request`), statt direkt auf `main` zu
   committen

**Bewusst kein Auto-Merge**: Keyword-Extraktion aus Freitext hat eine
realistische Fehlerquote (Beträge, Fristen, Zuständigkeiten). Ein PR
zwingt zu einem kurzen Review, bevor geänderte Daten live gehen —
insbesondere ein Diff-Blick auf neue/stark veränderte Einträge gegen ihre
`quelle_url`/`antrag_url`.

**Nach dem Merge des PRs weiterhin manuell:** `npm run backend:migrate`
ausführen, um die aktualisierten JSON-Daten in die Postgres-Produktions-DB
zu übernehmen. Das bewusst *nicht* im Workflow zu automatisieren, da das
bedeuten würde, `DATABASE_URL` (Production-Zugang) als Repository-Secret
in einen zeitgesteuerten CI-Job zu geben — eine Erweiterung des
Blast-Radius, die eine eigene Entscheidung des Betreibers verdient, nicht
etwas, das sich "im Vorbeigehen" mit-automatisieren lässt.

**Einmalige Voraussetzung im Repo:** Unter *Settings → Actions → General
→ Workflow permissions* muss "Allow GitHub Actions to create and approve
pull requests" aktiviert sein, sonst schlägt der PR-Erstellungsschritt mit
einem Berechtigungsfehler fehl (der restliche Scraper-Lauf ist davon nicht
betroffen).

Der Dashboard-Header zeigt seit diesem Durchlauf einen "Daten-Stand:
TT.MM.JJJJ"-Hinweis (`src/utils/dataFreshness.ts`), der ab 60 Tagen
Alter gelb hervorgehoben wird — Nutzer sehen damit, dass sie einen
gescrapten Snapshot sehen, kein Live-Feed.

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
