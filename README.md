# ComplianceKit

Ein Tool zur Erleichterung der Bürokratie für Unternehmen im Wirtschaftsstandort Deutschland. Hilft bei der Einhaltung von Regulierungen und der Nutzung von Förderungen.

> ComplianceKit ersetzt keine individuelle Rechtsberatung. Alle Angaben ohne Gewähr auf Vollständigkeit und Aktualität — siehe Disclaimer im Dashboard-Footer.

## Features

- **Unternehmensprofil**: Erfassen Sie Ihr Unternehmensprofil für personalisierte Empfehlungen.
- **Regulierungen**: Überblick über 558 relevante gesetzliche Pflichten mit Status-Tracking.
- **Förderungen**: 346 Förderprogramme, nach Relevanz für Ihr Profil gescort.
- **Dokumentengenerator**: KI-gestützte Erstellung von Dokumenten (Datenschutzerklärung, Impressum, Arbeitszeitnachweis, Arbeitsschutzunterweisung) über einen Backend-Proxy zur Anthropic-API.
- **Antragsassistent**: Geführte Unterstützung bei Förderantragsprozessen.

## Tech Stack

- **Frontend**: React 19 + TypeScript, Vite, Tailwind CSS, React Router v7
- **Backend**: Express + TypeScript, PostgreSQL (Neon), Zod-Validierung
- **Auth**: Clerk (verwaltetes Passwort-/Session-/OAuth-Handling)
- **KI**: Anthropic API, ausschließlich serverseitig aufgerufen
- **Daten**: eigener Scraper (`scrapers/`) statt externer API — Details in [`docs/DATA_SOURCES.md`](docs/DATA_SOURCES.md)

Mehr Details: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) ·
[`docs/SECURITY.md`](docs/SECURITY.md) ·
[`docs/DATA_SOURCES.md`](docs/DATA_SOURCES.md) ·
[`docs/SETUP.md`](docs/SETUP.md)

## Setup

Siehe [`docs/SETUP.md`](docs/SETUP.md) für die vollständige Anleitung
(Frontend + Backend + Datenbank + Umgebungsvariablen). Kurzform:

```bash
npm install && cd backend && npm install && cd ..
npm run dev
```

## Entwicklung

- `npm run build` - Build für Produktion (Frontend)
- `npm run lint` - Linting (Frontend + Backend + Scraper)
- `npm test` - Vitest (Frontend); `cd backend && npm test` für Backend-Tests
- `npm run preview` - Vorschau des Builds
- CI läuft automatisch bei jedem Push/PR — siehe `.github/workflows/ci.yml`
