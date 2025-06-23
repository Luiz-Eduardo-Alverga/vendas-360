'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import Cookies from 'js-cookie'

interface AuthContextType {
  accessToken: string | null
  isAuthLoading: boolean
  refreshTokenManually: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  const loadToken = () => {
    const token = Cookies.get('accessToken')
    setAccessToken(token || null)
    setIsAuthLoading(false)
  }

  useEffect(() => {
    loadToken()
  }, [])

  const refreshTokenManually = () => {
    const token = Cookies.get('accessToken')
    setAccessToken(token || null)
  }

  return (
    <AuthContext.Provider
      value={{ accessToken, isAuthLoading, refreshTokenManually }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}
