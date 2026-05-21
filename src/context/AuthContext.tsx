/* eslint-disable react-refresh/only-export-components */

import { createContext, type ReactNode, useEffect, useState } from 'react'

import type { User } from '@/lib/api/types'

import { getGuestToken, getUserInfo } from '@/lib/api/auth'
import { getAccessToken } from '@/lib/api/client'

export interface AuthState {
  loading: boolean
  setShowLogin: (show: boolean) => void
  showLogin: boolean
  updateUser: (user: User) => void
  user: null | User
}

export const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<null | User>(null)
  const [loading, setLoading] = useState(true)
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    const token = getAccessToken()
    if (token) {
      getUserInfo()
        .then(setUser)
        .catch(() => getGuestToken().then(setUser))
        .finally(() => setLoading(false))
    } else {
      getGuestToken()
        .then(setUser)
        .finally(() => setLoading(false))
    }
  }, [])

  const updateUser = (newUser: User) => {
    setUser(newUser)
  }

  const value = { loading, setShowLogin, showLogin, updateUser, user }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
