import type { Message } from './types'

import { client } from './client'
import { handleApiError } from './errors'

export async function getMessages(): Promise<Message[]> {
  const { data, error } = await client.GET('/api/chat/messages')
  if (error) handleApiError(error, 'Failed to fetch messages')
  return data
}

export async function sendMessage(message: string): Promise<{ reply: string }> {
  const { data, error } = await client.POST('/api/chat/chat', {
    body: { message },
  })
  if (error) handleApiError(error, 'Failed to chat')
  return data
}
