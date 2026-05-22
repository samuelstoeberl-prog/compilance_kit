-- Querschnitt / Weitere regulations
BEGIN;

INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Glücksspielstaatsvertrag GlüStV (Lizenz je Produkt, Spielerschutz)$$,$$GlüStV$$,$$Glücksspielstaatsvertrag GlüStV (Lizenz je Produkt, Spielerschutz)$$,$$GlüStV 2021 §§1ff.$$,$$https://gesetze-im-internet.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,5,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$GlüStV$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Netzwerkdurchsetzungsgesetz NetzDG (Berichtspflicht, Löschpflicht)$$,$$NetzDG$$,$$Netzwerkdurchsetzungsgesetz NetzDG (Berichtspflicht, Löschpflicht)$$,$$NetzDG §§1ff.$$,$$https://gesetze-im-internet.de/netzdg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,11,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$NetzDG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Rundfunklizenz / Medienrecht (Streaming-Zulassung, Programmvorschriften)$$,$$MStV$$,$$Rundfunklizenz / Medienrecht (Streaming-Zulassung, Programmvorschriften)$$,$$MStV; Landesmediengesetze$$,$$https://gesetze-im-internet.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,5,5
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$MStV$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Presserecht Impressum Print (verantwortlicher Redakteur)$$,$$LPG$$,$$Presserecht Impressum Print (verantwortlicher Redakteur)$$,$$LPG Länder$$,$$https://gesetze-im-internet.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,5,5
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$LPG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Telemedienrecht Hosting-Haftungsprivileg (Notice-and-Takedown)$$,$$TMG$$,$$Telemedienrecht Hosting-Haftungsprivileg (Notice-and-Takedown)$$,$$TMG §10; DSA$$,$$https://gesetze-im-internet.de/tmg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,11,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$TMG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$eIDAS (qualifizierte elektronische Signatur/Siegel für Rechtsgültigkeit)$$,$$EU-VO$$,$$eIDAS (qualifizierte elektronische Signatur/Siegel für Rechtsgültigkeit)$$,$$EU-VO 910/2014$$,$$https://eur-lex.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,9,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EU-VO$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$TKG Rufnummernportierung (binnen 1 Werktag, kostenlos)$$,$$TKG$$,$$TKG Rufnummernportierung (binnen 1 Werktag, kostenlos)$$,$$TKG §46$$,$$https://gesetze-im-internet.de/tkg_2021$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,22,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$TKG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Barrierefreiheit öffentliche Stellen (WCAG 2.1, Erklärungspflicht)$$,$$BITV$$,$$Barrierefreiheit öffentliche Stellen (WCAG 2.1, Erklärungspflicht)$$,$$BITV 2.0; BGG §§12a-12k$$,$$https://gesetze-im-internet.de/bitv_2_0$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,11,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$BITV$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Datenbankschutz Urheberrecht (Sui-generis-Schutz)$$,$$UrhG$$,$$Datenbankschutz Urheberrecht (Sui-generis-Schutz)$$,$$UrhG §§87a ff.$$,$$https://gesetze-im-internet.de/urhg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,9,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$UrhG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Software-Lizenzrecht / Open-Source-Compliance$$,$$UrhG-2$$,$$Software-Lizenzrecht / Open-Source-Compliance$$,$$UrhG §69a; GPL/LGPL$$,$$https://gesetze-im-internet.de/urhg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,9,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$UrhG-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$EU-Beihilferecht (staatliche Beihilfen nur mit EU-Genehmigung)$$,$$Art.107$$,$$EU-Beihilferecht (staatliche Beihilfen nur mit EU-Genehmigung)$$,$$Art.107 AEUV; AGVO$$,$$https://ec.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,5,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$Art.107$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Vergaberecht Unterschwelle UVgO (3 Angebote, Dokumentation)$$,$$UVgO$$,$$Vergaberecht Unterschwelle UVgO (3 Angebote, Dokumentation)$$,$$UVgO 2017$$,$$https://gesetze-im-internet.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,5,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$UVgO$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Tariftreue öffentliche Aufträge$$,$$TVgG$$,$$Tariftreue öffentliche Aufträge$$,$$TVgG Länder$$,$$https://gesetze-im-internet.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,5,5
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$TVgG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Konzessionsabgabe Gemeinden (Energieversorger für Wege)$$,$$KAV$$,$$Konzessionsabgabe Gemeinden (Energieversorger für Wege)$$,$$KAV$$,$$https://gesetze-im-internet.de/kav$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,20,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$KAV$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Franchising AGB-Recht (Transparenz, keine übermäßige Belastung)$$,$$BGB$$,$$Franchising AGB-Recht (Transparenz, keine übermäßige Belastung)$$,$$BGB §§305-310$$,$$https://gesetze-im-internet.de/bgb$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,11,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$BGB$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Prospekthaftung Vermögensanlagen (ab 20 Anleger oder 100.000 €)$$,$$VermAnlG$$,$$Prospekthaftung Vermögensanlagen (ab 20 Anleger oder 100.000 €)$$,$$VermAnlG §§1ff.$$,$$https://gesetze-im-internet.de/vermogeanlg_2011$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,21,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$VermAnlG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Bodenordnung Wasserentnahme (wasserrechtliche Erlaubnis)$$,$$WHG$$,$$Bodenordnung Wasserentnahme (wasserrechtliche Erlaubnis)$$,$$WHG §§8-18$$,$$https://gesetze-im-internet.de/whg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,8,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$WHG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Klimaschutzgesetz Sektorziele-Monitoring$$,$$KSG$$,$$Klimaschutzgesetz Sektorziele-Monitoring$$,$$KSG §§1ff.$$,$$https://gesetze-im-internet.de/ksg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,8,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$KSG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$VAwS Anlagen mit wassergefährdenden Stoffen (Fachbetrieb WHG)$$,$$VAwS$$,$$VAwS Anlagen mit wassergefährdenden Stoffen (Fachbetrieb WHG)$$,$$VAwS Länder; WHG §62$$,$$https://gesetze-im-internet.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,8,5
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$VAwS$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Deponieverordnung (Genehmigung, Grundwassermonitoring)$$,$$DepV$$,$$Deponieverordnung (Genehmigung, Grundwassermonitoring)$$,$$DepV$$,$$https://gesetze-im-internet.de/depv$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,8,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$DepV$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$TA Lärm / BImSchG §22 (Lärmgrenzwerte Gewerbebetriebe)$$,$$TA$$,$$TA Lärm / BImSchG §22 (Lärmgrenzwerte Gewerbebetriebe)$$,$$TA Lärm; BImSchG §22$$,$$https://gesetze-im-internet.de/bimschg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,8,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$TA$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Abwasserverordnung (Branchenspezifische Einleitgrenzwerte)$$,$$AbwV$$,$$Abwasserverordnung (Branchenspezifische Einleitgrenzwerte)$$,$$AbwV$$,$$https://gesetze-im-internet.de/abwv$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,8,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$AbwV$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Klärschlammverordnung (Grenzwerte, Analysen, Meldungen)$$,$$AbfKlärV$$,$$Klärschlammverordnung (Grenzwerte, Analysen, Meldungen)$$,$$AbfKlärV$$,$$https://gesetze-im-internet.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,8,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$AbfKlärV$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Biogasanlagen BImSchG-Genehmigung (Geruchsschutz, Sicherheit)$$,$$BImSchG$$,$$Biogasanlagen BImSchG-Genehmigung (Geruchsschutz, Sicherheit)$$,$$BImSchG; 4. BImSchV$$,$$https://gesetze-im-internet.de/bimschg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,8,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$BImSchG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Altölannahme (getrennte Erfassung, zugelassener Entsorger)$$,$$AltölV$$,$$Altölannahme (getrennte Erfassung, zugelassener Entsorger)$$,$$AltölV$$,$$https://gesetze-im-internet.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,8,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$AltölV$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Treibhausgasmonitoring (Monitoring-Plan, verifizierter Jahresbericht)$$,$$EU-VO-2$$,$$Treibhausgasmonitoring (Monitoring-Plan, verifizierter Jahresbericht)$$,$$EU-VO 2018/2066 (MRR)$$,$$https://ec.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,8,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EU-VO-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Transparenzregister Aktualisierungspflicht (jährlich)$$,$$GwG$$,$$Transparenzregister Aktualisierungspflicht (jährlich)$$,$$GwG §§20-21$$,$$https://transparenzregister.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,22,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$GwG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Insolvenzanfechtung (bis zu 10 Jahre rückwirkend)$$,$$InsO$$,$$Insolvenzanfechtung (bis zu 10 Jahre rückwirkend)$$,$$InsO §§129-147$$,$$https://gesetze-im-internet.de/inso$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,5,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$InsO$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Zahlungsverzug (9% Zinsen über Basiszins, 40 € Mahnpauschale)$$,$$BGB-2$$,$$Zahlungsverzug (9% Zinsen über Basiszins, 40 € Mahnpauschale)$$,$$BGB §§286-288$$,$$https://gesetze-im-internet.de/bgb$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,5,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$BGB-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$DBA Doppelbesteuerungsabkommen (Ansässigkeitsbescheinigung)$$,$$EStG$$,$$DBA Doppelbesteuerungsabkommen (Ansässigkeitsbescheinigung)$$,$$EStG §§34c-34d; DBA$$,$$https://bundesfinanzministerium.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EStG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Hinzurechnungsbesteuerung AStG (Passiveinkünfte Niedrigsteuerländer)$$,$$AStG$$,$$Hinzurechnungsbesteuerung AStG (Passiveinkünfte Niedrigsteuerländer)$$,$$AStG §§7-13$$,$$https://gesetze-im-internet.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$AStG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Gewerbesteuer Zerlegung (mehrere Gemeinden)$$,$$GewStG$$,$$Gewerbesteuer Zerlegung (mehrere Gemeinden)$$,$$GewStG §§28-36$$,$$https://gesetze-im-internet.de/gewstg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$GewStG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Elektronische Lohnsteuermerkmale ELStAM$$,$$EStG-2$$,$$Elektronische Lohnsteuermerkmale ELStAM$$,$$EStG §39e$$,$$https://elster.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EStG-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Quellensteuer Aufsichtsrat (30% auf beschränkt Steuerpflichtige)$$,$$EStG-3$$,$$Quellensteuer Aufsichtsrat (30% auf beschränkt Steuerpflichtige)$$,$$EStG §50a Abs.1 Nr.4$$,$$https://gesetze-im-internet.de/estg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EStG-3$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Fahrtenbuchpflicht Firmenwagen (1%-Regel oder Fahrtenbuch)$$,$$EStG-4$$,$$Fahrtenbuchpflicht Firmenwagen (1%-Regel oder Fahrtenbuch)$$,$$EStG §6 Abs.1 Nr.4$$,$$https://gesetze-im-internet.de/estg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EStG-4$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Reisekostenrecht (Pauschalen: Verpflegung, Unterkunft, Fahrt)$$,$$EStG-5$$,$$Reisekostenrecht (Pauschalen: Verpflegung, Unterkunft, Fahrt)$$,$$EStG §§3 Nr.13-16$$,$$https://gesetze-im-internet.de/estg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EStG-5$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Bewirtungskosten (70% abzugsfähig, Bewirtungsbeleg mit Pflichtangaben)$$,$$EStG-6$$,$$Bewirtungskosten (70% abzugsfähig, Bewirtungsbeleg mit Pflichtangaben)$$,$$EStG §4 Abs.5 Nr.2$$,$$https://gesetze-im-internet.de/estg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EStG-6$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Homeoffice-Pauschale (6 €/Tag, max. 1.260 €/Jahr)$$,$$EStG-7$$,$$Homeoffice-Pauschale (6 €/Tag, max. 1.260 €/Jahr)$$,$$EStG §§4/9$$,$$https://gesetze-im-internet.de/estg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EStG-7$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$FZulG Forschungsförderung (25–35% Steuererstattung auf FuE-Aufwendungen)$$,$$FZulG$$,$$FZulG Forschungsförderung (25–35% Steuererstattung auf FuE-Aufwendungen)$$,$$FZulG §§1ff.$$,$$https://gesetze-im-internet.de/fzulg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$FZulG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Montan-Mitbestimmung (Kohle/Stahl: Arbeitsdirektor, neutrales Mitglied)$$,$$Montan-MitbestG$$,$$Montan-Mitbestimmung (Kohle/Stahl: Arbeitsdirektor, neutrales Mitglied)$$,$$Montan-MitbestG$$,$$https://gesetze-im-internet.de$$,1001,NULL,TRUE,TRUE,TRUE,TRUE,2,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$Montan-MitbestG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Betriebsrat Sozialplan (bei >5% Belegschaftsabbau)$$,$$BetrVG$$,$$Betriebsrat Sozialplan (bei >5% Belegschaftsabbau)$$,$$BetrVG §§111-113$$,$$https://gesetze-im-internet.de/betrvg$$,21,NULL,TRUE,TRUE,TRUE,TRUE,2,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$BetrVG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Betriebliche Gesundheitsförderung (GKV-Förderung, Steuerfreiheit bis 600 €)$$,$$SGB-V$$,$$Betriebliche Gesundheitsförderung (GKV-Förderung, Steuerfreiheit bis 600 €)$$,$$SGB V §20b$$,$$https://gesetze-im-internet.de/sgb_5$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,3,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$SGB-V$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Sozialkassen Maler/Lackierer ULAK$$,$$ULAK-TV$$,$$Sozialkassen Maler/Lackierer ULAK$$,$$ULAK-TV$$,$$https://ulak.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,19,4
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$ULAK-TV$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Sozialkassen Gebäudereiniger ULAK-GRE$$,$$ULAK-GRE$$,$$Sozialkassen Gebäudereiniger ULAK-GRE$$,$$ULAK-GRE TV$$,$$https://gesetze-im-internet.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,19,4
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$ULAK-GRE$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Beitragszuschuss Privatkrankenversicherung$$,$$SGB-V-2$$,$$Beitragszuschuss Privatkrankenversicherung$$,$$SGB V §257$$,$$https://gesetze-im-internet.de/sgb_5$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,19,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$SGB-V-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$SV-Beiträge Praktikanten (ab 3 Monate freiwillig SV-pflichtig)$$,$$SGB-IV$$,$$SV-Beiträge Praktikanten (ab 3 Monate freiwillig SV-pflichtig)$$,$$SGB IV §7$$,$$https://gesetze-im-internet.de/sgb_4$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,19,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$SGB-IV$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Winterbauförderung Saisonkurzarbeit Bau$$,$$SGB-III$$,$$Winterbauförderung Saisonkurzarbeit Bau$$,$$SGB III §175a$$,$$https://gesetze-im-internet.de/sgb_3$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,19,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$SGB-III$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Unfallversicherung Unternehmer freiwillig$$,$$SGB-VII$$,$$Unfallversicherung Unternehmer freiwillig$$,$$SGB VII §6$$,$$https://dguv.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,19,7
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$SGB-VII$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Nachtarbeit Ausgleich (Zuschlag oder Freizeit)$$,$$ArbZG$$,$$Nachtarbeit Ausgleich (Zuschlag oder Freizeit)$$,$$ArbZG §6$$,$$https://gesetze-im-internet.de/arbzg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,1,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$ArbZG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Telearbeit Gefährdungsbeurteilung Homeoffice$$,$$ArbStättV$$,$$Telearbeit Gefährdungsbeurteilung Homeoffice$$,$$ArbStättV §2 Abs.7$$,$$https://gesetze-im-internet.de/arbstaettv_2004$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,3,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$ArbStättV$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Stimmrechtsmitteilungen börsennotierte AG$$,$$WpHG$$,$$Stimmrechtsmitteilungen börsennotierte AG$$,$$WpHG §§33 ff.$$,$$https://gesetze-im-internet.de/wphg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,21,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$WpHG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Aktionärs-Auskunftsrecht HV$$,$$AktG$$,$$Aktionärs-Auskunftsrecht HV$$,$$AktG §131$$,$$https://gesetze-im-internet.de/aktg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,22,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$AktG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Squeeze-out Abfindung (ab 95% Hauptaktionär)$$,$$AktG-2$$,$$Squeeze-out Abfindung (ab 95% Hauptaktionär)$$,$$AktG §§327a ff.$$,$$https://gesetze-im-internet.de/aktg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,22,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$AktG-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Genossenschaften (Satzung, Mindestreserve, Pflichtprüfung)$$,$$GenG$$,$$Genossenschaften (Satzung, Mindestreserve, Pflichtprüfung)$$,$$GenG §§5ff.$$,$$https://gesetze-im-internet.de/geng$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,22,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$GenG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Stiftungsrecht (Behördliche Genehmigung, Kapitalerhalt, Jahresrechnung)$$,$$StiftG$$,$$Stiftungsrecht (Behördliche Genehmigung, Kapitalerhalt, Jahresrechnung)$$,$$StiftG Länder$$,$$https://gesetze-im-internet.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,22,5
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$StiftG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Markenmissbrauch (Löschung bei 5-jähriger Nichtbenutzung)$$,$$MarkenG$$,$$Markenmissbrauch (Löschung bei 5-jähriger Nichtbenutzung)$$,$$MarkenG §26$$,$$https://gesetze-im-internet.de/markeng$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,22,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$MarkenG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Mitarbeiterbeteiligung ESOP (steuerliche Behandlung)$$,$$EStG-8$$,$$Mitarbeiterbeteiligung ESOP (steuerliche Behandlung)$$,$$EStG §19a$$,$$https://gesetze-im-internet.de/estg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EStG-8$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Spielervermittler Profisport (DFB-Lizenz, Vergütungsobergrenze 3%)$$,$$DFB-SpielervermittlerO$$,$$Spielervermittler Profisport (DFB-Lizenz, Vergütungsobergrenze 3%)$$,$$DFB-SpielervermittlerO 2024$$,$$https://dfb.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,5,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$DFB-SpielervermittlerO$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Lotterierecht (staatliche Konzession, Spieler-/Jugendschutz)$$,$$GlüStV-2$$,$$Lotterierecht (staatliche Konzession, Spieler-/Jugendschutz)$$,$$GlüStV 2021 §§12ff.$$,$$https://gesetze-im-internet.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,5,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$GlüStV-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Betriebsstättenprinzip Steuerpflicht$$,$$AO$$,$$Betriebsstättenprinzip Steuerpflicht$$,$$AO §12$$,$$https://gesetze-im-internet.de/ao_1977$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$AO$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Reverse Charge USt (Bauleistung, Reinigung, Schrotthandel)$$,$$UStG$$,$$Reverse Charge USt (Bauleistung, Reinigung, Schrotthandel)$$,$$UStG §13b$$,$$https://gesetze-im-internet.de/ustg_1980$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$UStG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$USt Sonderfall innergemeinschaftliche Lieferung (USt-ID-Nummer, ZM)$$,$$UStG-2$$,$$USt Sonderfall innergemeinschaftliche Lieferung (USt-ID-Nummer, ZM)$$,$$UStG §6a$$,$$https://gesetze-im-internet.de/ustg_1980$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$UStG-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Einfuhrumsatzsteuer (EUSt beim Zoll; IOSS unter 150 €)$$,$$UStG-3$$,$$Einfuhrumsatzsteuer (EUSt beim Zoll; IOSS unter 150 €)$$,$$UStG §21$$,$$https://zoll.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$UStG-3$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Steuerliche Auskunft/Vorbescheid (gebührenpflichtig)$$,$$AO-2$$,$$Steuerliche Auskunft/Vorbescheid (gebührenpflichtig)$$,$$AO §89 Abs.2$$,$$https://gesetze-im-internet.de/ao_1977$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$AO-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Steuergeheimnis (Weitergabe strafbar)$$,$$AO-3$$,$$Steuergeheimnis (Weitergabe strafbar)$$,$$AO §30$$,$$https://gesetze-im-internet.de/ao_1977$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$AO-3$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Grunderwerbsteuer (3,5–6,5% je Bundesland, Anzeigepflicht)$$,$$GrEStG$$,$$Grunderwerbsteuer (3,5–6,5% je Bundesland, Anzeigepflicht)$$,$$GrEStG §§1ff.$$,$$https://gesetze-im-internet.de/grestg_1983$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$GrEStG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Energiesteuer (Kraftstoffe, Heizöl; Vergütungsanträge)$$,$$EnergieStG$$,$$Energiesteuer (Kraftstoffe, Heizöl; Vergütungsanträge)$$,$$EnergieStG$$,$$https://gesetze-im-internet.de/energiestg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EnergieStG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Umsatzsteuersatz 7% (Bücher, Grundnahrungsmittel, Hotels)$$,$$UStG-4$$,$$Umsatzsteuersatz 7% (Bücher, Grundnahrungsmittel, Hotels)$$,$$UStG §12 Abs.2$$,$$https://gesetze-im-internet.de/ustg_1980$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$UStG-4$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Digitale Dienstleistungen EU (OSS, Besteuerung im Empfängerland)$$,$$UStG-5$$,$$Digitale Dienstleistungen EU (OSS, Besteuerung im Empfängerland)$$,$$UStG §3a Abs.5$$,$$https://gesetze-im-internet.de/ustg_1980$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$UStG-5$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Bilanzkontrolle DPR / BaFin$$,$$WpHG-2$$,$$Bilanzkontrolle DPR / BaFin$$,$$WpHG §§106ff.$$,$$https://gesetze-im-internet.de/wphg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,21,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$WpHG-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Jahresabschluss GmbH-Frist (6 Monate klein, 3 Monate groß)$$,$$GmbHG$$,$$Jahresabschluss GmbH-Frist (6 Monate klein, 3 Monate groß)$$,$$GmbHG §42a$$,$$https://gesetze-im-internet.de/gmbhg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,22,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$GmbHG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Handelskammerpflicht DIHK SGH (Schiedsgerichtshof DIHK)$$,$$IHKG$$,$$Handelskammerpflicht DIHK SGH (Schiedsgerichtshof DIHK)$$,$$IHKG$$,$$https://dihk.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,5,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$IHKG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$MaBV Sicherheitsleistung Bauträger$$,$$MaBV$$,$$MaBV Sicherheitsleistung Bauträger$$,$$MaBV §3$$,$$https://gesetze-im-internet.de/mabv$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,22,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$MaBV$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$SCIP-Meldepflicht ECHA (SVHC-Stoffe in Erzeugnissen ab 0,1%)$$,$$Art.9$$,$$SCIP-Meldepflicht ECHA (SVHC-Stoffe in Erzeugnissen ab 0,1%)$$,$$Art.9 AbfRL; ChemG §16f$$,$$https://echa.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,8,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$Art.9$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Chemikalienverbotsverordnung (Gifte, Beschränkungen)$$,$$ChemVerbotsV$$,$$Chemikalienverbotsverordnung (Gifte, Beschränkungen)$$,$$ChemVerbotsV$$,$$https://gesetze-im-internet.de/chemverbotsv$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,8,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$ChemVerbotsV$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Netzanschluss Strom (Anschlussrecht, Netzbetreiberpflicht)$$,$$EnWG$$,$$Netzanschluss Strom (Anschlussrecht, Netzbetreiberpflicht)$$,$$EnWG §§17-18$$,$$https://gesetze-im-internet.de/enwg_2005$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,20,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EnWG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Eigenverbrauch EEG-Umlage (PV bis 30 kW befreit)$$,$$EEG$$,$$Eigenverbrauch EEG-Umlage (PV bis 30 kW befreit)$$,$$EEG §§61ff.$$,$$https://gesetze-im-internet.de/eeg_2023$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,20,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EEG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Mindeststeuer UTPR (Ergänzungssteuer bei Tochter unter 15% Besteuerung)$$,$$MinStG$$,$$Mindeststeuer UTPR (Ergänzungssteuer bei Tochter unter 15% Besteuerung)$$,$$MinStG §8; EU-RL 2022/2523$$,$$https://bundesfinanzministerium.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,2
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$MinStG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$DAC7 Digitale Plattform-Meldepflicht$$,$$PStTG$$,$$DAC7 Digitale Plattform-Meldepflicht$$,$$PStTG; EU-RL 2021/514$$,$$https://gesetze-im-internet.de/psttg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,2
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$PStTG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Glücksspiel Jugendschutz (Spielersperrdatei OASIS)$$,$$GlüStV-3$$,$$Glücksspiel Jugendschutz (Spielersperrdatei OASIS)$$,$$GlüStV 2021$$,$$https://oasis-sperrsystem.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,5,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$GlüStV-3$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Spielervermittlung DFB (Transparenzpflichten ab 2024)$$,$$DFB-SpielervermittlerO-2$$,$$Spielervermittlung DFB (Transparenzpflichten ab 2024)$$,$$DFB-SpielervermittlerO 2024$$,$$https://dfb.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,5,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$DFB-SpielervermittlerO-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$SOKA-BAU Beiträge (Urlaub, Rentenbeihilfe, Berufsbildung)$$,$$BRTV$$,$$SOKA-BAU Beiträge (Urlaub, Rentenbeihilfe, Berufsbildung)$$,$$BRTV Bau; SoKaSiG$$,$$https://soka-bau.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,19,4
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$BRTV$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$KSK-Abgabe für Werbeabteilungen (Design, Text, Musik intern)$$,$$KSVG$$,$$KSK-Abgabe für Werbeabteilungen (Design, Text, Musik intern)$$,$$KSVG §24$$,$$https://kuenstlersozialkasse.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,19,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$KSVG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Liquiditätsanforderungen LCR Banken (min. 100%)$$,$$EU-VO-3$$,$$Liquiditätsanforderungen LCR Banken (min. 100%)$$,$$EU-VO 575/2013 (CRR)$$,$$https://eur-lex.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,21,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EU-VO-3$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Sanierungsplan Banken (Recovery Plan, ab 30 Mrd. € Bilanzsumme)$$,$$SAG$$,$$Sanierungsplan Banken (Recovery Plan, ab 30 Mrd. € Bilanzsumme)$$,$$SAG §§12ff.$$,$$https://gesetze-im-internet.de$$,30,NULL,TRUE,TRUE,TRUE,TRUE,21,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$SAG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$EUDR-Sorgfaltspflicht (Entwaldungsfreiheit, Geolokalisierung, ab Dez. 2026)$$,$$EU-VO-4$$,$$EUDR-Sorgfaltspflicht (Entwaldungsfreiheit, Geolokalisierung, ab Dez. 2026)$$,$$EU-VO 2023/1115$$,$$https://eur-lex.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,7,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EU-VO-4$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Treibhausgas-Emissionsmonitoring (Jahresbericht verifiziert)$$,$$EU-VO-5$$,$$Treibhausgas-Emissionsmonitoring (Jahresbericht verifiziert)$$,$$EU-VO 2018/2066 (MRR)$$,$$https://dehst.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,8,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EU-VO-5$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Abfallrahmenrichtlinie Abfallhierarchie$$,$$KrWG$$,$$Abfallrahmenrichtlinie Abfallhierarchie$$,$$KrWG; EU-RL 2008/98$$,$$https://gesetze-im-internet.de/krwg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,8,2
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$KrWG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Ratingagenturen CRA-VO (ESMA-Registrierung)$$,$$EU-VO-6$$,$$Ratingagenturen CRA-VO (ESMA-Registrierung)$$,$$EU-VO 1060/2009$$,$$https://esma.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,21,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EU-VO-6$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Hypothekenkreditrecht ESIS-Formular (Beratungsprotokoll)$$,$$WohnimmoKrRL$$,$$Hypothekenkreditrecht ESIS-Formular (Beratungsprotokoll)$$,$$WohnimmoKrRL 2014/17$$,$$https://eur-lex.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,21,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$WohnimmoKrRL$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Crowdfunding max. 5 Mio. €/Projekt (BaFin-Zulassung)$$,$$EU-VO-7$$,$$Crowdfunding max. 5 Mio. €/Projekt (BaFin-Zulassung)$$,$$EU-VO 2020/1503$$,$$https://eur-lex.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,21,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EU-VO-7$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Verbraucherkredit Sachkundeprüfung (§34c GewO-Reform 2025)$$,$$GewO$$,$$Verbraucherkredit Sachkundeprüfung (§34c GewO-Reform 2025)$$,$$GewO §34c n.F.; VKrRL 2023$$,$$https://gesetze-im-internet.de/gewo$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,21,2
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$GewO$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Energiesparende Produkte Ökodesign (gestaffelt ab 2026 je Produktgruppe)$$,$$EU-VO-8$$,$$Energiesparende Produkte Ökodesign (gestaffelt ab 2026 je Produktgruppe)$$,$$EU-VO 2024/1781$$,$$https://eur-lex.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,25,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EU-VO-8$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Wohnimmobilienrecht Energieausweis Pflicht (Neuvermietung, Verkauf)$$,$$GEG$$,$$Wohnimmobilienrecht Energieausweis Pflicht (Neuvermietung, Verkauf)$$,$$GEG §79$$,$$https://gesetze-im-internet.de/geg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,22,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$GEG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Fahrtenbuch KFZ-Steuer (Nachweis Privatnutzung Firmenwagen)$$,$$KfzStG$$,$$Fahrtenbuch KFZ-Steuer (Nachweis Privatnutzung Firmenwagen)$$,$$KfzStG; EStG §6$$,$$https://gesetze-im-internet.de/estg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$KfzStG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Vorsteuerabzug Voraussetzungen (ordnungsgemäße Rechnung)$$,$$UStG-6$$,$$Vorsteuerabzug Voraussetzungen (ordnungsgemäße Rechnung)$$,$$UStG §15$$,$$https://gesetze-im-internet.de/ustg_1980$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$UStG-6$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Erbschaftsteuer Betriebsvermögen (Behaltensfrist 7 J., Lohnsummenregel)$$,$$ErbStG$$,$$Erbschaftsteuer Betriebsvermögen (Behaltensfrist 7 J., Lohnsummenregel)$$,$$ErbStG §§13a-13c$$,$$https://gesetze-im-internet.de/erbstg_1974$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$ErbStG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Anpassung Betriebsrenten (alle 3 Jahre Prüfung)$$,$$BetrAVG$$,$$Anpassung Betriebsrenten (alle 3 Jahre Prüfung)$$,$$BetrAVG §16$$,$$https://gesetze-im-internet.de/betravg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,1,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$BetrAVG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Schichtarbeit Gesundheitsuntersuchung (Nacht-/Schichtarbeiter)$$,$$ArbZG-2$$,$$Schichtarbeit Gesundheitsuntersuchung (Nacht-/Schichtarbeiter)$$,$$ArbZG §6$$,$$https://gesetze-im-internet.de/arbzg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,3,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$ArbZG-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Nachtwächter / Alleinarbeit nachts (Sicherheitskonzept)$$,$$DGUV$$,$$Nachtwächter / Alleinarbeit nachts (Sicherheitskonzept)$$,$$DGUV Vorschrift 23$$,$$https://dguv.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,3,7
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$DGUV$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Betriebsstätten-Meldepflicht Finanzamt$$,$$AO-4$$,$$Betriebsstätten-Meldepflicht Finanzamt$$,$$AO §12$$,$$https://gesetze-im-internet.de/ao_1977$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$AO-4$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Post-Recht Briefgeheimnis (TK-Anbieter: Lizenz, Datenschutz)$$,$$PostG$$,$$Post-Recht Briefgeheimnis (TK-Anbieter: Lizenz, Datenschutz)$$,$$PostG §§1ff.$$,$$https://gesetze-im-internet.de/postg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,5,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$PostG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Bankgeheimnis (Auskunft nur bei gesetzlicher Pflicht)$$,$$KWG$$,$$Bankgeheimnis (Auskunft nur bei gesetzlicher Pflicht)$$,$$KWG §9$$,$$https://gesetze-im-internet.de/kredwg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,21,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$KWG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Frequenzzuteilung BNetzA (Nutzung von Frequenzen gebührenpflichtig)$$,$$TKG-2$$,$$Frequenzzuteilung BNetzA (Nutzung von Frequenzen gebührenpflichtig)$$,$$TKG §§54ff.$$,$$https://gesetze-im-internet.de/tkg_2021$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,22,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$TKG-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Handelsregister Anmeldepflicht (Kaufleute, GmbH, AG, OHG, KG)$$,$$HGB$$,$$Handelsregister Anmeldepflicht (Kaufleute, GmbH, AG, OHG, KG)$$,$$HGB §§29ff.$$,$$https://gesetze-im-internet.de/hgb$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,22,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$HGB$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$GmbH-Reform UG (Unternehmergesellschaft, 1 € Mindestkapital, Ansparrücklage)$$,$$GmbHG-2$$,$$GmbH-Reform UG (Unternehmergesellschaft, 1 € Mindestkapital, Ansparrücklage)$$,$$GmbHG §5a$$,$$https://gesetze-im-internet.de/gmbhg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,22,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$GmbHG-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Haftpflichtversicherung Berufsausübung (Pflichtversicherung bestimmter Berufe)$$,$$div$$,$$Haftpflichtversicherung Berufsausübung (Pflichtversicherung bestimmter Berufe)$$,$$div. Berufsgesetze$$,$$https://gesetze-im-internet.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,26,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$div$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Betriebsrentenrecht Portabilität (bei Arbeitgeberwechsel, 3-Jahres-Grenze)$$,$$BetrAVG-2$$,$$Betriebsrentenrecht Portabilität (bei Arbeitgeberwechsel, 3-Jahres-Grenze)$$,$$BetrAVG §4$$,$$https://gesetze-im-internet.de/betravg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,1,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$BetrAVG-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Datenspeicherung TKG (Verkehrsdaten 10 Wochen, Standortdaten 4 Wochen)$$,$$TKG-3$$,$$Datenspeicherung TKG (Verkehrsdaten 10 Wochen, Standortdaten 4 Wochen)$$,$$TKG §§170-174$$,$$https://gesetze-im-internet.de/tkg_2021$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,4,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$TKG-3$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Cloud-AVV Datenschutz (AVV, TOMs, Drittlandtransfer)$$,$$Art.28$$,$$Cloud-AVV Datenschutz (AVV, TOMs, Drittlandtransfer)$$,$$Art.28 DSGVO; TDDDG$$,$$https://eur-lex.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,4,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$Art.28$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Finanztransaktions-Meldepflicht (EMIR: OTC-Derivate an TR melden)$$,$$EMIR$$,$$Finanztransaktions-Meldepflicht (EMIR: OTC-Derivate an TR melden)$$,$$EMIR EU-VO 648/2012$$,$$https://eur-lex.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,21,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EMIR$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Nachhaltigkeitsbewertung Fondsprodukte (SFDR Art.8/9)$$,$$EU-VO-9$$,$$Nachhaltigkeitsbewertung Fondsprodukte (SFDR Art.8/9)$$,$$EU-VO 2019/2088 Art.8-9$$,$$https://eur-lex.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,21,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EU-VO-9$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Solvabilitätsanforderungen Versicherer (SCR, MCR-Prüfung)$$,$$VAG$$,$$Solvabilitätsanforderungen Versicherer (SCR, MCR-Prüfung)$$,$$VAG §§89ff.; Solvency II$$,$$https://gesetze-im-internet.de/vag_2016$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,21,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$VAG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Verbraucherschutz Finanzprodukte (PRIIPs-Verordnung, KID-Dokument)$$,$$EU-VO-10$$,$$Verbraucherschutz Finanzprodukte (PRIIPs-Verordnung, KID-Dokument)$$,$$EU-VO 1286/2014$$,$$https://eur-lex.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,21,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EU-VO-10$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Steuerliche Außenprüfung Duldungspflicht$$,$$AO-5$$,$$Steuerliche Außenprüfung Duldungspflicht$$,$$AO §200$$,$$https://gesetze-im-internet.de/ao_1977$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,5,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$AO-5$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Lieferkettentransparenz Rohstoffe (Konfliktmineralien-VO)$$,$$EU-VO-11$$,$$Lieferkettentransparenz Rohstoffe (Konfliktmineralien-VO)$$,$$EU-VO 2017/821$$,$$https://eur-lex.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,5,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EU-VO-11$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Patientenmobilität EU (Kostenerstattung Auslandsbehandlung)$$,$$EU-RL$$,$$Patientenmobilität EU (Kostenerstattung Auslandsbehandlung)$$,$$EU-RL 2011/24$$,$$https://eur-lex.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,17,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EU-RL$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Tierarzneimittelrecht (EU-TAMR, Antibiotikamonitoring)$$,$$EU-VO-12$$,$$Tierarzneimittelrecht (EU-TAMR, Antibiotikamonitoring)$$,$$EU-VO 2019/6$$,$$https://eur-lex.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,17,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EU-VO-12$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Medizinische Hilfsmittel GKV (Hilfsmittelverzeichnis, Qualitätssicherung)$$,$$SGB-V-3$$,$$Medizinische Hilfsmittel GKV (Hilfsmittelverzeichnis, Qualitätssicherung)$$,$$SGB V §§139ff.$$,$$https://gesetze-im-internet.de/sgb_5$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,17,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$SGB-V-3$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Landwirtschaft Nitratrichtlinie (Düngeobergrenzen, Ausbringungsverbote)$$,$$EU-RL-2$$,$$Landwirtschaft Nitratrichtlinie (Düngeobergrenzen, Ausbringungsverbote)$$,$$EU-RL 91/676; DüV$$,$$https://gesetze-im-internet.de/duev$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,24,2
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EU-RL-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Fischereikontrolle (Fangquoten, Logbuchpflicht)$$,$$EU-VO-13$$,$$Fischereikontrolle (Fangquoten, Logbuchpflicht)$$,$$EU-VO 1224/2009$$,$$https://eur-lex.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,24,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EU-VO-13$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Erneuerbare Energien Herkunftsnachweise$$,$$EEG-2$$,$$Erneuerbare Energien Herkunftsnachweise$$,$$EEG §79; HKNR$$,$$https://gesetze-im-internet.de/eeg_2023$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,20,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EEG-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Batteriepass Digitaler Produktpass (ab 2027 Pflicht für E-Auto-Batterien)$$,$$EU-VO-14$$,$$Batteriepass Digitaler Produktpass (ab 2027 Pflicht für E-Auto-Batterien)$$,$$EU-VO 2023/1542 Art.77$$,$$https://eur-lex.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,25,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EU-VO-14$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Sorgfaltspflichten Holzhandelsverordnung (EUTR → EUDR)$$,$$EU-VO-15$$,$$Sorgfaltspflichten Holzhandelsverordnung (EUTR → EUDR)$$,$$EU-VO 995/2010$$,$$https://eur-lex.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,7,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EU-VO-15$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Wettbewerb unlautere Handelspraktiken B2B (UTP-Richtlinie, Lebensmittellieferkette)$$,$$UTP-RL$$,$$Wettbewerb unlautere Handelspraktiken B2B (UTP-Richtlinie, Lebensmittellieferkette)$$,$$UTP-RL; AgrarOLkG$$,$$https://gesetze-im-internet.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,5,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$UTP-RL$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Sozialversicherung Entsendung Drittstaaten$$,$$SGB$$,$$Sozialversicherung Entsendung Drittstaaten$$,$$SGB IV; SVBG$$,$$https://bundesfinanzministerium.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,19,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$SGB$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Prozesskostenhilfe Unternehmen (PKH-Antrag für Verfahren)$$,$$ZPO$$,$$Prozesskostenhilfe Unternehmen (PKH-Antrag für Verfahren)$$,$$ZPO §§114ff.$$,$$https://gesetze-im-internet.de/zpo$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,5,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$ZPO$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Telearbeit Arbeitsstättenrecht international (Grenzgänger: Sozialrecht/Steuerrecht)$$,$$SGB-2$$,$$Telearbeit Arbeitsstättenrecht international (Grenzgänger: Sozialrecht/Steuerrecht)$$,$$SGB IV; EStG; DSGVO$$,$$https://gesetze-im-internet.de/sgb_4$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,1,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$SGB-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Beschäftigungsförderung (Eingliederungszuschuss, Arbeitgeber-Antrag)$$,$$SGB-III-2$$,$$Beschäftigungsförderung (Eingliederungszuschuss, Arbeitgeber-Antrag)$$,$$SGB III §§88ff.$$,$$https://gesetze-im-internet.de/sgb_3$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,19,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$SGB-III-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Kurzarbeit Weiterbildungsförderung (WBG während KUG)$$,$$SGB-III-3$$,$$Kurzarbeit Weiterbildungsförderung (WBG während KUG)$$,$$SGB III §82$$,$$https://gesetze-im-internet.de/sgb_3$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,19,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$SGB-III-3$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Arbeitslosengeld I Beitragszeiten Nachweispflicht$$,$$SGB-III-4$$,$$Arbeitslosengeld I Beitragszeiten Nachweispflicht$$,$$SGB III §§137ff.$$,$$https://gesetze-im-internet.de/sgb_3$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,19,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$SGB-III-4$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Aktienrecht Hauptversammlung (Einberufung, Anfechtung, Präsenz/virtuell)$$,$$AktG-3$$,$$Aktienrecht Hauptversammlung (Einberufung, Anfechtung, Präsenz/virtuell)$$,$$AktG §§118ff.$$,$$https://gesetze-im-internet.de/aktg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,22,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$AktG-3$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$GmbH-Gesellschafterversammlung (Einberufung, Ladungsfrist, Mehrheiten)$$,$$GmbHG-3$$,$$GmbH-Gesellschafterversammlung (Einberufung, Ladungsfrist, Mehrheiten)$$,$$GmbHG §§47ff.$$,$$https://gesetze-im-internet.de/gmbhg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,22,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$GmbHG-3$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Wertpapierhandel Aufzeichnungspflichten$$,$$WpHG-3$$,$$Wertpapierhandel Aufzeichnungspflichten$$,$$WpHG §§83ff.$$,$$https://gesetze-im-internet.de/wphg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,21,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$WpHG-3$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Tarifvertragsgesetz (Bindung Mitglieder; Allgemeinverbindlicherklärung)$$,$$TVG$$,$$Tarifvertragsgesetz (Bindung Mitglieder; Allgemeinverbindlicherklärung)$$,$$TVG §§1ff.$$,$$https://gesetze-im-internet.de/tvg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,1,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$TVG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Heimarbeitsgesetz Mindestentgelt (Ausschüsse, Festsetzung)$$,$$HAG$$,$$Heimarbeitsgesetz Mindestentgelt (Ausschüsse, Festsetzung)$$,$$HAG §§17ff.$$,$$https://gesetze-im-internet.de/hag$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,1,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$HAG$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Berufsgenossenschaft Unfallmeldung (Anzeige ab 3 Ausfalltagen)$$,$$SGB-VII-2$$,$$Berufsgenossenschaft Unfallmeldung (Anzeige ab 3 Ausfalltagen)$$,$$SGB VII §193$$,$$https://dguv.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,19,7
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$SGB-VII-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Arbeitnehmer-Beteiligung Aktien (Steuerfreiheit bis 2.000 €, §19a EStG)$$,$$EStG-9$$,$$Arbeitnehmer-Beteiligung Aktien (Steuerfreiheit bis 2.000 €, §19a EStG)$$,$$EStG §19a$$,$$https://gesetze-im-internet.de/estg$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EStG-9$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$ESRS-Standards Nachhaltigkeitsberichterstattung$$,$$ESRS$$,$$ESRS-Standards Nachhaltigkeitsberichterstattung$$,$$ESRS (EFRAG)$$,$$https://efrag.eu$$,250,NULL,TRUE,TRUE,TRUE,TRUE,7,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$ESRS$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Unternehmensregister Pflichtveröffentlichungen (Jahresabschluss, Satzungen)$$,$$HGB-2$$,$$Unternehmensregister Pflichtveröffentlichungen (Jahresabschluss, Satzungen)$$,$$HGB §§325, 8b; URV$$,$$https://unternehmensregister.de$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,6,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$HGB-2$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Datengovernance-Verordnung DGA (Datenvermittlungsdienste)$$,$$EU-VO-16$$,$$Datengovernance-Verordnung DGA (Datenvermittlungsdienste)$$,$$EU-VO 2022/868$$,$$https://eur-lex.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,9,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EU-VO-16$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$EU-Datengesetz Data Act (Datenzugang, -portabilität, Cloud-Wechsel)$$,$$EU-VO-17$$,$$EU-Datengesetz Data Act (Datenzugang, -portabilität, Cloud-Wechsel)$$,$$EU-VO 2023/2854$$,$$https://eur-lex.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,9,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EU-VO-17$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Nanotechnologie REACH-Meldung (Nanoform-Registrierung)$$,$$REACH$$,$$Nanotechnologie REACH-Meldung (Nanoform-Registrierung)$$,$$REACH Anhang VI; NanoVO$$,$$https://echa.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,8,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$REACH$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Produktkennzeichnung Herkunft (QR-Code Pflicht Wein/Spirituosen 2024)$$,$$EU-VO-18$$,$$Produktkennzeichnung Herkunft (QR-Code Pflicht Wein/Spirituosen 2024)$$,$$EU-VO 2021/2117$$,$$https://eur-lex.europa.eu$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,18,1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$EU-VO-18$$);
INSERT INTO regulierung.regulierung (name,kurzname,beschreibung,rechtsgrundlage,externe_url,mitarbeiter_min,mitarbeiter_max,aktiv,gilt_fuer_alle_rechtsformen,gilt_fuer_alle_branchen,gilt_fuer_alle_bundeslaender,kategorie_id,rechtsebene_id)
SELECT $$Pflanzenschutzmittel Anwendungsprotokoll (digitale Aufzeichnung)$$,$$PflSchG$$,$$Pflanzenschutzmittel Anwendungsprotokoll (digitale Aufzeichnung)$$,$$PflSchG §67$$,$$https://gesetze-im-internet.de/pflschg_2012$$,NULL,NULL,TRUE,TRUE,TRUE,TRUE,24,3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname=$$PflSchG$$);

COMMIT;
SELECT COUNT(*) AS total FROM regulierung.regulierung;