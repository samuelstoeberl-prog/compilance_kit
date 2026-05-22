# ComplianceKit – Vollständige TODO-Liste

## 🔴 Kritisch (ohne das ist kein echtes Produkt)

### Authentifizierung & Nutzerverwaltung
- [ ] Login / Registrierung (E-Mail + Passwort)
- [ ] Passwort-Reset per E-Mail
- [ ] Session-Management (JWT oder Cookie-basiert)
- [ ] Mehrere Nutzer pro Unternehmen (Rollen: Admin, Mitarbeiter)
- [ ] Sicheres Speichern von Unternehmens-Daten (aktuell nur localStorage)
- [ ] Logout-Funktion

### Echte Dokument-Generierung
- [ ] PDF-Export (aktuell wird eine `.txt`-Datei als PDF ausgegeben)
- [ ] DOCX-Export (aktuell wird Plain-Text als `.docx` ausgegeben)
- [ ] Bibliothek integrieren: `pdfmake`, `puppeteer` oder `react-pdf` für PDF
- [ ] Bibliothek integrieren: `docx` oder `officegen` für echte Word-Dokumente
- [ ] Platzhalter im Template automatisch aus Firmenprofil befüllen (`[EMAIL]`, `[TELEFON]`, etc.)

### AI-Dokument-Generierung verdrahten
- [ ] Backend-Endpunkt `POST /api/ai/documents` existiert, wird aber vom Frontend **nicht aufgerufen**
- [ ] Frontend `DocumentGenerator.tsx` auf den AI-Endpunkt umstellen
- [ ] Fehlerbehandlung + Ladeindikator für AI-Generierung
- [ ] Kostenabschätzung pro AI-Aufruf (Tokens) im Backend loggen

---

## 🟠 Wichtig (für den Launch notwendig)

### E-Mail & Benachrichtigungen
- [ ] Willkommens-E-Mail nach Onboarding
- [ ] Erinnerungen für Fristen (z.B. "Datenschutz-Prüfung fällig")
- [ ] Benachrichtigung bei neuen passenden Förderungen
- [ ] E-Mail-Provider integrieren (Resend, Sendgrid oder AWS SES)
- [ ] E-Mail-Templates (HTML) erstellen

### Onboarding verbessern
- [ ] Bundesland-Feld im Profil hinzufügen (fehlt aktuell)
- [ ] Gründungsjahr als Pflichtfeld (für Startup-Förderprogramme relevant)
- [ ] Umsatzspanne präziser abfragen (aktuell nur grob)
- [ ] Profil nachträglich vollständig bearbeiten (Settings-Seite fehlt)

### Dashboard – fehlende Funktionen
- [ ] Regulierungen als „erledigt" markieren speichert lokal – aber keine Synchronisation wenn anderer Rechner/Browser
- [ ] Förderantrag-Status tracken (beantragt / genehmigt / abgelehnt)
- [ ] Fristen für Regulierungen hinterlegen und anzeigen
- [ ] Filter-Einstellungen persistent speichern (aktuell reset bei Page-Reload)
- [ ] „Favoriten" für Förderungen markieren

### Deployment & Infrastruktur
- [ ] Nginx-Konfiguration für Production-Frontend (aktuell nur Vite Dev Server)
- [ ] Environment-Variablen Dokumentation (`.env.example` fehlt)
- [ ] HTTPS / SSL-Zertifikat
- [ ] Domain konfigurieren
- [ ] Backup-Strategie für PostgreSQL-Datenbank
- [ ] Docker-Compose für Production (aktuell nur Dev-Konfiguration)

---

## 🟡 Qualität & Nutzererfahrung

### Weitere Dokumenten-Templates
- [ ] Datenschutz-Folgenabschätzung (DSFA)
- [ ] Auftragsverarbeitungsvertrag (AVV)
- [ ] Verzeichnis von Verarbeitungstätigkeiten (VVT)
- [ ] Muster-Arbeitsvertrag
- [ ] Betriebsanweisung (Arbeitsschutz)
- [ ] NIS2-Sicherheitsrichtlinie
- [ ] Whistleblower-Hinweisgeberschutz-Richtlinie (HinSchG)

