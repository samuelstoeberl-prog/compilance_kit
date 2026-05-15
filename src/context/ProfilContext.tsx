import { createContext, useContext, useState, type ReactNode } from 'react'
import type { UnternehmensProfil, PflichtStatus } from '../types'

interface ProfilContextValue {
  profil: UnternehmensProfil | null
  setProfil: (p: UnternehmensProfil) => void
  statusMap: Record<string, PflichtStatus>
  setStatus: (id: string, status: PflichtStatus) => void
  docTimestamps: Record<string, string>   // regulationId → ISO date string
  setDocGenerated: (id: string) => void
}

const ProfilContext = createContext<ProfilContextValue | null>(null)

export function ProfilProvider({ children }: { children: ReactNode }) {
  const [profil, setProfilState] = useState<UnternehmensProfil | null>(() => {
    const stored = localStorage.getItem('ck_profil')
    return stored ? JSON.parse(stored) : null
  })

  const [statusMap, setStatusMap] = useState<Record<string, PflichtStatus>>(() => {
    const stored = localStorage.getItem('ck_status')
    return stored ? JSON.parse(stored) : {}
  })

  const [docTimestamps, setDocTimestamps] = useState<Record<string, string>>(() => {
    const stored = localStorage.getItem('ck_docs')
    return stored ? JSON.parse(stored) : {}
  })

  const setProfil = (p: UnternehmensProfil) => {
    setProfilState(p)
    localStorage.setItem('ck_profil', JSON.stringify(p))
  }

  const setStatus = (id: string, status: PflichtStatus) => {
    setStatusMap(prev => {
      const next = { ...prev, [id]: status }
      localStorage.setItem('ck_status', JSON.stringify(next))
      return next
    })
  }

  const setDocGenerated = (id: string) => {
    setDocTimestamps(prev => {
      const next = { ...prev, [id]: new Date().toISOString() }
      localStorage.setItem('ck_docs', JSON.stringify(next))
      return next
    })
  }

  return (
    <ProfilContext.Provider value={{ profil, setProfil, statusMap, setStatus, docTimestamps, setDocGenerated }}>
      {children}
    </ProfilContext.Provider>
  )
}

export function useProfil() {
  const ctx = useContext(ProfilContext)
  if (!ctx) throw new Error('useProfil must be used within ProfilProvider')
  return ctx
}
