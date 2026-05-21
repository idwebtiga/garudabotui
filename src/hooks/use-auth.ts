import { useContext } from 'react'

import type { AuthState } from '@/context/AuthContext'

import { AuthContext } from '@/context/AuthContext'

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
