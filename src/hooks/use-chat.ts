import { useCallback, useState } from 'react'

import type { Message } from '@/lib/api/types'

import { getMessages, sendMessage as sendMessageApi } from '@/lib/api/chat'

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [sending, setSending] = useState(false)

  const loadMessages = useCallback(async () => {
    try {
      const msgs = await getMessages()
      setMessages(msgs)
    } catch (err) {
      console.error('Failed to load messages:', err)
    }
  }, [])

  const sendMessage = useCallback(async (message: string) => {
    setSending(true)
    try {
      await sendMessageApi(message)
      await loadMessages()
    } catch (err) {
      console.error('Failed to send message:', err)
    } finally {
      setSending(false)
    }
  }, [loadMessages])

  return { messages, sending, sendMessage, loadMessages }
}