### Mehr Regulierungen abdecken
- [ ] Regulierungen G–Z aus der Quellliste nachtragen (ca. 180 fehlen noch)
- [ ] Branchenspezifische Sonderpflichten (Gastronomie, Gesundheit, Bau)
- [ ] Regulierungen mit echten Fristen verknüpfen

### Mehr Förderprogramme nachtragen
- [ ] Abschnitt G–K (ca. 40 Programme)
- [ ] Abschnitt L–P (ca. 38 Programme)
- [ ] Abschnitt Q–Z (ca. 40 Programme)
- [ ] Kommunale Programme (Top 50 Städte, ca. 60 Programme)
- [ ] Alle 16 Bürgschaftsbanken mit Länderspezifika
- [ ] Stiftungsförderungen (DBU, Bertelsmann, Humboldt – teilweise vorhanden)
- [ ] INTERREG-Programme vollständig

### Mobile Responsiveness
- [ ] Dashboard auf kleinen Bildschirmen nutzbar machen
- [ ] Onboarding auf Mobilgeräten testen und fixen
- [ ] Tabellen-Layout für schmale Screens anpassen

### Barrierefreiheit (Accessibility)
- [ ] ARIA-Labels für alle interaktiven Elemente
- [ ] Tastatur-Navigation durch gesamte App
- [ ] Farbkontrast nach WCAG AA prüfen
- [ ] Screen-Reader-Tests durchführen

---

## 🔵 Nice-to-have (spätere Versionen)

### Scraper-Automatisierung
- [ ] Scraper-Jobs automatisch täglich/wöchentlich ausführen (Cron)
- [ ] Scraped-Daten vor Übernahme reviewen (Admin-UI)
- [ ] Benachrichtigung wenn neue Förderungen gefunden werden
- [ ] Förderprogramme automatisch als abgelaufen markieren

### Admin-Dashboard
- [ ] Regulierungen und Förderungen über UI verwalten (CRUD)
- [ ] Nutzungsstatistiken (welche Programme werden am häufigsten angesehen)
- [ ] Fehlermeldungen und Logs einsehen
- [ ] Dokument-Templates verwalten

### Analytics & Monitoring
- [ ] Fehler-Tracking (Sentry oder ähnliches)
- [ ] Performance-Monitoring (Response-Zeiten Backend)
- [ ] Nutzer-Analytics (welche Features werden genutzt)
- [ ] Uptime-Monitoring

### Tests
- [ ] Unit-Tests für Matching/Scoring-Logik (Backend)
- [ ] Unit-Tests für Filter-Funktionen (Frontend)
- [ ] E2E-Tests für Onboarding-Flow (Playwright oder Cypress)
- [ ] API-Tests für alle Backend-Endpunkte

### Weitere Features
- [ ] CSV/Excel-Export der gefilterten Förder- und Regulierungslisten
- [ ] Sharing-Funktion (Link zu gefilterter Ansicht)
- [ ] Mehrsprachigkeit (DE/EN)
- [ ] Druckansicht für Regulierungs-Checklisten
- [ ] Kalender-Integration für Fristen (iCal-Export)
- [ ] Bewertungssystem für Förderungen (hat jemand erfolgreich beantragt?)

---

## ✅ Bereits fertig

- [x] Onboarding-Wizard (3 Schritte)
- [x] Dashboard mit Regulierungen, Förderungen und Dokumenten
- [x] Matching-Engine (Backend + Frontend-Fallback)
- [x] 312 Förderprogramme in der Datenbank
- [x] 445 Regulierungen in der Datenbank
- [x] 4 Dokumenten-Templates (Datenschutzerklärung, Impressum, Arbeitszeitnachweis, Arbeitsschutzunterweisung)
- [x] Regulierungs-Status tracken (offen / erledigt / nicht relevant)
- [x] Backend REST-API mit PostgreSQL
- [x] Offline-Fallback auf lokale JSON-Dateien
- [x] Docker-Compose für lokale Entwicklung
- [x] Kategorie-Filter und Suchfunktion im Dashboard
- [x] Design-System (DM Sans, Teal/Sand Farben)
- [x] AI-Dokument-Endpunkt (Backend, noch nicht im Frontend verdrahtet)
