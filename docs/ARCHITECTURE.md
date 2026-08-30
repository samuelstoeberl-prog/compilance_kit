# Architecture

Stand: 2026-08-30. Beschreibt den aufgebauten Ist-Zustand, nicht die
ursprüngliche Planung (`docs/plans/2026-04-14-compliancekit-v2.md` ist
mittlerweile in Teilen überholt — z.B. wurde die dort skizzierte
Direct-Browser→Anthropic-Integration mit `VITE_`-Key **nicht** umgesetzt,
zugunsten des sichereren Backend-Proxys, der tatsächlich im Code steht).

## Überblick

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│  React Frontend   │─────▶│  Express Backend  │─────▶│  PostgreSQL      │
│  (Vite, TS)        │ REST │  (Node, TS)        │  pg  │  (Neon, hosted)  │
└─────────────────┘      └──────────────────┘      └─────────────────┘
        │                          │
        │                          ├──▶ Anthropic API (Dokumentgenerierung)
        │                          └──▶ Clerk (Auth-Verifikation, User-API)
        │
        └──▶ Clerk (Login-UI, Session im Browser)
        └──▶ src/data/*.json (Offline-Fallback, wenn Backend nicht erreichbar)

Separat, offline: scrapers/ → schreibt src/data/*.json → migriert per
backend/src/db/migrate*.ts nach Postgres
```

## Frontend

- React 19 + TypeScript + Vite, Tailwind CSS, React Router v7
- State: `src/context/ProfilContext.tsx` — ein Context+Hook-Paar
  (`ProfilProvider`/`useProfil`), das Unternehmensprofil, Compliance-Status
  und Dokument-Zeitstempel hält. Lädt sofort aus `localStorage` (schnelle
  Erstanzeige), synchronisiert danach mit dem Backend, wenn erreichbar und
  eingeloggt
- **Offline-first-Fallback**: Ist das Backend nicht erreichbar
  (`backendOnline` in `ProfilContext`), rechnet das Frontend die
  Filter-/Scoring-Logik (`src/utils/filter.ts`) direkt gegen die lokalen
  JSON-Dateien statt gegen die API
- Seiten-Flow: `Onboarding` (öffentlich, ohne Login) → `PreviewPage`
  (zeigt Ergebnis-Teaser + Clerk-`SignIn`, "Hard Lock" — Ergebnisse im
  Detail erst nach Account) → `Dashboard` (nach Login)
- **Auth-Entscheidung ist bereits getroffen und bewusst so gebaut**: nicht
  komplett öffentlich, sondern Onboarding ohne Login möglich, Login für die
  volle Nutzung erforderlich. Das ist kein offener Punkt mehr — siehe
  Commits "Onboarding-first flow" und "Hard-lock gate" in der Git-Historie.

## Backend

Express + TypeScript, `backend/src/`:

- `app.ts` — Middleware-Kette: Clerk-Middleware → CORS → JSON-Parser →
  Security-Header → Rate-Limiter → Routes → 404 → globaler Error-Handler
- `middleware/` — `auth.ts` (Clerk-Session-Check), `ownership.ts`
  (Company-Ownership-Check), `validate.ts` (Zod-Schemas),
  `rateLimit.ts` (siehe `docs/SECURITY.md` für Details zu allen vieren)
- `routes/` — `companies.ts` (CRUD Unternehmensprofil),
  `match.ts` (gefilterte/gescorte Regulierungen & Förderungen pro
  Unternehmen), `ai.ts` (Dokumentgenerierung via Anthropic, Backend-only
  Key), `user.ts` (Art. 17/20 DSGVO: Export & Löschung)
- `matching/engine.ts` + `scoring.ts` — serverseitige Variante derselben
  Filter-/Scoring-Logik wie `src/utils/filter.ts` im Frontend (bewusst
  dupliziert, damit der Offline-Fallback ohne Backend funktioniert — kein
  gemeinsames Package, weil Frontend und Backend separat deploybar bleiben
  sollen)
- `db/client.ts` — `pg`-Pool, TLS erzwungen in Production
- `db/schema.sql`, `regulierung_schema.sql`, `migrations/` — Postgres-Schema

## Datenhaltung: Warum Postgres + JSON, nicht nur eins von beidem

Diese Kombination ist eine bewusste, im Code sichtbare Entscheidung, kein
Zufall:

- **Postgres (Neon, gehostet)** ist die Quelle der Wahrheit im
  Online-Betrieb: Nutzerkonten-Zuordnung (`companies.clerk_user_id`),
  Compliance-Status pro Nutzer (`regulation_status`), referenzielle
  Integrität (z.B. `ON DELETE CASCADE` für Art.-17-Löschung)
- **JSON-Dateien** (`src/data/*.json`) sind der Offline-/Fallback-Layer:
  Scraper-Output, Deploy-Artefakt fürs Frontend, funktioniert ganz ohne
  Backend-Verbindung. Das ist relevant, weil das Produkt explizit auch
  ohne Login nutzbar sein soll (Onboarding-Vorschau) — dafür braucht es
  keine DB-Anbindung
- Für die aktuelle Größenordnung (Hunderte, nicht Millionen Datensätze)
  ist der Sync-Aufwand zwischen beiden vertretbar; bei signifikant mehr
  Skalierung (echtzeitnahe Multi-User-Konsistenz, sehr große Datenmengen)
  wäre eine alleinige Postgres-Quelle mit einem echten Cache-Layer davor
  die nächste logische Weiterentwicklung — aktuell nicht notwendig

## Auth

Clerk (`@clerk/express` Backend, `@clerk/clerk-react` Frontend) —
begründet in `docs/SECURITY.md`. Kein selbstgebautes Passwort-/
Session-Handling.

## Deployment

- **Frontend**: Vercel (`vercel.json` — Vite-Build, SPA-Rewrite-Regel für
  React-Router-Pfade), Vercel Web Analytics eingebunden
- **Backend**: kein `vercel.json`-Eintrag für Serverless Functions
  gefunden — d.h. der aktuelle Deployment-Weg für `backend/` ist über
  dieses Repo nicht abschließend erkennbar (vermutlich separat
  betrieben/deployt). **Offener Punkt für den Betreiber**, keine
  technische Entscheidung, die dieses Dokument treffen kann — bitte in
  `docs/SETUP.md` ergänzen, sobald der genaue Deployment-Weg für das
  Backend feststeht.
- **Datenbank**: Neon (verwaltetes Postgres) — siehe `docs/vvt.md` für die
  DSGVO-Einordnung als Auftragsverarbeiter
- **Lokal**: `docker-compose.yml` startet Postgres + Backend für die
  lokale Entwicklung (nicht production-gehärtet, siehe `docs/SETUP.md`)

## Scraper-Subsystem

Eigenständig, läuft nicht im Request-Pfad der App — siehe
`docs/DATA_SOURCES.md` für Details. Architektonisch bewusst getrennt
vom Backend-Server: kein HTTP-Endpoint löst einen Scrape aus, es ist ein
CLI-Tool (`npm run scrape:*`), das die Datendateien direkt beschreibt.

## Bereits getroffene Entscheidungen, die dieses Projekt nicht mehr offen hat

Für den Fall, dass jemand diese in Zukunft erneut aufwirft — diese sind
im Code bereits beantwortet, nicht nur diskutiert:

| Frage | Entscheidung | Beleg |
|---|---|---|
| Eigenes Auth oder Managed-Service? | Managed (Clerk) | `@clerk/express`, `@clerk/clerk-react` in beiden `package.json` |
| API oder Scraping für Förder-/Regulierungsdaten? | Scraping (keine API verfügbar) | `scrapers/` |
| KI-Dokumentgenerierung: Client-seitig oder Backend-Proxy? | Backend-Proxy | `routes/ai.ts`, kein `VITE_ANTHROPIC_API_KEY` im laufenden Code |
| Voll-öffentlich (kein Login) oder Login-Pflicht? | Onboarding öffentlich, Rest hinter Login | `PreviewPage.tsx` Hard-Lock-Kommentar, zugehörige Commits |
| Deployment-Plattform Frontend | Vercel | `vercel.json`, Vercel Analytics |
