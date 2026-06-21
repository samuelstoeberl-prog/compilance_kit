import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useAuth } from '@clerk/clerk-react'
import type { UnternehmensProfil, PflichtStatus } from '../types'
import { createCompany, updateCompany, updateRegulationStatus, fetchMyCompany } from '../api/client'
import { setTokenGetter } from '../lib/authToken'

interface ProfilContextValue {
  profil: UnternehmensProfil | null
  companyId: string | null
  backendOnline: boolean
  isLoadingProfil: boolean
  setProfil: (p: UnternehmensProfil) => Promise<void>
  statusMap: Record<string, PflichtStatus>
  setStatus: (id: string, status: PflichtStatus) => void
  docTimestamps: Record<string, string>
  setDocGenerated: (id: string) => void
}

const ProfilContext = createContext<ProfilContextValue | null>(null)

// ── Hilfsfunktionen localStorage ──────────────────────────────────────────────

function clearLocalStorage() {
  localStorage.removeItem('ck_profil')
  localStorage.removeItem('ck_company_id')
  localStorage.removeItem('ck_status')
  localStorage.removeItem('ck_docs')
}

function readLS<T>(key: string, fallback: T): T {
  try {
    const s = localStorage.getItem(key)
    return s ? JSON.parse(s) : fallback
  } catch {
    return fallback
  }
}

// ── Provider ──────────────────────────────────────────────────────────────────

export function ProfilProvider({ children }: { children: ReactNode }) {
  const { userId, getToken, isLoaded: clerkLoaded } = useAuth()

  // Sofort aus LocalStorage laden (schnelle Erstanzeige)
  const [profil, setProfilState] = useState<UnternehmensProfil | null>(() =>
    readLS('ck_profil', null)
  )
  const [companyId, setCompanyId] = useState<string | null>(() =>
    readLS('ck_company_id', null)
  )
  const [statusMap, setStatusMap] = useState<Record<string, PflichtStatus>>(() =>
    readLS('ck_status', {})
  )
  const [docTimestamps, setDocTimestamps] = useState<Record<string, string>>(() =>
    readLS('ck_docs', {})
  )
  const [backendOnline, setBackendOnline] = useState(false)
  const [isLoadingProfil, setIsLoadingProfil] = useState(true)

  // ── Clerk-Token dem API-Client zur Verfügung stellen ──────────────────────
  useEffect(() => {
    setTokenGetter(getToken)
  }, [getToken])

  // ── Backend-Verbindung prüfen ─────────────────────────────────────────────
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL ?? ''}/api/health`, {
      signal: AbortSignal.timeout(3000),
    })
      .then(() => setBackendOnline(true))
      .catch(() => setBackendOnline(false))
  }, [])

  // ── Profil laden wenn Clerk-Auth bereit ist ───────────────────────────────
  useEffect(() => {
    if (!clerkLoaded) return

    if (!userId) {
      // Nutzer ausgeloggt – alles zurücksetzen
      setProfilState(null)
      setCompanyId(null)
      setStatusMap({})
      setDocTimestamps({})
      clearLocalStorage()
      setIsLoadingProfil(false)
      return
    }

    // Nutzer eingeloggt – Unternehmen vom Backend laden
    if (!backendOnline) {
      // Offline: LocalStorage-Fallback weiter nutzen
      setIsLoadingProfil(false)
      return
    }

    setIsLoadingProfil(true)
    fetchMyCompany()
      .then(async company => {
        if (company) {
          // Backend hat ein Unternehmen → als Quelle der Wahrheit nutzen
          setProfilState(company)
          setCompanyId(company.id)
          localStorage.setItem('ck_profil', JSON.stringify(company))
          localStorage.setItem('ck_company_id', company.id)
        } else {
          // Kein Backend-Eintrag – aber hat der Nutzer schon das Onboarding ausgefüllt?
          const localProfil = readLS<UnternehmensProfil | null>('ck_profil', null)
          if (localProfil) {
            // Onboarding-Daten ins Backend synchronisieren
            try {
              const created = await createCompany(localProfil)
              setCompanyId(created.id)
              localStorage.setItem('ck_company_id', created.id)
              // Profil bleibt erhalten (bereits im State aus localStorage-Init)
            } catch {
              // Sync fehlgeschlagen – localStorage-Fallback behalten
            }
          } else {
            setProfilState(null)
            setCompanyId(null)
            clearLocalStorage()
          }
        }
      })
      .catch(err => {
        console.warn('[ProfilContext] Profil-Laden fehlgeschlagen:', err)
        // LocalStorage-Fallback behalten
      })
      .finally(() => setIsLoadingProfil(false))
  }, [userId, clerkLoaded, backendOnline])

  // ── Profil speichern – LocalStorage + Backend ─────────────────────────────
  const setProfil = async (p: UnternehmensProfil) => {
    setProfilState(p)
    localStorage.setItem('ck_profil', JSON.stringify(p))

    if (!backendOnline) return

    try {
      if (companyId) {
        await updateCompany(companyId, p)
      } else {
        const created = await createCompany(p)
        setCompanyId(created.id)
        localStorage.setItem('ck_company_id', created.id)
      }
    } catch (err) {
      console.warn('[ProfilContext] Backend-Sync fehlgeschlagen:', err)
    }
  }

  // ── Regulatorik-Status lokal + Backend synchronisieren ───────────────────
  const setStatus = (id: string, status: PflichtStatus) => {
    setStatusMap(prev => {
      const next = { ...prev, [id]: status }
      localStorage.setItem('ck_status', JSON.stringify(next))
      return next
    })

    if (backendOnline && companyId) {
      updateRegulationStatus(companyId, id, status).catch(err =>
        console.warn('[ProfilContext] Status-Sync fehlgeschlagen:', err)
      )
    }
  }

  const setDocGenerated = (id: string) => {
    setDocTimestamps(prev => {
      const next = { ...prev, [id]: new Date().toISOString() }
      localStorage.setItem('ck_docs', JSON.stringify(next))
      return next
    })
  }

  return (
    <ProfilContext.Provider value={{
      profil, companyId, backendOnline, isLoadingProfil,
      setProfil, statusMap, setStatus, docTimestamps, setDocGenerated,
    }}>
      {children}
    </ProfilContext.Provider>
  )
}

export function useProfil() {
  const ctx = useContext(ProfilContext)
  if (!ctx) throw new Error('useProfil must be used within ProfilProvider')
  return ctx
}
