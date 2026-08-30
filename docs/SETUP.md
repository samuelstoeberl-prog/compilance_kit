# Setup

Stand: 2026-08-30. Beschreibt die tatsächlich vorhandenen Scripts/Configs
im Repo — jeder Befehl hier wurde beim Schreiben dieses Dokuments lokal
ausgeführt und verifiziert, mit einer Ausnahme, die unten explizit als
kaputt markiert ist.

## Voraussetzungen

- Node.js 22 (siehe `.github/workflows/ci.yml` für die getestete Version)
- PostgreSQL 16 (lokal, oder via Docker — siehe unten)
- Ein [Clerk](https://clerk.com)-Account (kostenloser Test-Modus reicht)
- Optional: ein [Anthropic](https://console.anthropic.com)-API-Key (nur
  für die KI-Dokumentgenerierung — ohne Key läuft die App, `/api/ai/documents`
  gibt dann `503` zurück)

## Lokales Setup

### 1. Repository & Abhängigkeiten

```bash
git clone <repo-url>
cd compliancekit
npm install               # Frontend-Abhängigkeiten
cd backend && npm install # Backend-Abhängigkeiten (separates package.json)
cd ..
```

### 2. Umgebungsvariablen

Frontend — `.env.local` im Projekt-Root (siehe `.env.example`):

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...   # Clerk Dashboard → API Keys
VITE_API_URL=                            # leer = selber Origin / Vite-Proxy
```

Backend — `backend/.env` (siehe `backend/.env.example`):

```bash
DATABASE_URL=postgresql://ck_user:ck_password@localhost:5432/compliancekit
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
ANTHROPIC_API_KEY=sk-ant-...   # optional, nur für KI-Dokumentgenerierung
CLERK_SECRET_KEY=sk_test_...   # Clerk Dashboard → API Keys → Secret Key
```

Frontend und Backend haben **eigene, unabhängige** `.env`-Dateien — nichts
mit `VITE_`-Prefix darf einen geheimen Wert enthalten, das landet im
Client-Bundle.

### 3. Datenbank

**Option A — PostgreSQL lokal installiert:**

```bash
createdb compliancekit
psql compliancekit < backend/src/db/schema.sql
npm run backend:migrate   # führt backend/src/db/migrate.ts aus
npm run backend:seed      # optional: Testdaten
```

**Option B — Docker (nur die Postgres-Datenbank):**

```bash
docker compose up -d postgres
```

> ⚠️ **Bekannte Lücke:** `docker-compose.yml` definiert auch einen
> `backend`-Service, der `./backend/Dockerfile` referenziert — diese
> Datei existiert im Repo aktuell **nicht**. `npm run docker:up` (startet
> beide Services) schlägt deshalb für den Backend-Service fehl. Für den
> lokalen Dev-Betrieb den Backend-Service **nicht** über Docker starten,
> sondern wie unten in Schritt 4 beschrieben direkt mit Node/tsx. Ein
> Dockerfile nachzuziehen ist unabhängig von diesem Durchlauf sinnvoll
> (siehe vorgeschlagene Folge-Aufgabe).

### 4. Dev-Server starten

```bash
npm run dev
```

Das startet Frontend (Vite, Port 5173) und Backend
(`node --env-file=.env --import tsx/esm src/index.ts`, Port 3001)
gleichzeitig (`concurrently`) und versucht zusätzlich, einen lokalen
Postgres-Dienst zu starten, falls er nicht schon läuft.

Nur das Backend starten: `npm run backend:dev`
(installiert zuerst automatisch die Backend-Abhängigkeiten).

### 5. Verifizieren

```bash
npm run lint        # ESLint, Frontend + Backend + Scraper (ein gemeinsamer Konfig)
npm run build        # tsc -b && vite build (Frontend)
npm test             # vitest run (Frontend)
cd backend && npx tsc --noEmit && npm test   # Backend Typecheck + Tests
curl http://localhost:3001/api/health        # {"status":"ok",...}
```

Alle vier Befehle laufen identisch auch in CI
(`.github/workflows/ci.yml`).

## Datenbestand aktualisieren (Scraper)

Siehe `docs/DATA_SOURCES.md` für die Details. Kurzform:

```bash
npm run scrape:all              # schreibt src/data/regulations.json + fundings.json
npm run backend:migrate         # überträgt die JSON-Daten in die Postgres-DB
```

## Deployment

### Frontend → Vercel

`vercel.json` im Projekt-Root ist bereits konfiguriert
(`buildCommand: npm run build`, `outputDirectory: dist`, SPA-Rewrite für
React-Router). Vercel-Projekt mit diesem Repo verbinden, die
`VITE_*`-Umgebungsvariablen (s.o.) im Vercel-Dashboard hinterlegen, fertig.

### Backend

Kein Deployment-Config für das Backend im Repo gefunden (kein
`backend/vercel.json`, keine Serverless-Function-Konfiguration, kein
funktionierendes Docker-Image — s.o.). **Das ist ein offener Punkt, der
geklärt werden muss, bevor ein Produktiv-Deployment ansteht** — die
Optionen (Vercel Serverless Functions, ein eigener Node-Host, Fly.io/
Render/Railway o.ä.) sind alle möglich, aber welche gewählt wird, ist eine
Entscheidung, die der Betreiber treffen sollte (Kosten, Betriebsaufwand),
nicht etwas, das sich aus dem Code ableiten lässt.

### Datenbank → Neon

`DATABASE_URL` zeigt in Production auf eine Neon-Instanz (siehe
`docs/vvt.md`). TLS wird erzwungen (`backend/src/db/client.ts`).

## Backups

Kein automatisierter Backup-Prozess für die Postgres-DB im Repo ersichtlich.
Neon bietet Point-in-Time-Recovery je nach gebuchtem Plan — das ist eine
Konfiguration im Neon-Dashboard, nicht im Code, und sollte unabhängig
geprüft werden.
