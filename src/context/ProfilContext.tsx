import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { UnternehmensProfil, PflichtStatus } from '../types'

interface ProfilContextValue {
  profil: UnternehmensProfil | null
  setProfil: (p: UnternehmensProfil) => void
  statusMap: Record<string, PflichtStatus>
  setStatus: (id: string, status: PflichtStatus) => void
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

  return (
    <ProfilContext.Provider value={{ profil, setProfil, statusMap, setStatus }}>
      {children}
    </ProfilContext.Provider>
  )
}

export function useProfil() {
  const ctx = useContext(ProfilContext)
  if (!ctx) throw new Error('useProfil must be used within ProfilProvider')
  return ctx
}
