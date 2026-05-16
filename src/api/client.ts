import type { UnternehmensProfil, PflichtStatus } from '../types'

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

// ── Generischer Fetch-Wrapper ─────────────────────────────────────────────────

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? `HTTP ${res.status}`)
  }
  return res.json()
}

// ── Unternehmen ───────────────────────────────────────────────────────────────

export interface CompanyResponse extends UnternehmensProfil {
  id: string
  created_at: string
  updated_at: string
}

export function createCompany(profil: UnternehmensProfil): Promise<CompanyResponse> {
  return apiFetch('/api/companies', { method: 'POST', body: JSON.stringify(profil) })
}

export function updateCompany(id: string, profil: UnternehmensProfil): Promise<CompanyResponse> {
  return apiFetch(`/api/companies/${id}`, { method: 'PUT', body: JSON.stringify(profil) })
}

// ── Matching ──────────────────────────────────────────────────────────────────

export interface ApiFunding {
  id: string
  title: string
  beschreibung: string
  typ: 'Zuschuss' | 'Kredit' | 'Steuervorteil'
  quelle: 'EU' | 'Bund' | 'Bundesland'
  foerderer: string
  max_betrag: number | null
  zins: string | null
  antrag_url: string
  bearbeitungszeit_min: number
  bearbeitungszeit_max: number
  ausschlusskriterien: string[]
  benoetigte_dokumente: { name: string; auto: boolean }[]
  gilt_fuer: unknown
  relevanz_boost: unknown
  score: number
}

export interface ApiRegulation {
  id: string
  title: string
  category: string
  beschreibung: string
  rechtsgrundlage: string
  quelle_url: string
  gilt_fuer: unknown
  hat_dokument_generator: boolean
  dokument_typ: string | null
  status: 'offen' | 'erledigt' | 'nicht_relevant'
  score: number
}

export interface FundingsResponse {
  total: number
  items: ApiFunding[]
}

export interface RegulationsResponse {
  total_relevant: number
  erledigt: number
  offen: number
  items: ApiRegulation[]
  nicht_relevant_ids: string[]
}

export function fetchFundings(companyId: string): Promise<FundingsResponse> {
  return apiFetch(`/api/match/${companyId}/fundings`)
}

export function fetchRegulations(companyId: string): Promise<RegulationsResponse> {
  return apiFetch(`/api/match/${companyId}/regulations`)
}

export function updateRegulationStatus(
  companyId: string,
  regulationId: string,
  status: PflichtStatus,
): Promise<void> {
  return apiFetch(`/api/match/${companyId}/regulations/${regulationId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}

// Health-Check – prüft ob Backend erreichbar ist
export async function checkBackend(): Promise<boolean> {
  try {
    await fetch(`${BASE}/api/health`, { signal: AbortSignal.timeout(3000) })
    return true
  } catch {
    return false
  }
}
