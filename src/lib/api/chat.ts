import type { Message } from './types'

import { client } from './client'
import { ApiError, handleApiError } from './errors'

export async function getMessages(): Promise<Message[]> {
  const { data, error } = await client.GET('/api/chat/messages')
  if (error) handleApiError(error, 'Failed to fetch messages')
  if (!data) throw new ApiError('Empty response from server')
  return data
}

export async function sendMessage(message: string): Promise<{ reply: string }> {
  const { data, error } = await client.POST('/api/chat/chat', {
    body: { message },
  })
  if (error) handleApiError(error, 'Failed to chat')
  if (!data) throw new ApiError('Empty response from server')
  return data
}
