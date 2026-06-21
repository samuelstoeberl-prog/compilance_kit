-- Migration 001: Clerk User-ID zur companies-Tabelle hinzufügen
-- Ausführen mit: psql $DATABASE_URL -f migrations/001_add_clerk_user_id.sql
--
-- WICHTIG: Diese Migration muss EINMALIG auf der Datenbank ausgeführt werden.
-- Bestehende Einträge erhalten NULL als clerk_user_id und können danach
-- nicht mehr ohne Login aufgerufen werden (by design).

-- 1. Spalte hinzufügen (nullable für bestehende Datensätze)
ALTER TABLE companies
  ADD COLUMN IF NOT EXISTS clerk_user_id VARCHAR(100);

-- 2. Unique-Constraint: ein Nutzer = ein Unternehmen
--    (UPSERT in companies.ts nutzt diesen Constraint)
ALTER TABLE companies
  ADD CONSTRAINT IF NOT EXISTS companies_clerk_user_id_unique
  UNIQUE (clerk_user_id);

-- 3. Index für schnelle Lookups per clerk_user_id
CREATE INDEX IF NOT EXISTS idx_companies_clerk_user_id
  ON companies(clerk_user_id);

-- 4. Optionaler Schritt: alte Datensätze ohne Nutzer bereinigen
-- (auskommentiert – nur ausführen wenn gewünscht)
-- DELETE FROM companies WHERE clerk_user_id IS NULL;
