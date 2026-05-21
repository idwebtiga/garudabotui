import { useAppKit, useAppKitAccount, useAppKitProvider, useDisconnect } from '@reown/appkit/react'
import { BrowserProvider, type Eip1193Provider, JsonRpcSigner } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { SiweMessage } from 'siwe'

import type { User } from '@/lib/api/types'

import { logout as apiLogout, getGuestToken, getUserInfo, verifySiwe } from '@/lib/api/auth'
import { getAccessToken } from '@/lib/api/client'
import { config } from '@/lib/config'

const CHAIN_ID = Number(config.chain.chainId)

export function useSiwe() {
  const { open } = useAppKit()
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAppKitAccount()
  const { walletProvider } = useAppKitProvider('eip155')
  const [error, setError] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [authenticatedUser, setAuthenticatedUser] = useState<null | User>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      setIsCheckingAuth(true)
      const token = getAccessToken()
      if (token && address && isConnected) {
        try {
          const user = await getUserInfo()
          if (user.ethAddress && user.ethAddress.toLowerCase() === address.toLowerCase()) {
            setAuthenticatedUser(user)
            setIsAuthenticated(true)
          }
        } catch (err) {
          console.error('Failed to check auth:', err)
        }
      }
      setIsCheckingAuth(false)
    }
    checkAuth()
  }, [address, isConnected])

  const connect = useCallback(async () => {
    setError(null)
    setIsConnecting(true)
    try {
      await open()
    } catch (err) {
      let msg = err instanceof Error ? err.message : 'Wallet connection failed'
      if (msg.includes('Cross-Origin-Opener-Policy') || msg.includes('COOP')) {
        msg = 'Wallet popup blocked by browser security. Please allow popups for this site.'
      }
      setError(msg)
    } finally {
      setIsConnecting(false)
    }
  }, [open])

  const signIn = useCallback(async (): Promise<null | User> => {
    if (!walletProvider || !address) return null
    setIsLoading(true)
    setError(null)

    try {
      const nonce = Math.random().toString(36).substring(2, 10)
      const msg = new SiweMessage({
        address,
        chainId: CHAIN_ID,
        domain: window.location.host,
        nonce,
        statement: 'Sign in with Ethereum to VIBE',
        uri: window.location.origin,
        version: '1',
      })
      const message = msg.prepareMessage()
      const signerProvider = new BrowserProvider(walletProvider as Eip1193Provider, CHAIN_ID)
      const signer = new JsonRpcSigner(signerProvider, address)
      const signature = await signer.signMessage(message)
      const user = await verifySiwe(message, signature)
      setAuthenticatedUser(user)
      setIsAuthenticated(true)
      return user
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [walletProvider, address])

  const disconnectWallet = useCallback(async () => {
    setAuthenticatedUser(null)
    setIsAuthenticated(false)
    try {
      await disconnect()
    } catch (err) {
      console.error('Disconnect error:', err)
    }
    apiLogout()
    try {
      const guestUser = await getGuestToken()
      return guestUser ?? null
    } catch (err) {
      console.error('Failed to create guest after disconnect:', err)
      return null
    }
  }, [disconnect])

  return {
    address,
    authenticatedUser,
    connect,
    disconnect: disconnectWallet,
    error,
    isAuthenticated,
    isCheckingAuth,
    isConnected,
    isConnecting,
    isLoading,
    signIn,
  }
}
