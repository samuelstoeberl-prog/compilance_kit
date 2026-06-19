# Incident-Response-Template (Datenpanne)

Internes Dokument – pro Vorfall eine Kopie ausfüllen und unter
`docs/incidents/JJJJ-MM-TT-kurzbeschreibung.md` ablegen.

---

## 1. Stammdaten

- **Datum/Uhrzeit der Entdeckung:**
- **Entdeckt von:**
- **Datum/Uhrzeit des mutmaßlichen Beginns des Vorfalls:**
- **Status:** [ Offen / In Bearbeitung / Abgeschlossen ]

## 2. Art des Vorfalls

- [ ] Unbefugter Zugriff auf Daten (Confidentiality)
- [ ] Datenverlust / Löschung (Availability)
- [ ] Unbefugte Veränderung von Daten (Integrity)
- [ ] Sonstiges: ______

**Kurzbeschreibung des Vorfalls:**

> ...

## 3. Betroffene Daten

- **Datenkategorien:** (z.B. Unternehmensprofil, Compliance-Status, E-Mail-Adressen, Auth-Daten)
- **Betroffene Systeme:** (z.B. Neon-DB, Clerk, Vercel-Logs)
- **Geschätzte Anzahl betroffener Personen:**
- **Besonders sensible Daten betroffen?** (Art. 9 DSGVO) [ Ja / Nein ]

## 4. Betroffene Personen

- **Wer ist betroffen?** (z.B. alle registrierten Nutzer, einzelne Konten)
- **Wurden Betroffene bereits informiert?** [ Ja / Nein / In Vorbereitung ]
- **Falls ja: wann und wie?**

## 5. Risikobewertung

- **Risiko für Rechte und Freiheiten der betroffenen Personen:** [ Gering / Mittel / Hoch ]
- **Begründung:**

> ...

## 6. Sofortmaßnahmen

- [ ] Schwachstelle identifiziert und behoben
- [ ] Betroffene Zugänge/Tokens zurückgesetzt
- [ ] Zugriff auf betroffene Systeme eingeschränkt
- [ ] Logs gesichert (für Nachweis/Forensik)

**Beschreibung der getroffenen Maßnahmen:**

> ...

## 7. Meldung an die Aufsichtsbehörde (Art. 33 DSGVO)

- **Meldepflichtig?** [ Ja / Nein ]
- **Begründung:**
- **Frist:** binnen 72 Stunden nach Bekanntwerden
- **Zuständige Behörde:** Bayerisches Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach, https://www.lda.bayern.de
- **Meldung erfolgt am:**
- **Aktenzeichen / Referenznummer:**

## 8. Benachrichtigung Betroffener (Art. 34 DSGVO)

- **Erforderlich?** [ Ja, bei hohem Risiko / Nein ]
- **Form der Benachrichtigung:**
- **Datum der Benachrichtigung:**

## 9. Lessons Learned

- **Ursache (Root Cause):**
- **Präventive Maßnahmen für die Zukunft:**

> ...

## 10. Abschluss

- **Vorfall abgeschlossen am:**
- **Verantwortlich:** Samuel Stoeberl
