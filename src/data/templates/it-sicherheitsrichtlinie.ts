export const itSicherheitsrichtlinieTemplate = `IT-SICHERHEITSRICHTLINIE
gemäß BSI IT-Grundschutz / ISO 27001

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ALLGEMEINE INFORMATIONEN

Unternehmen:      {{UNTERNEHMENSNAME}} ({{RECHTSFORM}})
Anschrift:        {{STRASSE}}, {{PLZ_ORT}}
Erstellt von:     ________________________________
Gültig ab:        {{DATUM}}
Version:          1.0
Freigegeben von:  ________________________________ (Geschäftsführung)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. GELTUNGSBEREICH UND ZWECK

Diese IT-Sicherheitsrichtlinie gilt für alle Mitarbeitenden, Auftragnehmer
und Dienstleister von {{UNTERNEHMENSNAME}}, die IT-Systeme und Daten
des Unternehmens verwenden.

Ziel ist der Schutz der Vertraulichkeit, Integrität und Verfügbarkeit
aller unternehmensrelevanten Informationen.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2. PASSWORT- UND ZUGANGSREGELN

2.1 Passwortanforderungen
- Mindestlänge: 12 Zeichen
- Kombination aus Groß-/Kleinbuchstaben, Ziffern und Sonderzeichen
- Keine Wörterbuchwörter, keine persönlichen Informationen
- Passwörter sind mindestens alle 90 Tage zu ändern
- Keine Wiederverwendung der letzten 10 Passwörter

2.2 Passwort-Manager
Die Verwendung eines zugelassenen Passwort-Managers ist erlaubt und
empfohlen. Passwörter dürfen nicht in Textdateien oder E-Mails gespeichert
werden.

2.3 Multi-Faktor-Authentifizierung (MFA)
MFA ist verpflichtend für:
- Remote-Zugriff (VPN, Remote Desktop)
- E-Mail-Konten und Cloud-Dienste
- Administrative Zugänge
- Finanz- und ERP-Systeme

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3. GERÄTENUTZUNG UND ENDGERÄTERICHTLINIEN

3.1 Dienstgeräte
- Nur genehmigte Software darf installiert werden
- Automatische Bildschirmsperre nach max. 10 Minuten
- Vollständige Festplattenverschlüsselung ist Pflicht
- Aktuelle Antivirensoftware muss installiert und aktiviert sein
- Betriebssystem- und Software-Updates sind zeitnah einzuspielen

3.2 Private Geräte (BYOD)
Private Geräte dürfen nur mit schriftlicher Genehmigung und nach
Installation der betrieblichen MDM-Lösung für Firmenzwecke genutzt
werden. Private Daten und Firmendaten sind strikt zu trennen.

3.3 Mobile Geräte
- Bildschirmsperre mit PIN/Biometrie ist Pflicht
- Bei Verlust oder Diebstahl sofortige Meldung an IT
- Fernlöschung ist zu ermöglichen (Remote Wipe)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4. E-MAIL- UND INTERNETSICHERHEIT

4.1 E-Mail
- Anhänge unbekannter Absender sind nicht zu öffnen
- Links in E-Mails sind vor dem Klick zu prüfen (URL-Check)
- Keine Weitergabe von Zugangsdaten per E-Mail
- Phishing-verdächtige E-Mails sofort an IT melden
- Verschlüsselung bei sensiblen Inhalten (S/MIME oder PGP)

4.2 Internetnutzung
- Private Nutzung ist auf Pausen beschränkt
- Downloads nur von vertrauenswürdigen Quellen
- Besuch bekannter Malware-Sites ist verboten
- Keine Nutzung öffentlicher WLAN-Netze ohne VPN

4.3 Cloud-Dienste
Nur vom Unternehmen freigegebene Cloud-Dienste dürfen für Firmendaten
genutzt werden. Die Speicherung sensibler Daten in nicht freigegebenen
Cloud-Diensten ist untersagt.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5. DATENSICHERUNG UND BACKUPS

5.1 Backup-Pflicht
Alle wichtigen Firmendaten sind regelmäßig zu sichern (3-2-1-Regel):
- 3 Kopien der Daten
- 2 verschiedene Speichermedien
- 1 externe/offsite Kopie

5.2 Backup-Häufigkeit
- Kritische Daten: täglich
- Wichtige Daten: wöchentlich
- Archivdaten: monatlich

5.3 Wiederherstellungstests
Backups sind vierteljährlich auf Wiederherstellbarkeit zu testen;
Ergebnisse werden dokumentiert.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

6. INCIDENT RESPONSE – SICHERHEITSVORFÄLLE

6.1 Meldepflicht
Alle Mitarbeitenden sind verpflichtet, Sicherheitsvorfälle
unverzüglich zu melden:

IT-Sicherheitsbeauftragter: ________________________________
Telefon: ________________________________
E-Mail: {{EMAIL}}
Alternativ: ________________________________

6.2 Ablauf bei Sicherheitsvorfällen
1. Vorfall sichern (keine Beweise vernichten)
2. System ggf. vom Netzwerk trennen
3. IT-Sicherheitsbeauftragten informieren
4. Vorfall dokumentieren (Datum, Uhrzeit, Beobachtungen)
5. Auf Anweisungen der IT warten

6.3 Meldepflichten nach DSGVO
Bei Datenschutzverletzungen: Meldung an die Aufsichtsbehörde
binnen 72 Stunden (Art. 33 DSGVO).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

7. HOMEOFFICE UND REMOTE-ARBEIT

- VPN-Pflicht bei Zugriff auf interne Systeme
- Bildschirm nicht für Unbefugte einsehbar
- Keine Verarbeitung von Firmendaten auf nicht gesicherten Geräten
- Ausdrucke von vertraulichen Unterlagen sofort vernichten (Schredder)
- Videokonferenz-Links nicht öffentlich teilen

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

8. UMGANG MIT VERTRAULICHEN INFORMATIONEN

Klassifizierungsstufen:
- ÖFFENTLICH: Externe Kommunikation freigegeben
- INTERN: Nur für Mitarbeitende
- VERTRAULICH: Nur für berechtigte Mitarbeitende
- STRENG VERTRAULICH: Nur für explizit benannte Personen

Vertrauliche und streng vertrauliche Informationen sind:
- Nur verschlüsselt zu übertragen
- Nur auf genehmigten Systemen zu speichern
- Nicht auf privaten Geräten zu verarbeiten

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

9. SCHULUNGEN UND AWARENESS

Alle Mitarbeitenden nehmen jährlich an IT-Sicherheitsschulungen
teil. Neue Mitarbeitende werden vor Aufnahme der Tätigkeit geschult
und unterzeichnen diese Richtlinie.

Phishing-Simulationen werden mindestens halbjährlich durchgeführt.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

10. VERSTÖSSE UND SANKTIONEN

Verstöße gegen diese Richtlinie können arbeitsrechtliche Konsequenzen
haben (Abmahnung bis hin zur fristlosen Kündigung) und ggf.
strafrechtlich verfolgt werden.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BESTÄTIGUNG DES MITARBEITENDEN

Ich habe diese IT-Sicherheitsrichtlinie gelesen, verstanden und
verpflichte mich zur Einhaltung.

Name:          ________________________________
Abteilung:     ________________________________
Datum:         ________________________________
Unterschrift:  ________________________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Gültig für: {{UNTERNEHMENSNAME}} | Stand: {{DATUM}}
Rechtsgrundlagen: BSIG, ISO 27001, DSGVO Art. 32`
