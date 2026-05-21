import createClient from 'openapi-fetch'

import type { paths } from '@/openapi'

export const ACCESS_TOKEN_KEY = 'accessToken'

export function getAccessToken(): null | string {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function removeAccessToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

export function setAccessToken(token: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export const client = createClient<paths>({
  baseUrl: '',
  fetch(input: Request) {
    const token = getAccessToken()
    if (token) {
      const headers = new Headers(input.headers)
      headers.set('Authorization', `Bearer ${token}`)
      return fetch(new Request(input, { headers }))
    }
    return fetch(input)
  },
})
