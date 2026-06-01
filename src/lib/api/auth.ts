import type { User } from './types'

import { client, getAccessToken, removeAccessToken, setAccessToken } from './client'
import { ApiError, handleApiError } from './errors'

export async function getGuestToken(): Promise<User> {
  const { data, error } = await client.POST('/api/authsiwe/guest')
  if (error) handleApiError(error, 'Failed to create guest')
  if (!data) throw new ApiError('Empty response from server')
  setAccessToken(data.accessToken)
  return data.user
}

export async function getUserInfo(): Promise<User> {
  const token = getAccessToken()
  if (!token) throw new Error('No access token')
  const { data, error } = await client.GET('/api/authsiwe/userinfo')
  if (error) handleApiError(error, 'Failed to get user info')
  if (!data) throw new ApiError('Empty response from server')
  return data
}

export function logout(): void {
  removeAccessToken()
}

export async function verifySiwe(message: string, signature: string): Promise<User> {
  const { data, error } = await client.POST('/api/authsiwe/verify', {
    body: { message, signature },
  })
  if (error) handleApiError(error, 'Failed to verify SIWE')
  if (!data) throw new ApiError('Empty response from server')
  setAccessToken(data.accessToken)
  return data.user
}
