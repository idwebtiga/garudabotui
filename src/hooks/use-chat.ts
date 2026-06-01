import { useCallback, useState } from 'react'

import type { Message } from '@/lib/api/types'

import { getMessages, sendMessage as sendMessageApi } from '@/lib/api/chat'

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const loadMessages = useCallback(async () => {
    try {
      const msgs = await getMessages()
      setMessages(msgs)
      setError(null)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load messages'
      setError(msg)
    }
  }, [])

  const sendMessage = useCallback(async (message: string) => {
    setSending(true)
    setError(null)
    try {
      await sendMessageApi(message)
      await loadMessages()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to send message'
      setError(msg)
    } finally {
      setSending(false)
    }
  }, [loadMessages])

  return { error, messages, sending, sendMessage, loadMessages }
}
