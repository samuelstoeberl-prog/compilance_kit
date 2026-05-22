-- Extended regulations seed
-- Run: PGPASSWORD=ck_password psql -U ck_user -d compliancekit -h localhost < this_file.sql

BEGIN;

-- New categories
INSERT INTO regulierung.kategorie (id, name) VALUES (19, $$Sozialversicherung$$) ON CONFLICT (id) DO NOTHING;
INSERT INTO regulierung.kategorie (id, name) VALUES (20, $$Energie$$) ON CONFLICT (id) DO NOTHING;
INSERT INTO regulierung.kategorie (id, name) VALUES (21, $$Finanzmarkt$$) ON CONFLICT (id) DO NOTHING;
INSERT INTO regulierung.kategorie (id, name) VALUES (22, $$Gewerberecht / Gesellschaftsrecht$$) ON CONFLICT (id) DO NOTHING;
INSERT INTO regulierung.kategorie (id, name) VALUES (23, $$Transport / Logistik$$) ON CONFLICT (id) DO NOTHING;
INSERT INTO regulierung.kategorie (id, name) VALUES (24, $$Landwirtschaft$$) ON CONFLICT (id) DO NOTHING;
INSERT INTO regulierung.kategorie (id, name) VALUES (25, $$Produktrecht / CE$$) ON CONFLICT (id) DO NOTHING;
INSERT INTO regulierung.kategorie (id, name) VALUES (26, $$Berufsrecht / Zulassungen$$) ON CONFLICT (id) DO NOTHING;

