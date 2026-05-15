# ComplianceKit

Ein Tool zur Erleichterung der Bürokratie für Unternehmen im Wirtschaftsstandort Deutschland. Hilft bei der Einhaltung von Regulierungen und der Nutzung von Förderungen.

## Features

- **Unternehmensprofil**: Erfassen Sie Ihr Unternehmensprofil für personalisierte Empfehlungen.
- **Regulierungen**: Überblick über relevante gesetzliche Pflichten mit Status-Tracking.
- **Förderungen**: Entdecken Sie passende Förderprogramme basierend auf Ihrem Profil.
- **Dokumentengenerator**: Automatische Erstellung von Dokumenten wie Datenschutzerklärungen und Impressen mit KI-Unterstützung.
- **Antragsassistent**: Geführte Unterstützung bei Förderantragsprozessen.

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Anthropic AI SDK für Dokumentengenerierung
- React Router für Navigation

## Installation

1. Klone das Repository
2. Installiere Abhängigkeiten: `npm install`
3. Erstelle `.env.local` mit deinem Anthropic API Key: `VITE_ANTHROPIC_API_KEY=sk-ant-...`
4. Starte den Dev-Server: `npm run dev`

## Entwicklung

- `npm run build` - Build für Produktion
- `npm run lint` - Linting
- `npm run preview` - Vorschau des Builds
