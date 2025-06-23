'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import Cookies from 'js-cookie'
import { useQueryClient } from '@tanstack/react-query'

interface AuthContextType {
  accessToken: string | null
  isAuthLoading: boolean
  refreshTokenManually: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  const logout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    setAccessToken(null)
    queryClient.clear() // Limpa o cache do React Query
  }

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
      value={{ accessToken, isAuthLoading, refreshTokenManually, logout }}
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