-- Regulations
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Kündigungsschutz$$, $$KSchG$$, $$Kündigungsschutz$$, $$KSchG §23$$, $$https://gesetze-im-internet.de/kschg$$, 11, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$KSchG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Gesetzlicher Mindestlohn$$, $$MiLoG$$, $$Gesetzlicher Mindestlohn$$, $$MiLoG §1$$, $$https://gesetze-im-internet.de/milog$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$MiLoG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Arbeitszeitgesetz (max. 8h/Tag, 11h Ruhezeit)$$, $$ArbZG$$, $$Arbeitszeitgesetz (max. 8h/Tag, 11h Ruhezeit)$$, $$ArbZG §§1ff.$$, $$https://gesetze-im-internet.de/arbzg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$ArbZG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Sonn- und Feiertagsschutz$$, $$ArbZG-2$$, $$Sonn- und Feiertagsschutz$$, $$ArbZG §§9-13$$, $$https://gesetze-im-internet.de/arbzg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$ArbZG-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Bundesurlaubsgesetz (min. 24 Werktage)$$, $$BUrlG$$, $$Bundesurlaubsgesetz (min. 24 Werktage)$$, $$BUrlG §§1ff.$$, $$https://gesetze-im-internet.de/burlg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BUrlG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Entgeltfortzahlung im Krankheitsfall (6 Wochen)$$, $$EFZG$$, $$Entgeltfortzahlung im Krankheitsfall (6 Wochen)$$, $$EFZG §§1-7$$, $$https://gesetze-im-internet.de/entgfg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EFZG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Nachweisgesetz (Arbeitsbedingungen schriftlich)$$, $$NachwG$$, $$Nachweisgesetz (Arbeitsbedingungen schriftlich)$$, $$NachwG$$, $$https://gesetze-im-internet.de/nachweisgesetz$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$NachwG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Allgemeines Gleichbehandlungsgesetz$$, $$AGG$$, $$Allgemeines Gleichbehandlungsgesetz$$, $$AGG §§1ff.$$, $$https://gesetze-im-internet.de/agg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$AGG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Teilzeit- und Befristungsgesetz (Teilzeitanspruch)$$, $$TzBfG$$, $$Teilzeit- und Befristungsgesetz (Teilzeitanspruch)$$, $$TzBfG §8$$, $$https://gesetze-im-internet.de/tzbfg$$, 16, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$TzBfG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Brückenteilzeit (1–5 Jahre befristet)$$, $$TzBfG-2$$, $$Brückenteilzeit (1–5 Jahre befristet)$$, $$TzBfG §9a$$, $$https://gesetze-im-internet.de/tzbfg$$, 46, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$TzBfG-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Mutterschutzgesetz (Beschäftigungsverbote, Kündigungsschutz)$$, $$MuSchG$$, $$Mutterschutzgesetz (Beschäftigungsverbote, Kündigungsschutz)$$, $$MuSchG §§1ff.$$, $$https://gesetze-im-internet.de/muschg_2018$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$MuSchG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Elternzeit$$, $$BEEG$$, $$Elternzeit$$, $$BEEG §15$$, $$https://gesetze-im-internet.de/beeg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BEEG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Pflegezeit (bis 6 Monate)$$, $$PflegeZG$$, $$Pflegezeit (bis 6 Monate)$$, $$PflegeZG$$, $$https://gesetze-im-internet.de/pflegezg$$, 16, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$PflegeZG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Familienpflegezeit (bis 24 Monate)$$, $$FPfZG$$, $$Familienpflegezeit (bis 24 Monate)$$, $$FPfZG §2$$, $$https://gesetze-im-internet.de/fpfzg$$, 26, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$FPfZG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Jugendarbeitsschutzgesetz$$, $$JArbSchG$$, $$Jugendarbeitsschutzgesetz$$, $$JArbSchG §§1ff.$$, $$https://gesetze-im-internet.de/jarbschg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$JArbSchG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Arbeitnehmerüberlassungsgesetz (Erlaubnispflicht, max. 18 Monate, Equal Pay ab 9 Monate)$$, $$AÜG$$, $$Arbeitnehmerüberlassungsgesetz (Erlaubnispflicht, max. 18 Monate, Equal Pay ab 9 Monate)$$, $$AÜG §§1ff.$$, $$https://gesetze-im-internet.de/aueeg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$AÜG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Arbeitnehmer-Entsendegesetz (Branchenmindestlöhne)$$, $$AEntG$$, $$Arbeitnehmer-Entsendegesetz (Branchenmindestlöhne)$$, $$AEntG §§1ff.$$, $$https://gesetze-im-internet.de/aentg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$AEntG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Berufsausbildungsgesetz (Mindestausbildungsvergütung)$$, $$BBiG$$, $$Berufsausbildungsgesetz (Mindestausbildungsvergütung)$$, $$BBiG §§1ff.$$, $$https://gesetze-im-internet.de/bbig_2005$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BBiG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Entgelttransparenzgesetz (Auskunftsrecht ab 100 MA, Bericht ab 200 MA)$$, $$EntgTranspG$$, $$Entgelttransparenzgesetz (Auskunftsrecht ab 100 MA, Bericht ab 200 MA)$$, $$EntgTranspG §§10ff.$$, $$https://gesetze-im-internet.de/entgtranspg$$, 100, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EntgTranspG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Betriebsübergang Unterrichtungspflicht$$, $$BGB$$, $$Betriebsübergang Unterrichtungspflicht$$, $$BGB §613a$$, $$https://gesetze-im-internet.de/bgb$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BGB$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Massenentlassungsanzeige bei BA$$, $$KSchG-2$$, $$Massenentlassungsanzeige bei BA$$, $$KSchG §§17-22$$, $$https://gesetze-im-internet.de/kschg$$, 21, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$KSchG-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Betriebliche Altersversorgung (Unverfallbarkeit, PSV)$$, $$BetrAVG$$, $$Betriebliche Altersversorgung (Unverfallbarkeit, PSV)$$, $$BetrAVG §§1ff.$$, $$https://gesetze-im-internet.de/betravg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BetrAVG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Schwerbehindertenquote 5% (Ausgleichsabgabe 140–720 €/Monat)$$, $$SGB-IX$$, $$Schwerbehindertenquote 5% (Ausgleichsabgabe 140–720 €/Monat)$$, $$SGB IX §§154, 160$$, $$https://gesetze-im-internet.de/sgb_9_2018$$, 20, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$SGB-IX$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Schwerbehinderung Kündigungsschutz (Zustimmung Integrationsamt)$$, $$SGB-IX-2$$, $$Schwerbehinderung Kündigungsschutz (Zustimmung Integrationsamt)$$, $$SGB IX §§168-175$$, $$https://gesetze-im-internet.de/sgb_9_2018$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$SGB-IX-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Betriebliches Eingliederungsmanagement BEM$$, $$SGB-IX-3$$, $$Betriebliches Eingliederungsmanagement BEM$$, $$SGB IX §167 Abs.2$$, $$$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$SGB-IX-3$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Heimarbeitsgesetz$$, $$HAG$$, $$Heimarbeitsgesetz$$, $$HAG §§1ff.$$, $$https://gesetze-im-internet.de/hag$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$HAG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Arbeitnehmererfindungsgesetz (Vergütungspflicht)$$, $$ArbNErfG$$, $$Arbeitnehmererfindungsgesetz (Vergütungspflicht)$$, $$ArbNErfG §§1ff.$$, $$https://gesetze-im-internet.de/arbnerfg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$ArbNErfG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Lohnpfändung (Abführungspflicht)$$, $$ZPO$$, $$Lohnpfändung (Abführungspflicht)$$, $$ZPO §850$$, $$https://gesetze-im-internet.de/zpo$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$ZPO$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Arbeitszeugnis (einfach/qualifiziert)$$, $$GewO$$, $$Arbeitszeugnis (einfach/qualifiziert)$$, $$GewO §109$$, $$https://gesetze-im-internet.de/gewo$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GewO$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Digitaler Arbeitsvertrag (BEG IV, seit 2025)$$, $$NachwG-2$$, $$Digitaler Arbeitsvertrag (BEG IV, seit 2025)$$, $$NachwG §2$$, $$https://gesetze-im-internet.de/nachweisgesetz$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$NachwG-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Saisonarbeit aus Drittstaaten (max. 8 Monate)$$, $$BeschV$$, $$Saisonarbeit aus Drittstaaten (max. 8 Monate)$$, $$BeschV §15a$$, $$https://gesetze-im-internet.de/beschv_2013$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BeschV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Lohnpfändungsschutz Nettolohn$$, $$ZPO-2$$, $$Lohnpfändungsschutz Nettolohn$$, $$ZPO §850c$$, $$https://gesetze-im-internet.de/zpo$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 1, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$ZPO-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Betriebsrat (Wahlrecht ab 5 AN)$$, $$BetrVG$$, $$Betriebsrat (Wahlrecht ab 5 AN)$$, $$BetrVG §1$$, $$https://gesetze-im-internet.de/betrvg$$, 5, NULL, TRUE, TRUE, TRUE, TRUE, 2, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BetrVG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Betriebsrat Freistellung (ab 200 MA gestaffelt)$$, $$BetrVG-2$$, $$Betriebsrat Freistellung (ab 200 MA gestaffelt)$$, $$BetrVG §38$$, $$https://gesetze-im-internet.de/betrvg$$, 200, NULL, TRUE, TRUE, TRUE, TRUE, 2, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BetrVG-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Sozialplan und Interessenausgleich$$, $$BetrVG-3$$, $$Sozialplan und Interessenausgleich$$, $$BetrVG §§111-113$$, $$https://gesetze-im-internet.de/betrvg$$, 21, NULL, TRUE, TRUE, TRUE, TRUE, 2, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BetrVG-3$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Drittelbeteiligung Aufsichtsrat$$, $$DrittelbG$$, $$Drittelbeteiligung Aufsichtsrat$$, $$DrittelbG §1$$, $$https://gesetze-im-internet.de/drittelbg$$, 500, NULL, TRUE, TRUE, TRUE, TRUE, 2, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$DrittelbG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Paritätische Mitbestimmung Aufsichtsrat$$, $$MitbestG$$, $$Paritätische Mitbestimmung Aufsichtsrat$$, $$MitbestG §1$$, $$https://gesetze-im-internet.de/mitbestg$$, 2001, NULL, TRUE, TRUE, TRUE, TRUE, 2, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$MitbestG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Europäischer Betriebsrat$$, $$EBRG$$, $$Europäischer Betriebsrat$$, $$EBRG §§1ff.$$, $$https://gesetze-im-internet.de/ebrg$$, 1000, NULL, TRUE, TRUE, TRUE, TRUE, 2, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EBRG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$SE-Arbeitnehmerbeteiligung$$, $$SEBG$$, $$SE-Arbeitnehmerbeteiligung$$, $$SEBG §§1ff.$$, $$https://gesetze-im-internet.de/sebg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 2, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$SEBG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Schwerbehindertenvertretung$$, $$SGB-IX-4$$, $$Schwerbehindertenvertretung$$, $$SGB IX §§177ff.$$, $$https://gesetze-im-internet.de/sgb_9_2018$$, 5, NULL, TRUE, TRUE, TRUE, TRUE, 2, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$SGB-IX-4$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Gefährdungsbeurteilung aller Arbeitsplätze (inkl. psychische Belastung)$$, $$ArbSchG$$, $$Gefährdungsbeurteilung aller Arbeitsplätze (inkl. psychische Belastung)$$, $$ArbSchG §§5-6$$, $$https://gesetze-im-internet.de/arbschg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 3, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$ArbSchG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Betriebsärzte und SIFA bestellen$$, $$ASiG$$, $$Betriebsärzte und SIFA bestellen$$, $$ASiG §§1ff.$$, $$https://gesetze-im-internet.de/asig$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 3, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$ASiG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Sicherheitsbeauftragter$$, $$SGB-VII$$, $$Sicherheitsbeauftragter$$, $$SGB VII §22$$, $$https://gesetze-im-internet.de/sgb_7$$, 21, NULL, TRUE, TRUE, TRUE, TRUE, 3, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$SGB-VII$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Arbeitsstättenverordnung (Beleuchtung, Lüftung, Temperatur, WCs)$$, $$ArbStättV$$, $$Arbeitsstättenverordnung (Beleuchtung, Lüftung, Temperatur, WCs)$$, $$ArbStättV$$, $$https://gesetze-im-internet.de/arbstaettv_2004$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 3, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$ArbStättV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Betriebssicherheitsverordnung (Arbeitsmittel, Druckbehälter, Aufzüge)$$, $$BetrSichV$$, $$Betriebssicherheitsverordnung (Arbeitsmittel, Druckbehälter, Aufzüge)$$, $$BetrSichV$$, $$https://gesetze-im-internet.de/betrsichv$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 3, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BetrSichV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Biostoffverordnung (Viren, Bakterien, Pilze am Arbeitsplatz)$$, $$BioStoffV$$, $$Biostoffverordnung (Viren, Bakterien, Pilze am Arbeitsplatz)$$, $$BioStoffV$$, $$https://gesetze-im-internet.de/biostoffv$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 3, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BioStoffV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Lärm- und Vibrations-Arbeitsschutzverordnung$$, $$LärmVibrationsArbSchV$$, $$Lärm- und Vibrations-Arbeitsschutzverordnung$$, $$LärmVibrationsArbSchV$$, $$https://gesetze-im-internet.de/laermvibrations-arbschv$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 3, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$LärmVibrationsArbSchV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$PSA-Benutzungsverordnung (kostenlose Bereitstellung)$$, $$PSA-BV$$, $$PSA-Benutzungsverordnung (kostenlose Bereitstellung)$$, $$PSA-BV$$, $$https://gesetze-im-internet.de/psa-bv$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 3, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$PSA-BV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Baustellenverordnung (SiGeKo, Sicherheitsplan)$$, $$BaustellV$$, $$Baustellenverordnung (SiGeKo, Sicherheitsplan)$$, $$BaustellV$$, $$https://gesetze-im-internet.de/baustellv$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 3, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BaustellV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Ersthelfer-Pflicht (mind. 5% der MA)$$, $$DGUV$$, $$Ersthelfer-Pflicht (mind. 5% der MA)$$, $$DGUV Vorschrift 1$$, $$https://dguv.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 3, 7
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$DGUV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Bildschirmarbeitsplatz (Blendschutz, Sehtest, Ergonomie)$$, $$ArbStättV-2$$, $$Bildschirmarbeitsplatz (Blendschutz, Sehtest, Ergonomie)$$, $$ArbStättV ASR A6$$, $$https://gesetze-im-internet.de/arbstaettv_2004$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 3, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$ArbStättV-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Arbeitsmedizinische Pflichtuntersuchungen (Lärm, Gefahrstoffe, Nacht)$$, $$ArbMedVV$$, $$Arbeitsmedizinische Pflichtuntersuchungen (Lärm, Gefahrstoffe, Nacht)$$, $$ArbMedVV §§3-5$$, $$https://gesetze-im-internet.de/arbmedvv$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 3, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$ArbMedVV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Strahlenschutzgesetz (Genehmigung + Strahlenschutzbeauftragter)$$, $$StrlSchG$$, $$Strahlenschutzgesetz (Genehmigung + Strahlenschutzbeauftragter)$$, $$StrlSchG §§1ff.$$, $$https://gesetze-im-internet.de/strlschg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 3, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$StrlSchG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$ATEX Explosionsschutz (Zoneneinteilung, Ex-Dokument)$$, $$GefStoffV$$, $$ATEX Explosionsschutz (Zoneneinteilung, Ex-Dokument)$$, $$GefStoffV §15; ATEX 2014/34/EU$$, $$https://gesetze-im-internet.de/gefstoffv$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 3, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GefStoffV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Mutterschutz Gefährdungsbeurteilung$$, $$MuSchG-2$$, $$Mutterschutz Gefährdungsbeurteilung$$, $$MuSchG §10$$, $$https://gesetze-im-internet.de/muschg_2018$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 3, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$MuSchG-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$SV-Meldepflicht und Beitragsabführung (GKV/RV/AV/PV)$$, $$SGB-IV$$, $$SV-Meldepflicht und Beitragsabführung (GKV/RV/AV/PV)$$, $$SGB IV §§28a ff.$$, $$https://gesetze-im-internet.de/sgb_4$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 19, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$SGB-IV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Künstlersozialkasse (5% Abgabe auf Honorare)$$, $$KSVG$$, $$Künstlersozialkasse (5% Abgabe auf Honorare)$$, $$KSVG §§1ff.$$, $$https://ksvg.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 19, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$KSVG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Minijob Pauschalbeiträge 30%$$, $$SGB-IV-2$$, $$Minijob Pauschalbeiträge 30%$$, $$SGB IV §8$$, $$https://minijob-zentrale.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 19, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$SGB-IV-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Midijob Übergangsbereich (603–2.000 €)$$, $$SGB-IV-3$$, $$Midijob Übergangsbereich (603–2.000 €)$$, $$SGB IV §20 Abs.2$$, $$https://gesetze-im-internet.de/sgb_4$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 19, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$SGB-IV-3$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$BG-Anmeldung und Jahresnachweis Lohnsummen$$, $$SGB-VII-2$$, $$BG-Anmeldung und Jahresnachweis Lohnsummen$$, $$SGB VII §§183, 165$$, $$https://dguv.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 19, 7
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$SGB-VII-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Insolvenzgeldumlage (0,06% Bruttoentgelt)$$, $$SGB-III$$, $$Insolvenzgeldumlage (0,06% Bruttoentgelt)$$, $$SGB III §358$$, $$https://gesetze-im-internet.de/sgb_3$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 19, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$SGB-III$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$PSV-Pflichtmitgliedschaft (Direktzusagen, U-Kassen)$$, $$BetrAVG-2$$, $$PSV-Pflichtmitgliedschaft (Direktzusagen, U-Kassen)$$, $$BetrAVG §14$$, $$https://psvag.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 19, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BetrAVG-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$DEÜV-Meldeverfahren (Jahresmeldung bis 15.2.)$$, $$DEÜV$$, $$DEÜV-Meldeverfahren (Jahresmeldung bis 15.2.)$$, $$DEÜV$$, $$https://gesetze-im-internet.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 19, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$DEÜV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Entsendung A1-Bescheinigung (vor Entsendung)$$, $$SGB-IV-4$$, $$Entsendung A1-Bescheinigung (vor Entsendung)$$, $$SGB IV §4; VO 883/2004$$, $$https://gesetze-im-internet.de/sgb_4$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 19, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$SGB-IV-4$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$SOKA-BAU (Urlaub, Rentenbeihilfe, Bildung im Bau)$$, $$BRTV$$, $$SOKA-BAU (Urlaub, Rentenbeihilfe, Bildung im Bau)$$, $$BRTV Bau; SoKaSiG$$, $$https://soka-bau.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 19, 4
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BRTV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Kurzarbeitergeld Anzeige bei BA$$, $$SGB-III-2$$, $$Kurzarbeitergeld Anzeige bei BA$$, $$SGB III §95$$, $$https://gesetze-im-internet.de/sgb_3$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 19, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$SGB-III-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Sozialversicherung Praktikanten (ab 3 Monate: SV-pflichtig)$$, $$SGB-IV-5$$, $$Sozialversicherung Praktikanten (ab 3 Monate: SV-pflichtig)$$, $$SGB IV §7$$, $$https://gesetze-im-internet.de/sgb_4$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 19, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$SGB-IV-5$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Buchführungspflicht (Kaufleute, Bilanzierung)$$, $$HGB$$, $$Buchführungspflicht (Kaufleute, Bilanzierung)$$, $$HGB §§238, 241a$$, $$https://gesetze-im-internet.de/hgb$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 6, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$HGB$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Jahresabschluss Offenlegung im Unternehmensregister$$, $$HGB-2$$, $$Jahresabschluss Offenlegung im Unternehmensregister$$, $$HGB §325$$, $$https://gesetze-im-internet.de/hgb$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 6, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$HGB-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Pflichtprüfung durch Wirtschaftsprüfer$$, $$HGB-3$$, $$Pflichtprüfung durch Wirtschaftsprüfer$$, $$HGB §316$$, $$https://gesetze-im-internet.de/hgb$$, 51, NULL, TRUE, TRUE, TRUE, TRUE, 6, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$HGB-3$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$E-Rechnungspflicht B2B (Empfang ab 2025, Versand gestaffelt bis 2028)$$, $$UStG$$, $$E-Rechnungspflicht B2B (Empfang ab 2025, Versand gestaffelt bis 2028)$$, $$UStG §14$$, $$https://bundesfinanzministerium.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 6, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$UStG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Umsatzsteuervoranmeldung (monatlich/quartalsweise, ELSTER)$$, $$UStG-2$$, $$Umsatzsteuervoranmeldung (monatlich/quartalsweise, ELSTER)$$, $$UStG §18$$, $$https://gesetze-im-internet.de/ustg_1980$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 6, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$UStG-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Lohnsteueranmeldung (ELSTER, AG haftet)$$, $$EStG$$, $$Lohnsteueranmeldung (ELSTER, AG haftet)$$, $$EStG §41a$$, $$https://gesetze-im-internet.de/estg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 6, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EStG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Aufbewahrungspflichten (10 J. Buchungsbelege, 6 J. sonstige)$$, $$AO$$, $$Aufbewahrungspflichten (10 J. Buchungsbelege, 6 J. sonstige)$$, $$AO §147; HGB §257$$, $$https://gesetze-im-internet.de/ao_1977$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 6, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$AO$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$GoBD (Unveränderbarkeit digitaler Buchführung)$$, $$GoBD$$, $$GoBD (Unveränderbarkeit digitaler Buchführung)$$, $$GoBD BMF-Schreiben 2020$$, $$https://bundesfinanzministerium.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 6, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GoBD$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Kassensicherungsverordnung TSE (ELSTER-Meldung, Belegpflicht)$$, $$AO-2$$, $$Kassensicherungsverordnung TSE (ELSTER-Meldung, Belegpflicht)$$, $$AO §146a; KassenSichV$$, $$https://gesetze-im-internet.de/ao_1977$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 6, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$AO-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Gewerbesteuer (Erklärung, Vorauszahlungen)$$, $$GewStG$$, $$Gewerbesteuer (Erklärung, Vorauszahlungen)$$, $$GewStG §§1ff.$$, $$https://gesetze-im-internet.de/gewstg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 6, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GewStG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Körperschaftsteuer 15% + Soli$$, $$KStG$$, $$Körperschaftsteuer 15% + Soli$$, $$KStG §§1ff.$$, $$https://gesetze-im-internet.de/kstg_1977$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 6, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$KStG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Verrechnungspreisdokumentation$$, $$AO-3$$, $$Verrechnungspreisdokumentation$$, $$AO §90 Abs.3; GAufzV$$, $$https://gesetze-im-internet.de/ao_1977$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 6, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$AO-3$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Globale Mindeststeuer Pillar 2 (15%)$$, $$MinStG$$, $$Globale Mindeststeuer Pillar 2 (15%)$$, $$MinStG 2024$$, $$https://bundesfinanzministerium.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 6, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$MinStG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$CbCR Ertragsteuer-Informationsbericht$$, $$HGB-4$$, $$CbCR Ertragsteuer-Informationsbericht$$, $$HGB §§342b-342k$$, $$https://gesetze-im-internet.de/hgb$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 6, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$HGB-4$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$DAC7 Plattformmeldepflicht$$, $$PStTG$$, $$DAC7 Plattformmeldepflicht$$, $$PStTG; EU-RL 2021/514$$, $$https://gesetze-im-internet.de/psttg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 6, 2
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$PStTG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Zollanmeldung Einfuhr/Ausfuhr (EORI-Nummer)$$, $$UZK$$, $$Zollanmeldung Einfuhr/Ausfuhr (EORI-Nummer)$$, $$UZK EU-VO 952/2013$$, $$https://zoll.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 6, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$UZK$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Kleinunternehmerregelung USt (bis 25.000 € Vorjahresumsatz)$$, $$UStG-3$$, $$Kleinunternehmerregelung USt (bis 25.000 € Vorjahresumsatz)$$, $$UStG §19$$, $$https://gesetze-im-internet.de/ustg_1980$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 6, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$UStG-3$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$OSS One-Stop-Shop (ausländische USt zentral in DE)$$, $$UStG-4$$, $$OSS One-Stop-Shop (ausländische USt zentral in DE)$$, $$UStG §18j$$, $$https://elster.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 6, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$UStG-4$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$ESt-Vorauszahlungen (15.3./15.6./15.9./15.12.)$$, $$EStG-2$$, $$ESt-Vorauszahlungen (15.3./15.6./15.9./15.12.)$$, $$EStG §37$$, $$https://gesetze-im-internet.de/estg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 6, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EStG-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$IFRS Konzernabschluss$$, $$EU-VO$$, $$IFRS Konzernabschluss$$, $$EU-VO 1606/2002$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 6, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Publizitätsgesetz (Offenlegung große Nicht-KapGes)$$, $$PublG$$, $$Publizitätsgesetz (Offenlegung große Nicht-KapGes)$$, $$PublG §§1ff.$$, $$https://gesetze-im-internet.de/publg$$, 5001, NULL, TRUE, TRUE, TRUE, TRUE, 6, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$PublG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Erbschaftsteuer Unternehmen (Verschonung 85%/100%, Behaltensfrist 7 J.)$$, $$ErbStG$$, $$Erbschaftsteuer Unternehmen (Verschonung 85%/100%, Behaltensfrist 7 J.)$$, $$ErbStG §§13a-13c$$, $$https://gesetze-im-internet.de/erbstg_1974$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 6, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$ErbStG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$DSGVO Grundsätze (rechtmäßige Verarbeitung, Datenschutzerklärung)$$, $$EU-VO-2$$, $$DSGVO Grundsätze (rechtmäßige Verarbeitung, Datenschutzerklärung)$$, $$EU-VO 2016/679$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 4, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Datenschutzbeauftragter DSB$$, $$BDSG$$, $$Datenschutzbeauftragter DSB$$, $$BDSG §38; Art.37 DSGVO$$, $$https://gesetze-im-internet.de/bdsg_2018$$, 20, NULL, TRUE, TRUE, TRUE, TRUE, 4, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BDSG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Auftragsverarbeitung AVV$$, $$Art.28$$, $$Auftragsverarbeitung AVV$$, $$Art.28 DSGVO$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 4, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$Art.28$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Datenpannenmeldung (72 Stunden an LfDI)$$, $$Art.33-34$$, $$Datenpannenmeldung (72 Stunden an LfDI)$$, $$Art.33-34 DSGVO$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 4, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$Art.33-34$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Datenschutz-Folgenabschätzung DSFA$$, $$Art.35$$, $$Datenschutz-Folgenabschätzung DSFA$$, $$Art.35 DSGVO$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 4, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$Art.35$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Cookie-Pflicht/Einwilligung$$, $$TTDSG$$, $$Cookie-Pflicht/Einwilligung$$, $$TTDSG §25$$, $$https://gesetze-im-internet.de/ttdsg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 4, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$TTDSG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Videoüberwachung (berechtigtes Interesse, Hinweispflicht)$$, $$BDSG-2$$, $$Videoüberwachung (berechtigtes Interesse, Hinweispflicht)$$, $$BDSG §4; Art.6 DSGVO$$, $$https://gesetze-im-internet.de/bdsg_2018$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 4, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BDSG-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Drittlandtransfer (SCCs, Angemessenheitsbeschluss)$$, $$Art.44-49$$, $$Drittlandtransfer (SCCs, Angemessenheitsbeschluss)$$, $$Art.44-49 DSGVO$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 4, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$Art.44-49$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$NIS-2 Cybersicherheit (18 kritische Sektoren, BSI-Meldung)$$, $$NIS-$$, $$NIS-2 Cybersicherheit (18 kritische Sektoren, BSI-Meldung)$$, $$NIS-2 RL 2022/2555$$, $$https://bsi.bund.de$$, 50, NULL, TRUE, TRUE, TRUE, TRUE, 9, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$NIS-$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Cyber Resilience Act CRA (vernetzte Produkte, Updates 5 J.)$$, $$EU-VO-3$$, $$Cyber Resilience Act CRA (vernetzte Produkte, Updates 5 J.)$$, $$EU-VO 2024/2847$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 9, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-3$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$DORA (Finanzsektor ICT-Risiko, Vorfallsmeldung)$$, $$EU-VO-4$$, $$DORA (Finanzsektor ICT-Risiko, Vorfallsmeldung)$$, $$EU-VO 2022/2554$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 9, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-4$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$KRITIS-DachG (physische Sicherheit kritischer Anlagen)$$, $$KRITIS-DachG$$, $$KRITIS-DachG (physische Sicherheit kritischer Anlagen)$$, $$KRITIS-DachG 2024$$, $$https://bbk.bund.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 9, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$KRITIS-DachG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$IT-Grundschutz BSI / ISMS (KRITIS, alle 2 J. Nachweis)$$, $$BSIG$$, $$IT-Grundschutz BSI / ISMS (KRITIS, alle 2 J. Nachweis)$$, $$BSIG §§1ff.$$, $$https://bsi.bund.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 9, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BSIG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$EU AI Act (Hochrisiko-KI, Verbote, Konformitätsbewertung)$$, $$EU-VO-5$$, $$EU AI Act (Hochrisiko-KI, Verbote, Konformitätsbewertung)$$, $$EU-VO 2024/1689$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 9, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-5$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Datenbankschutz Urheberrecht$$, $$UrhG$$, $$Datenbankschutz Urheberrecht$$, $$UrhG §§87a ff.$$, $$https://gesetze-im-internet.de/urhg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 9, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$UrhG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Software-Lizenzrecht (Nutzung nur im Lizenzrahmen)$$, $$UrhG-2$$, $$Software-Lizenzrecht (Nutzung nur im Lizenzrahmen)$$, $$UrhG §69a$$, $$https://gesetze-im-internet.de/urhg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 9, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$UrhG-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$EU Digital Services Act DSA (Meldestelle, Transparenz)$$, $$EU-VO-6$$, $$EU Digital Services Act DSA (Meldestelle, Transparenz)$$, $$EU-VO 2022/2065$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 11, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-6$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$EU Digital Markets Act DMA (Gatekeeper-Pflichten)$$, $$EU-VO-7$$, $$EU Digital Markets Act DMA (Gatekeeper-Pflichten)$$, $$EU-VO 2022/1925$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 11, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-7$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Barrierefreiheitsstärkungsgesetz BFSG$$, $$BFSG$$, $$Barrierefreiheitsstärkungsgesetz BFSG$$, $$BFSG$$, $$https://gesetze-im-internet.de/bfsg$$, 10, NULL, TRUE, TRUE, TRUE, TRUE, 11, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BFSG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Impressumspflicht (Name, Anschrift, Kontakt)$$, $$TMG$$, $$Impressumspflicht (Name, Anschrift, Kontakt)$$, $$TMG §5$$, $$https://gesetze-im-internet.de/tmg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 11, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$TMG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Netzwerkdurchsetzungsgesetz NetzDG$$, $$NetzDG$$, $$Netzwerkdurchsetzungsgesetz NetzDG$$, $$NetzDG §§1ff.$$, $$https://gesetze-im-internet.de/netzdg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 11, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$NetzDG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Preisangabenverordnung PAngV (Gesamtpreis inkl. MwSt)$$, $$PAngV$$, $$Preisangabenverordnung PAngV (Gesamtpreis inkl. MwSt)$$, $$PAngV$$, $$https://gesetze-im-internet.de/pangv$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 11, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$PAngV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Widerrufsrecht Online-Handel (14 Tage)$$, $$BGB-2$$, $$Widerrufsrecht Online-Handel (14 Tage)$$, $$BGB §§312 ff.$$, $$https://gesetze-im-internet.de/bgb$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 11, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BGB-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$AGB-Recht (Transparenz, keine unangemessene Benachteiligung)$$, $$BGB-3$$, $$AGB-Recht (Transparenz, keine unangemessene Benachteiligung)$$, $$BGB §§305-310$$, $$https://gesetze-im-internet.de/bgb$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 11, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BGB-3$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Produkthaftung (Haftung ohne Verschulden)$$, $$ProdHaftG$$, $$Produkthaftung (Haftung ohne Verschulden)$$, $$ProdHaftG; EU-RL 2024/2853$$, $$https://gesetze-im-internet.de/prodhaftg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 11, 2
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$ProdHaftG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Produktsicherheitsverordnung GPSR (CE, Safety-Gate-Meldung)$$, $$EU-VO-8$$, $$Produktsicherheitsverordnung GPSR (CE, Safety-Gate-Meldung)$$, $$EU-VO 2023/988$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 11, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-8$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Unlauterer Wettbewerb UWG (Werbung, Geschäftspraktiken)$$, $$UWG$$, $$Unlauterer Wettbewerb UWG (Werbung, Geschäftspraktiken)$$, $$UWG §§1ff.$$, $$https://gesetze-im-internet.de/uwg_2004$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 11, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$UWG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Greenwashing-Verbot (Nachweispflicht für Umweltaussagen, ab Sep. 2026)$$, $$EU-RL$$, $$Greenwashing-Verbot (Nachweispflicht für Umweltaussagen, ab Sep. 2026)$$, $$EU-RL 2024/825$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 11, 2
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-RL$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$E-Mail/Telefon-Werbung (Einwilligungspflicht)$$, $$UWG-2$$, $$E-Mail/Telefon-Werbung (Einwilligungspflicht)$$, $$UWG §7$$, $$https://gesetze-im-internet.de/uwg_2004$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 11, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$UWG-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Verbraucherstreitbeilegung (Hinweispflicht)$$, $$VSBG$$, $$Verbraucherstreitbeilegung (Hinweispflicht)$$, $$VSBG §§1ff.$$, $$https://gesetze-im-internet.de/vsbg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 11, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$VSBG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Kosmetikrecht (Sicherheitsbewertung, CPNP-Notifizierung)$$, $$EU-VO-9$$, $$Kosmetikrecht (Sicherheitsbewertung, CPNP-Notifizierung)$$, $$EU-VO 1223/2009$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 11, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-9$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Lieferkettensorgfaltspflichtengesetz LkSG$$, $$LkSG$$, $$Lieferkettensorgfaltspflichtengesetz LkSG$$, $$LkSG §§1ff.$$, $$https://gesetze-im-internet.de/lksg$$, 1000, NULL, TRUE, TRUE, TRUE, TRUE, 7, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$LkSG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$CSRD Nachhaltigkeitsbericht (ESRS-Standards)$$, $$EU-RL-2$$, $$CSRD Nachhaltigkeitsbericht (ESRS-Standards)$$, $$EU-RL 2022/2464$$, $$https://eur-lex.europa.eu$$, 250, NULL, TRUE, TRUE, TRUE, TRUE, 7, 2
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-RL-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$EU-Taxonomie Offenlegung (taxonomiekonforme Aktivitäten)$$, $$EU-VO-10$$, $$EU-Taxonomie Offenlegung (taxonomiekonforme Aktivitäten)$$, $$EU-VO 2020/852$$, $$https://eur-lex.europa.eu$$, 250, NULL, TRUE, TRUE, TRUE, TRUE, 7, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-10$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$SFDR Nachhaltigkeitsoffenlegung$$, $$EU-VO-11$$, $$SFDR Nachhaltigkeitsoffenlegung$$, $$EU-VO 2019/2088$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 7, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-11$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$EUDR Entwaldungsfreie Lieferkette$$, $$EU-VO-12$$, $$EUDR Entwaldungsfreie Lieferkette$$, $$EU-VO 2023/1115$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 7, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-12$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$EU-Emissionshandel ETS (CO2-Zertifikate, Verifizierung)$$, $$RL$$, $$EU-Emissionshandel ETS (CO2-Zertifikate, Verifizierung)$$, $$RL 2003/87/EG; TEHG$$, $$https://dehst.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$RL$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Nationales CO2-Preissystem BEHG (55 €/t 2025)$$, $$BEHG$$, $$Nationales CO2-Preissystem BEHG (55 €/t 2025)$$, $$BEHG$$, $$https://gesetze-im-internet.de/behg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BEHG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$CBAM Kohlenstoffgrenzausgleich (Stahl, Zement, ab 2026)$$, $$EU-VO-13$$, $$CBAM Kohlenstoffgrenzausgleich (Stahl, Zement, ab 2026)$$, $$EU-VO 2023/956$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-13$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Energieaudit alle 4 Jahre$$, $$EDL-G$$, $$Energieaudit alle 4 Jahre$$, $$EDL-G §8$$, $$https://bafa.de$$, 251, NULL, TRUE, TRUE, TRUE, TRUE, 8, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EDL-G$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Verpackungsgesetz (LUCID-Registrierung, Systembeteiligung)$$, $$VerpackG$$, $$Verpackungsgesetz (LUCID-Registrierung, Systembeteiligung)$$, $$VerpackG$$, $$https://verpackungsregister.org$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$VerpackG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Kreislaufwirtschaftsgesetz (Abfallvermeidung, Nachweise gef. Abfall)$$, $$KrWG$$, $$Kreislaufwirtschaftsgesetz (Abfallvermeidung, Nachweise gef. Abfall)$$, $$KrWG §§1ff.$$, $$https://gesetze-im-internet.de/krwg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$KrWG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$ElektroG (EAR-Registrierung, Rücknahmepflicht WEEE)$$, $$ElektroG$$, $$ElektroG (EAR-Registrierung, Rücknahmepflicht WEEE)$$, $$ElektroG §§1ff.$$, $$https://gesetze-im-internet.de/elektrog_2015$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$ElektroG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Batteriegesetz / EU-Batterie-VO (Rücknahme, Recycling, digit. Pass ab 2026)$$, $$BattG$$, $$Batteriegesetz / EU-Batterie-VO (Rücknahme, Recycling, digit. Pass ab 2026)$$, $$BattG; EU-VO 2023/1542$$, $$https://gesetze-im-internet.de/battg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BattG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$REACH Chemikalienregistrierung (ab 1 t/Jahr bei ECHA, SCIP-Meldung)$$, $$EU-VO-14$$, $$REACH Chemikalienregistrierung (ab 1 t/Jahr bei ECHA, SCIP-Meldung)$$, $$EU-VO 1907/2006$$, $$https://echa.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-14$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$CLP Chemikalienkennzeichnung (GHS-System)$$, $$EU-VO-15$$, $$CLP Chemikalienkennzeichnung (GHS-System)$$, $$EU-VO 1272/2008$$, $$https://echa.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-15$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Gefahrstoffverordnung (Gefährdungsbeurteilung, Sicherheitsdatenblatt)$$, $$GefStoffV-2$$, $$Gefahrstoffverordnung (Gefährdungsbeurteilung, Sicherheitsdatenblatt)$$, $$GefStoffV$$, $$https://gesetze-im-internet.de/gefstoffv$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GefStoffV-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$F-Gase-Verordnung (Dichtheitsprüfung, Zertifizierung)$$, $$EU-VO-16$$, $$F-Gase-Verordnung (Dichtheitsprüfung, Zertifizierung)$$, $$EU-VO 2024/573$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-16$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Wasserrecht Einleitungserlaubnis$$, $$WHG$$, $$Wasserrecht Einleitungserlaubnis$$, $$WHG §§8ff.$$, $$https://gesetze-im-internet.de/whg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$WHG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$BImSchG Anlagengenehmigung$$, $$BImSchG$$, $$BImSchG Anlagengenehmigung$$, $$BImSchG §§1ff.$$, $$https://gesetze-im-internet.de/bimschg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BImSchG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$GEG Gebäudeenergiegesetz (Neubaustandards, Heizungsaustausch, Energieausweis)$$, $$GEG$$, $$GEG Gebäudeenergiegesetz (Neubaustandards, Heizungsaustausch, Energieausweis)$$, $$GEG §§1ff.$$, $$https://gesetze-im-internet.de/geg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GEG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Bodenschutz / Altlastensanierung$$, $$BBodSchG$$, $$Bodenschutz / Altlastensanierung$$, $$BBodSchG §§1ff.$$, $$https://gesetze-im-internet.de/bbodschg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BBodSchG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Abfallentsorgungsnachweis gef. Abfälle$$, $$NachwV$$, $$Abfallentsorgungsnachweis gef. Abfälle$$, $$NachwV$$, $$https://gesetze-im-internet.de/nachwv$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$NachwV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Biozidrecht (Zulassung, Kennzeichnung)$$, $$EU-VO-17$$, $$Biozidrecht (Zulassung, Kennzeichnung)$$, $$EU-VO 528/2012$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-17$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Sprengstoffrecht (Erlaubnis, Sachkunde)$$, $$SprengG$$, $$Sprengstoffrecht (Erlaubnis, Sachkunde)$$, $$SprengG §§1ff.$$, $$https://gesetze-im-internet.de/sprengstg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$SprengG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Pflanzenschutzmittelrecht (Zulassung BVL, Sachkundepflicht)$$, $$PflSchG$$, $$Pflanzenschutzmittelrecht (Zulassung BVL, Sachkundepflicht)$$, $$PflSchG §25; VO 1107/2009$$, $$https://gesetze-im-internet.de/pflschg_2012$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$PflSchG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Biokraftstoffquote / THG-Minderungsquote (8,25% Energiegehalt 2025)$$, $$BImSchG-2$$, $$Biokraftstoffquote / THG-Minderungsquote (8,25% Energiegehalt 2025)$$, $$BImSchG §§37a ff.$$, $$https://gesetze-im-internet.de/bimschg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BImSchG-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Altfahrzeugverordnung (Rücknahme, Recycling 95%)$$, $$AltfahrzeugV$$, $$Altfahrzeugverordnung (Rücknahme, Recycling 95%)$$, $$AltfahrzeugV$$, $$https://gesetze-im-internet.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 8, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$AltfahrzeugV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$EEG Einspeisevergütung (Registrierung MaStR, Direktvermarktung)$$, $$EEG$$, $$EEG Einspeisevergütung (Registrierung MaStR, Direktvermarktung)$$, $$EEG §§1ff.$$, $$https://gesetze-im-internet.de/eeg_2023$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 20, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EEG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$KWKG Kraft-Wärme-Kopplung (Zuschlagszahlungen, BAFA)$$, $$KWKG$$, $$KWKG Kraft-Wärme-Kopplung (Zuschlagszahlungen, BAFA)$$, $$KWKG §§1ff.$$, $$https://gesetze-im-internet.de/kwkg_2016$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 20, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$KWKG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Marktstammdatenregister (Strom-/Gas-Anlagen ab 7 kW)$$, $$MaStRV$$, $$Marktstammdatenregister (Strom-/Gas-Anlagen ab 7 kW)$$, $$MaStRV; EnWG §111e$$, $$https://marktstammdatenregister.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 20, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$MaStRV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Smart Meter Pflicht (6.000–100.000 kWh und Anlagen ab 7 kW)$$, $$MsbG$$, $$Smart Meter Pflicht (6.000–100.000 kWh und Anlagen ab 7 kW)$$, $$MsbG §§29-32$$, $$https://bundesnetzagentur.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 20, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$MsbG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Energieverbrauchskennzeichnung A-G (Elektrogeräte)$$, $$EnVKV$$, $$Energieverbrauchskennzeichnung A-G (Elektrogeräte)$$, $$EnVKV; EU-VO 2017/1369$$, $$https://gesetze-im-internet.de/envkv$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 20, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EnVKV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Konzessionsabgabe (Energieversorger an Gemeinden)$$, $$KAV$$, $$Konzessionsabgabe (Energieversorger an Gemeinden)$$, $$KAV$$, $$https://gesetze-im-internet.de/kav$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 20, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$KAV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Netzentgelttransparenz (Genehmigungspflicht BNetzA)$$, $$EnWG$$, $$Netzentgelttransparenz (Genehmigungspflicht BNetzA)$$, $$EnWG §20a$$, $$https://gesetze-im-internet.de/enwg_2005$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 20, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EnWG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Fernwärme Preisregelung (Anschluss- und Versorgungspflicht)$$, $$AVBFernwärmeV$$, $$Fernwärme Preisregelung (Anschluss- und Versorgungspflicht)$$, $$AVBFernwärmeV$$, $$https://gesetze-im-internet.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 20, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$AVBFernwärmeV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$BaFin Bankenlizenz (Eigenkapitalanforderungen CRR)$$, $$KWG$$, $$BaFin Bankenlizenz (Eigenkapitalanforderungen CRR)$$, $$KWG §§1, 32; CRR$$, $$https://gesetze-im-internet.de/kredwg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 21, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$KWG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$MiFID II Wertpapierrecht (Wohlverhaltensregeln, Best Execution)$$, $$WpHG$$, $$MiFID II Wertpapierrecht (Wohlverhaltensregeln, Best Execution)$$, $$WpHG; MiFID II RL 2014/65$$, $$https://gesetze-im-internet.de/wphg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 21, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$WpHG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Versicherungsaufsicht Solvency II (SCR, Berichtspflichten)$$, $$VAG$$, $$Versicherungsaufsicht Solvency II (SCR, Berichtspflichten)$$, $$VAG §§1ff.$$, $$https://gesetze-im-internet.de/vag_2016$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 21, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$VAG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$PSD2 Zahlungsdienste (SCA, Open Banking)$$, $$ZAG$$, $$PSD2 Zahlungsdienste (SCA, Open Banking)$$, $$ZAG; EU-RL 2015/2366$$, $$https://gesetze-im-internet.de/zag_2018$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 21, 2
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$ZAG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$MiCA Kryptowerte (BaFin-Lizenz, Whitepaper, Reserven)$$, $$EU-VO-18$$, $$MiCA Kryptowerte (BaFin-Lizenz, Whitepaper, Reserven)$$, $$EU-VO 2023/1114$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 21, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-18$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$DORA digitale Resilienz Finanzsektor$$, $$EU-VO-19$$, $$DORA digitale Resilienz Finanzsektor$$, $$EU-VO 2022/2554$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 21, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-19$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Geldwäschegesetz GwG (KYC, FIU-Verdachtsmeldung)$$, $$GwG$$, $$Geldwäschegesetz GwG (KYC, FIU-Verdachtsmeldung)$$, $$GwG §§1-58$$, $$https://gesetze-im-internet.de/gwg_2017$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 21, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GwG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Transparenzregister (wirtschaftlich Berechtigte)$$, $$GwG-2$$, $$Transparenzregister (wirtschaftlich Berechtigte)$$, $$GwG §§18-26c$$, $$https://transparenzregister.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 21, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GwG-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Insiderrecht / Marktmissbrauch (MAR)$$, $$EU-VO-20$$, $$Insiderrecht / Marktmissbrauch (MAR)$$, $$EU-VO 596/2014$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 21, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-20$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Ad-hoc-Meldepflicht (Insiderinformationen unverzüglich)$$, $$MAR$$, $$Ad-hoc-Meldepflicht (Insiderinformationen unverzüglich)$$, $$MAR Art.17$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 21, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$MAR$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Stimmrechtsmeldepflichten (3/5/10/…/75%)$$, $$WpHG-2$$, $$Stimmrechtsmeldepflichten (3/5/10/…/75%)$$, $$WpHG §§33 ff.$$, $$https://gesetze-im-internet.de/wphg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 21, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$WpHG-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Prospektpflicht bei Wertpapierangeboten ab 8 Mio. €$$, $$EU-VO-21$$, $$Prospektpflicht bei Wertpapierangeboten ab 8 Mio. €$$, $$EU-VO 2017/1129$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 21, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-21$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Alternative Investmentfonds AIFMD (BaFin-Lizenz, Risikomanagement)$$, $$KAGB$$, $$Alternative Investmentfonds AIFMD (BaFin-Lizenz, Risikomanagement)$$, $$KAGB; EU-RL 2011/61$$, $$https://gesetze-im-internet.de/kagb$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 21, 2
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$KAGB$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Crowdfunding Regulierung (BaFin-Zulassung, max. 5 Mio. €/Projekt)$$, $$EU-VO-22$$, $$Crowdfunding Regulierung (BaFin-Zulassung, max. 5 Mio. €/Projekt)$$, $$EU-VO 2020/1503$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 21, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-22$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Bonitätsprüfungspflicht Verbraucherkredite$$, $$BGB-4$$, $$Bonitätsprüfungspflicht Verbraucherkredite$$, $$BGB §505a; VKrRL 2023$$, $$https://gesetze-im-internet.de/bgb$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 21, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BGB-4$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Zahlungsdienste SCA (2 Faktoren bei Online-Zahlung)$$, $$ZAG-2$$, $$Zahlungsdienste SCA (2 Faktoren bei Online-Zahlung)$$, $$ZAG §55; PSD2 Art.97$$, $$https://gesetze-im-internet.de/zag_2018$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 21, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$ZAG-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Börsenzulassung (Prospekt, laufende Meldepflichten)$$, $$BörsHG$$, $$Börsenzulassung (Prospekt, laufende Meldepflichten)$$, $$BörsHG §§32 ff.$$, $$https://gesetze-im-internet.de/boersehg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 21, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BörsHG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$SFDR Nachhaltigkeitsoffenlegung Finanzprodukte$$, $$EU-VO-23$$, $$SFDR Nachhaltigkeitsoffenlegung Finanzprodukte$$, $$EU-VO 2019/2088$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 21, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-23$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Hinweisgeberschutzgesetz (interne Meldestelle)$$, $$HinSchG$$, $$Hinweisgeberschutzgesetz (interne Meldestelle)$$, $$HinSchG §§12-14$$, $$https://gesetze-im-internet.de/hinschg$$, 50, NULL, TRUE, TRUE, TRUE, TRUE, 5, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$HinSchG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Antikorruption (Bestechung im Geschäftsverkehr strafbar)$$, $$StGB$$, $$Antikorruption (Bestechung im Geschäftsverkehr strafbar)$$, $$StGB §§299-335b$$, $$https://gesetze-im-internet.de/stgb$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 5, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$StGB$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Sanktionslisten-Prüfpflicht (EU/UN/US vor Geschäftsbeziehung)$$, $$AWG$$, $$Sanktionslisten-Prüfpflicht (EU/UN/US vor Geschäftsbeziehung)$$, $$AWG §17; EU-Sanktionsrecht$$, $$https://gesetze-im-internet.de/awg_2013$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 5, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$AWG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Exportkontrolle Dual-Use (BAFA-Genehmigung)$$, $$Dual-Use-VO$$, $$Exportkontrolle Dual-Use (BAFA-Genehmigung)$$, $$Dual-Use-VO 2021/821; AWG/AWV$$, $$https://bafa.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 5, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$Dual-Use-VO$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Rüstungsexportkontrolle$$, $$KrWaffKontrG$$, $$Rüstungsexportkontrolle$$, $$KrWaffKontrG; AWG; AWV$$, $$https://gesetze-im-internet.de/krwaffkontrg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 5, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$KrWaffKontrG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Vergabe öffentlicher Aufträge (EU-Schwellenwerte)$$, $$GWB$$, $$Vergabe öffentlicher Aufträge (EU-Schwellenwerte)$$, $$GWB §§97ff.; VgV$$, $$https://gesetze-im-internet.de/gwb$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 5, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GWB$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Berufsgeheimnisschutz (Ärzte, Anwälte, Steuerberater)$$, $$StGB-2$$, $$Berufsgeheimnisschutz (Ärzte, Anwälte, Steuerberater)$$, $$StGB §203$$, $$https://gesetze-im-internet.de/stgb$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 5, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$StGB-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$VOB/B öffentliche Bauverträge (Abnahme, Mängelhaftung, Kündigung)$$, $$VOB/B$$, $$VOB/B öffentliche Bauverträge (Abnahme, Mängelhaftung, Kündigung)$$, $$VOB/B$$, $$https://gesetze-im-internet.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 5, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$VOB/B$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Gewerbeanmeldung (Beginn, Änderung, Aufgabe)$$, $$GewO-2$$, $$Gewerbeanmeldung (Beginn, Änderung, Aufgabe)$$, $$GewO §14$$, $$https://gesetze-im-internet.de/gewo$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GewO-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Bewachungsgewerbe (Zuverlässigkeit, IHK-Sachkundeprüfung)$$, $$GewO-3$$, $$Bewachungsgewerbe (Zuverlässigkeit, IHK-Sachkundeprüfung)$$, $$GewO §34a; BewachV$$, $$https://gesetze-im-internet.de/gewo$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GewO-3$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Immobilienmaklererlaubnis$$, $$GewO-4$$, $$Immobilienmaklererlaubnis$$, $$GewO §34c$$, $$https://gesetze-im-internet.de/gewo$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GewO-4$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Versicherungsvermittlung (IHK-Registrierung, Haftpflicht)$$, $$GewO-5$$, $$Versicherungsvermittlung (IHK-Registrierung, Haftpflicht)$$, $$GewO §34d$$, $$https://gesetze-im-internet.de/gewo$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GewO-5$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Finanzanlagenvermittlung (DIRANICO-Registrierung)$$, $$GewO-6$$, $$Finanzanlagenvermittlung (DIRANICO-Registrierung)$$, $$GewO §34f$$, $$https://gesetze-im-internet.de/gewo$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GewO-6$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Meisterpflicht (41 Handwerke)$$, $$HwO$$, $$Meisterpflicht (41 Handwerke)$$, $$HwO §§1ff.$$, $$https://gesetze-im-internet.de/hwo$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$HwO$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Handwerkskammer Pflichtmitgliedschaft$$, $$HwO-2$$, $$Handwerkskammer Pflichtmitgliedschaft$$, $$HwO §§90ff.$$, $$https://gesetze-im-internet.de/hwo$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$HwO-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$IHK Pflichtmitgliedschaft$$, $$IHKG$$, $$IHK Pflichtmitgliedschaft$$, $$IHKG §2$$, $$https://gesetze-im-internet.de/ihkg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$IHKG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Kartellverbot (Preisabsprachen)$$, $$GWB-2$$, $$Kartellverbot (Preisabsprachen)$$, $$GWB §1; Art.101 AEUV$$, $$https://gesetze-im-internet.de/gwb$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GWB-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Fusionskontrolle (ab 25 Mio. € DE-Umsatz beim BKartA)$$, $$GWB-3$$, $$Fusionskontrolle (ab 25 Mio. € DE-Umsatz beim BKartA)$$, $$GWB §§35-43$$, $$https://gesetze-im-internet.de/gwb$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GWB-3$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Insolvenzantragspflicht (max. 3 Wochen)$$, $$InsO$$, $$Insolvenzantragspflicht (max. 3 Wochen)$$, $$InsO §15a$$, $$https://gesetze-im-internet.de/inso$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$InsO$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$GmbH-Gründung (min. 25.000 € Stammkapital, HR-Eintragung)$$, $$GmbHG$$, $$GmbH-Gründung (min. 25.000 € Stammkapital, HR-Eintragung)$$, $$GmbHG §§1ff.$$, $$https://gesetze-im-internet.de/gmbhg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GmbHG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Haftung Geschäftsführer (persönlich bei Pflichtverletzung)$$, $$GmbHG-2$$, $$Haftung Geschäftsführer (persönlich bei Pflichtverletzung)$$, $$GmbHG §43$$, $$https://gesetze-im-internet.de/gmbhg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GmbHG-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Vorstandshaftung AG (Business Judgement Rule)$$, $$AktG$$, $$Vorstandshaftung AG (Business Judgement Rule)$$, $$AktG §93$$, $$https://gesetze-im-internet.de/aktg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$AktG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Corporate Governance DCGK (comply-or-explain)$$, $$DCGK$$, $$Corporate Governance DCGK (comply-or-explain)$$, $$DCGK; AktG §161$$, $$https://gesetze-im-internet.de/aktg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$DCGK$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Vergütungsbericht Vorstand (jährlich, HV-Abstimmung)$$, $$AktG-2$$, $$Vergütungsbericht Vorstand (jährlich, HV-Abstimmung)$$, $$AktG §162; EU-AktionärsRL$$, $$https://gesetze-im-internet.de/aktg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$AktG-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Markenschutz (Benutzungspflicht 5 J., DPMA-Anmeldung)$$, $$MarkenG$$, $$Markenschutz (Benutzungspflicht 5 J., DPMA-Anmeldung)$$, $$MarkenG §§1ff.$$, $$https://gesetze-im-internet.de/markeng$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$MarkenG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Patentrecht (20 J. Schutz, DPMA-Anmeldung, Jahresgebühren)$$, $$PatG$$, $$Patentrecht (20 J. Schutz, DPMA-Anmeldung, Jahresgebühren)$$, $$PatG §§1ff.$$, $$https://gesetze-im-internet.de/patg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$PatG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Designrecht (25 J. Schutz, DPMA-Eintragung)$$, $$DesignG$$, $$Designrecht (25 J. Schutz, DPMA-Eintragung)$$, $$DesignG §§1ff.$$, $$https://gesetze-im-internet.de/geschmmg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$DesignG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Steuerberaterzulassung (Kammermitgliedschaft, Berufshaftpflicht)$$, $$StBerG$$, $$Steuerberaterzulassung (Kammermitgliedschaft, Berufshaftpflicht)$$, $$StBerG §§1ff.$$, $$https://gesetze-im-internet.de/stberg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$StBerG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Pflichtversicherung KFZ (Haftpflicht, Mindestdeckungssummen)$$, $$PflVG$$, $$Pflichtversicherung KFZ (Haftpflicht, Mindestdeckungssummen)$$, $$PflVG §§1ff.$$, $$https://gesetze-im-internet.de/pflvg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$PflVG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Telekommunikation Anzeige bei BNetzA$$, $$TKG$$, $$Telekommunikation Anzeige bei BNetzA$$, $$TKG §3$$, $$https://gesetze-im-internet.de/tkg_2021$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 22, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$TKG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Arzneimittelgesetz (Zulassung, GMP, Pharmakovigilanz)$$, $$AMG$$, $$Arzneimittelgesetz (Zulassung, GMP, Pharmakovigilanz)$$, $$AMG §§1ff.$$, $$https://gesetze-im-internet.de/amg_1976$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 17, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$AMG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Medizinprodukte MDR (CE, Benannte Stelle ab Klasse IIa)$$, $$EU-VO-24$$, $$Medizinprodukte MDR (CE, Benannte Stelle ab Klasse IIa)$$, $$EU-VO 2017/745$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 17, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-24$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Infektionsschutzgesetz Meldepflicht$$, $$IfSG$$, $$Infektionsschutzgesetz Meldepflicht$$, $$IfSG §§6-9$$, $$https://gesetze-im-internet.de/ifsg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 17, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$IfSG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Apothekenrecht (Approbation, Rx-Arzneimittelpflicht)$$, $$ApoG$$, $$Apothekenrecht (Approbation, Rx-Arzneimittelpflicht)$$, $$ApoG §§1ff.$$, $$https://gesetze-im-internet.de/apog$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 17, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$ApoG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Arzt-Approbation + GKV-Kassenzulassung$$, $$BÄO$$, $$Arzt-Approbation + GKV-Kassenzulassung$$, $$BÄO; SGB V$$, $$https://gesetze-im-internet.de/baeppo$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 17, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BÄO$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Krankenhaus Qualitätsbericht (jährlich, G-BA)$$, $$SGB-V$$, $$Krankenhaus Qualitätsbericht (jährlich, G-BA)$$, $$SGB V §137$$, $$https://gesetze-im-internet.de/sgb_5$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 17, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$SGB-V$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Pflegeversicherung Versorgungsvertrag$$, $$SGB-XI$$, $$Pflegeversicherung Versorgungsvertrag$$, $$SGB XI §§1ff.$$, $$https://gesetze-im-internet.de/sgb_11$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 17, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$SGB-XI$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Patientendaten Datenschutz (DSGVO Art.9; ePA)$$, $$DSGVO$$, $$Patientendaten Datenschutz (DSGVO Art.9; ePA)$$, $$DSGVO Art.9; SGB V §§307ff.$$, $$https://gesetze-im-internet.de/sgb_5$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 17, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$DSGVO$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Heimrecht Pflegeeinrichtungen (Betriebserlaubnis, Personalschlüssel)$$, $$Heimgesetze$$, $$Heimrecht Pflegeeinrichtungen (Betriebserlaubnis, Personalschlüssel)$$, $$Heimgesetze Länder$$, $$https://gesetze-im-internet.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 17, 5
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$Heimgesetze$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Labormedizin Qualitätssicherung (Ringversuche, RiliBäk)$$, $$RiliBäK$$, $$Labormedizin Qualitätssicherung (Ringversuche, RiliBäk)$$, $$RiliBäK$$, $$https://bundesaerztekammer.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 17, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$RiliBäK$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Fahrpersonalverordnung (Lenk-/Ruhezeiten, digitaler Fahrtenschreiber)$$, $$VO$$, $$Fahrpersonalverordnung (Lenk-/Ruhezeiten, digitaler Fahrtenschreiber)$$, $$VO 561/2006; FPersV$$, $$https://gesetze-im-internet.de/fpersv$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 23, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$VO$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Berufskraftfahrer Qualifikation (Grundqualifikation + Weiterbildung alle 5 J.)$$, $$BKrFQG$$, $$Berufskraftfahrer Qualifikation (Grundqualifikation + Weiterbildung alle 5 J.)$$, $$BKrFQG §§1ff.$$, $$https://gesetze-im-internet.de/bkrfqg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 23, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BKrFQG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Gefahrgutrecht ADR (Gefahrzettel, Gefahrgutbeauftragter)$$, $$GGVSEB$$, $$Gefahrgutrecht ADR (Gefahrzettel, Gefahrgutbeauftragter)$$, $$GGVSEB; ADR$$, $$https://gesetze-im-internet.de/ggvseb$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 23, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GGVSEB$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Güterkraftverkehrserlaubnis EU-Lizenz$$, $$GüKG$$, $$Güterkraftverkehrserlaubnis EU-Lizenz$$, $$GüKG §§1ff.$$, $$https://gesetze-im-internet.de/guerkg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 23, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GüKG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Personenbeförderungsgesetz (Bus, Taxi, Mietwagen: Konzession)$$, $$PBefG$$, $$Personenbeförderungsgesetz (Bus, Taxi, Mietwagen: Konzession)$$, $$PBefG §§1ff.$$, $$https://gesetze-im-internet.de/pbefg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 23, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$PBefG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$LKW-Maut (ab 3,5 t zGM, alle Bundesstraßen)$$, $$BFStrMG$$, $$LKW-Maut (ab 3,5 t zGM, alle Bundesstraßen)$$, $$BFStrMG §§1ff.$$, $$https://gesetze-im-internet.de/bfstrmg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 23, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BFStrMG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Luftfahrtrecht (Betriebsgenehmigung LBA, Drohnen)$$, $$LuftVG$$, $$Luftfahrtrecht (Betriebsgenehmigung LBA, Drohnen)$$, $$LuftVG §§1ff.$$, $$https://gesetze-im-internet.de/luftvg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 23, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$LuftVG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Binnenschifffahrtsrecht (Zulassung Schiff, Schifferführerschein)$$, $$BinSchG$$, $$Binnenschifffahrtsrecht (Zulassung Schiff, Schifferführerschein)$$, $$BinSchG §§1ff.$$, $$https://gesetze-im-internet.de/binnschg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 23, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BinSchG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Bahnrecht Eisenbahn (Sicherheitsbescheinigung EBA)$$, $$AEG$$, $$Bahnrecht Eisenbahn (Sicherheitsbescheinigung EBA)$$, $$AEG §§1ff.$$, $$https://gesetze-im-internet.de/aeg_1994$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 23, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$AEG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$HACCP-Konzept (Eigenkontrolle, Dokumentation, Schulung)$$, $$VO-2$$, $$HACCP-Konzept (Eigenkontrolle, Dokumentation, Schulung)$$, $$VO 852/2004; LMHV$$, $$https://gesetze-im-internet.de/lmhv$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 18, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$VO-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Lebensmittelkennzeichnung (Zutaten, Allergene, Nährwerte, MHD)$$, $$EU-VO-25$$, $$Lebensmittelkennzeichnung (Zutaten, Allergene, Nährwerte, MHD)$$, $$EU-VO 1169/2011 (LMIV)$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 18, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-25$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$LFGB (Inverkehrbringen Lebensmittel und Bedarfsgegenstände)$$, $$LFGB$$, $$LFGB (Inverkehrbringen Lebensmittel und Bedarfsgegenstände)$$, $$LFGB §§1ff.$$, $$https://gesetze-im-internet.de/lfgb$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 18, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$LFGB$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Bio-Zertifizierung (anerkannte Kontrollstelle, jährliche Kontrolle)$$, $$EU-VO-26$$, $$Bio-Zertifizierung (anerkannte Kontrollstelle, jährliche Kontrolle)$$, $$EU-VO 2018/848$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 18, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-26$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Fleischhygiene (amtliche Tierärztin, Genusstauglichkeitskennzeichnung)$$, $$VO-3$$, $$Fleischhygiene (amtliche Tierärztin, Genusstauglichkeitskennzeichnung)$$, $$VO 854/2004; Tier-LMHV$$, $$https://gesetze-im-internet.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 18, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$VO-3$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Novel Food Zulassung$$, $$EU-VO-27$$, $$Novel Food Zulassung$$, $$EU-VO 2015/2283$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 18, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-27$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Tabakerzeugniskontrolle (Warnhinweise, Track-and-Trace)$$, $$TabakerzG$$, $$Tabakerzeugniskontrolle (Warnhinweise, Track-and-Trace)$$, $$TabakerzG; EU-RL 2014/40$$, $$https://gesetze-im-internet.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 18, 2
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$TabakerzG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Baugenehmigung (Landesbauordnungen, Bebauungsplan)$$, $$BauGB$$, $$Baugenehmigung (Landesbauordnungen, Bebauungsplan)$$, $$BauGB; LBO Länder$$, $$https://gesetze-im-internet.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 14, 5
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BauGB$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$WEG Hausverwaltung (IHK-Zertifizierungspflicht ab 2022)$$, $$WEG$$, $$WEG Hausverwaltung (IHK-Zertifizierungspflicht ab 2022)$$, $$WEG §§1ff.$$, $$https://gesetze-im-internet.de/weg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 14, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$WEG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$MaBV Makler/Bauträger (gesonderte Buchführung, Mindestversicherung)$$, $$MaBV$$, $$MaBV Makler/Bauträger (gesonderte Buchführung, Mindestversicherung)$$, $$MaBV §§1ff.$$, $$https://gesetze-im-internet.de/mabv$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 14, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$MaBV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Schwarzarbeitsgesetz Schriftform (Bau, Gastro, Gebäudereinigung, Spedition)$$, $$SchwarzArbG$$, $$Schwarzarbeitsgesetz Schriftform (Bau, Gastro, Gebäudereinigung, Spedition)$$, $$SchwarzArbG §2a$$, $$https://gesetze-im-internet.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 14, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$SchwarzArbG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Asbest Drei-Zonen-Modell (Sachkundepflicht, seit 2025)$$, $$GefStoffV-3$$, $$Asbest Drei-Zonen-Modell (Sachkundepflicht, seit 2025)$$, $$GefStoffV; TRGS 519$$, $$https://gesetze-im-internet.de/gefstoffv$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 14, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GefStoffV-3$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Werkvertrag Generalunternehmer-Haftung (Mindestlohn Subunternehmer)$$, $$AEntG-2$$, $$Werkvertrag Generalunternehmer-Haftung (Mindestlohn Subunternehmer)$$, $$AEntG §14$$, $$https://gesetze-im-internet.de/aentg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 14, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$AEntG-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Cross Compliance (EU-Förderung: Umwelt-, Tierschutz-, Lebensmittelauflagen)$$, $$EU-VO-28$$, $$Cross Compliance (EU-Förderung: Umwelt-, Tierschutz-, Lebensmittelauflagen)$$, $$EU-VO 2021/2115; InVeKoSV$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 24, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-28$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Tierschutzgesetz (artgerechte Haltung, Betäubungspflicht)$$, $$TierSchG$$, $$Tierschutzgesetz (artgerechte Haltung, Betäubungspflicht)$$, $$TierSchG §§1ff.$$, $$https://gesetze-im-internet.de/tierschg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 24, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$TierSchG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Tierseuchenrecht (Meldepflicht, Bestandsregister)$$, $$TierGesG$$, $$Tierseuchenrecht (Meldepflicht, Bestandsregister)$$, $$TierGesG §§1ff.$$, $$https://gesetze-im-internet.de/tiergesg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 24, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$TierGesG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Forstrecht (Wiederaufforstungspflicht nach Einschlag)$$, $$BWaldG$$, $$Forstrecht (Wiederaufforstungspflicht nach Einschlag)$$, $$BWaldG; Länder$$, $$https://gesetze-im-internet.de/bwaldg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 24, 5
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BWaldG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Düngemittelrecht (Zulassung, Schwermetallgrenzwerte)$$, $$DüngeG$$, $$Düngemittelrecht (Zulassung, Schwermetallgrenzwerte)$$, $$DüngeG; DüMV$$, $$https://gesetze-im-internet.de/duengg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 24, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$DüngeG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Direktzahlungen Landwirte (jährlicher Antrag, Konditionalität)$$, $$EU-VO-29$$, $$Direktzahlungen Landwirte (jährlicher Antrag, Konditionalität)$$, $$EU-VO 2021/2116$$, $$https://gesetze-im-internet.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 24, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-29$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Gaststättenerlaubnis (Zuverlässigkeit, HACCP, Nichtraucherschutz)$$, $$GastG$$, $$Gaststättenerlaubnis (Zuverlässigkeit, HACCP, Nichtraucherschutz)$$, $$GastG Länder$$, $$https://gesetze-im-internet.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 15, 5
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GastG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$MwSt 7% auf Speisen in Restaurants (ab 2026 dauerhaft)$$, $$UStG-5$$, $$MwSt 7% auf Speisen in Restaurants (ab 2026 dauerhaft)$$, $$UStG §12 Abs.2$$, $$https://bundesfinanzministerium.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 15, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$UStG-5$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Branchenmindestlohn Bau (AEntG, Generalunternehmerhaftung)$$, $$AEntG-3$$, $$Branchenmindestlohn Bau (AEntG, Generalunternehmerhaftung)$$, $$AEntG; Bau-Mindestlohn-TV$$, $$https://gesetze-im-internet.de/aentg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 15, 4
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$AEntG-3$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Reisegewerbekarte (außerhalb fester Niederlassung)$$, $$GewO-7$$, $$Reisegewerbekarte (außerhalb fester Niederlassung)$$, $$GewO §§55-61a$$, $$https://gesetze-im-internet.de/gewo$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 15, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GewO-7$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Jugendschutz Alkohol/Tabak (Werbeverbot an Minderjährige)$$, $$JuSchG$$, $$Jugendschutz Alkohol/Tabak (Werbeverbot an Minderjährige)$$, $$JuSchG §6$$, $$https://gesetze-im-internet.de/juschg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 15, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$JuSchG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Maschinenverordnung (CE, technische Dokumentation)$$, $$EU-VO-30$$, $$Maschinenverordnung (CE, technische Dokumentation)$$, $$EU-VO 2023/1230$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 25, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-30$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Niederspannungsrichtlinie LVD (50V–1000V, CE)$$, $$1$$, $$Niederspannungsrichtlinie LVD (50V–1000V, CE)$$, $$1. ProdSV; LVD 2014/35$$, $$https://gesetze-im-internet.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 25, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$1$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$EMV-Richtlinie (elektromagnetische Emissionen, CE)$$, $$EMVG$$, $$EMV-Richtlinie (elektromagnetische Emissionen, CE)$$, $$EMVG; EMV-RL 2014/30$$, $$https://gesetze-im-internet.de/emvg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 25, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EMVG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Funkanlagen-Richtlinie RED (WLAN, Bluetooth, Mobilfunk)$$, $$FuAg$$, $$Funkanlagen-Richtlinie RED (WLAN, Bluetooth, Mobilfunk)$$, $$FuAg; RED 2014/53$$, $$https://gesetze-im-internet.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 25, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$FuAg$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Druckgeräterichtlinie PED$$, $$14$$, $$Druckgeräterichtlinie PED$$, $$14. ProdSV; DGRL 2014/68$$, $$https://gesetze-im-internet.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 25, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$14$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Aufzugsrichtlinie (neue Aufzüge: CE, Konformitätsprüfung)$$, $$EU-RL-3$$, $$Aufzugsrichtlinie (neue Aufzüge: CE, Konformitätsprüfung)$$, $$EU-RL 2014/33$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 25, 2
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-RL-3$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Spielzeugrichtlinie (CE, Sicherheitsanforderungen, Alterseinstufung)$$, $$SpielzV$$, $$Spielzeugrichtlinie (CE, Sicherheitsanforderungen, Alterseinstufung)$$, $$SpielzV; RL 2009/48/EG$$, $$https://gesetze-im-internet.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 25, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$SpielzV$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Ökodesign-Verordnung ESPR (Mindestanforderungen, gestaffelt ab 2026)$$, $$EU-VO-31$$, $$Ökodesign-Verordnung ESPR (Mindestanforderungen, gestaffelt ab 2026)$$, $$EU-VO 2024/1781$$, $$https://eur-lex.europa.eu$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 25, 1
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$EU-VO-31$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Rechtsanwaltszulassung (Kammermitgliedschaft, Berufspflichten)$$, $$BRAO$$, $$Rechtsanwaltszulassung (Kammermitgliedschaft, Berufspflichten)$$, $$BRAO §§1ff.$$, $$https://gesetze-im-internet.de/brao$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 26, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BRAO$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Notarzulassung (staatliche Bestellung, Amtspflichten)$$, $$BNotO$$, $$Notarzulassung (staatliche Bestellung, Amtspflichten)$$, $$BNotO §§1ff.$$, $$https://gesetze-im-internet.de/bnoto$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 26, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$BNotO$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Wirtschaftsprüfer Bestellung (WPK, Unabhängigkeitspflichten)$$, $$WPO$$, $$Wirtschaftsprüfer Bestellung (WPK, Unabhängigkeitspflichten)$$, $$WPO §§1ff.$$, $$https://gesetze-im-internet.de/wpo$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 26, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$WPO$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Steuerberaterzulassung (Kammer, Berufshaftpflicht)$$, $$StBerG-2$$, $$Steuerberaterzulassung (Kammer, Berufshaftpflicht)$$, $$StBerG §§1ff.$$, $$https://gesetze-im-internet.de/stberg$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 26, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$StBerG-2$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Architekt (Kammermitgliedschaft, Studium + Praxis)$$, $$ArchG$$, $$Architekt (Kammermitgliedschaft, Studium + Praxis)$$, $$ArchG Länder$$, $$https://gesetze-im-internet.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 26, 5
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$ArchG$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Apotheker Approbation$$, $$ApoApprobO$$, $$Apotheker Approbation$$, $$ApoApprobO$$, $$https://gesetze-im-internet.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 26, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$ApoApprobO$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$Öffentlich bestellter Sachverständiger$$, $$GewO-8$$, $$Öffentlich bestellter Sachverständiger$$, $$GewO §36$$, $$https://gesetze-im-internet.de/gewo$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 26, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$GewO-8$$);
INSERT INTO regulierung.regulierung (name, kurzname, beschreibung, rechtsgrundlage, externe_url, mitarbeiter_min, mitarbeiter_max, aktiv, gilt_fuer_alle_rechtsformen, gilt_fuer_alle_branchen, gilt_fuer_alle_bundeslaender, kategorie_id, rechtsebene_id)
SELECT $$DAkkS-Akkreditierung (Prüf-/Kalibrierlabore, QMS)$$, $$ISO$$, $$DAkkS-Akkreditierung (Prüf-/Kalibrierlabore, QMS)$$, $$ISO 9001; DAkkS$$, $$https://dakks.de$$, NULL, NULL, TRUE, TRUE, TRUE, TRUE, 26, 3
WHERE NOT EXISTS (SELECT 1 FROM regulierung.regulierung WHERE kurzname = $$ISO$$);

COMMIT;

SELECT COUNT(*) AS total_regulierungen FROM regulierung.regulierung;