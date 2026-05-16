import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { UnternehmensProfil, PflichtStatus } from '../types'
import { createCompany, updateCompany, updateRegulationStatus } from '../api/client'

interface ProfilContextValue {
  profil: UnternehmensProfil | null
  companyId: string | null
  backendOnline: boolean
  setProfil: (p: UnternehmensProfil) => Promise<void>
  statusMap: Record<string, PflichtStatus>
  setStatus: (id: string, status: PflichtStatus) => void
  docTimestamps: Record<string, string>
  setDocGenerated: (id: string) => void
}

const ProfilContext = createContext<ProfilContextValue | null>(null)

export function ProfilProvider({ children }: { children: ReactNode }) {
  const [profil, setProfilState] = useState<UnternehmensProfil | null>(() => {
    const s = localStorage.getItem('ck_profil')
    return s ? JSON.parse(s) : null
  })

  const [companyId, setCompanyId] = useState<string | null>(
    () => localStorage.getItem('ck_company_id')
  )

  const [backendOnline, setBackendOnline] = useState(false)

  const [statusMap, setStatusMap] = useState<Record<string, PflichtStatus>>(() => {
    const s = localStorage.getItem('ck_status')
    return s ? JSON.parse(s) : {}
  })

  const [docTimestamps, setDocTimestamps] = useState<Record<string, string>>(() => {
    const s = localStorage.getItem('ck_docs')
    return s ? JSON.parse(s) : {}
  })

  // Backend-Verbindung beim Start prüfen
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:3001'}/api/health`, {
      signal: AbortSignal.timeout(3000),
    })
      .then(() => setBackendOnline(true))
      .catch(() => setBackendOnline(false))
  }, [])

  // Profil speichern – localStorage + Backend
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

  // Status lokal + Backend synchronisieren
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
      profil, companyId, backendOnline,
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
