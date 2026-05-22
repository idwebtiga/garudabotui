import { useState, useEffect, useRef } from 'react'
import { ChatBubble } from '@/components/ui/chat-bubble'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { useChat } from '@/hooks/use-chat'
import { scrollByPages } from '@/lib/scroll'
import { TIER_LABELS, TIER_WEIGHTS, truncateAddress, formatTime, getTier, formatBalance } from '@/lib/format'
import ContentAuth from './content-auth'

function Content2() {
  const { user } = useAuth()
  const [view, setView] = useState<'chat' | 'auth'>('chat')
  const chat = useChat()
  const { loadMessages } = chat
  const [input, setInput] = useState('')

  useEffect(() => {
    loadMessages()
  }, [loadMessages, user])

  const isAuthed = !user?.isGuest
  const tokenBalance = user?.tokenBalance?.formatted ?? ''

  const handleSend = () => {
    if (!input.trim() || chat.sending) return
    chat.sendMessage(input.trim())
    setInput('')
  }

  const chatRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [chat.messages])

  useEffect(() => {
    if (!chat.sending && inputRef.current) {
      inputRef.current.focus()
    }
  }, [chat.sending])

  if (view === 'auth') {
    return <ContentAuth onBack={() => setView('chat')} />
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center gap-3 border-b border-robot-800 px-4 py-3">
        {isAuthed && user ? (
          <>
            <img
              src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${user.ethAddress.toLowerCase()}`}
              alt=""
              className="h-10 w-10 rounded-full shrink-0 ring-2 ring-amber-400/30"
            />
            <div className="flex-1 text-left min-w-0">
              <p className="font-semibold text-white font-heading tracking-wide truncate">
                {truncateAddress(user.ethAddress)}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-600 to-primary-400 ring-2 ring-primary-500/30 shrink-0" />
            <div className="flex-1 text-left min-w-0">
              <p className="font-semibold text-white font-heading tracking-wide truncate">
                Garuda BOT
              </p>
              <p className="text-xs text-robot-300">Community-Governed AI</p>
            </div>
          </>
        )}
        <button
          onClick={() => scrollByPages('right')}
          className="cursor-pointer text-xs text-amber-400 hover:text-amber-300 transition-colors shrink-0 font-medium"
        >
          Get GARUDA
        </button>
        {isAuthed ? (
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-amber-400 text-sm font-medium">
              {TIER_LABELS[getTier(tokenBalance)]}
            </span>
            <button
              onClick={() => setView('auth')}
              className="cursor-pointer rounded-lg px-2.5 py-1.5 text-xs text-robot-300 transition-colors hover:bg-robot-800 hover:text-red-400"
            >
              ⚡ Profile
            </button>
          </div>
        ) : (
          <Button variant="robot" size="sm" onClick={() => setView('auth')}>
            ⚡ Sign In
          </Button>
        )}
      </div>

      {isAuthed && user && (
        <div className="flex items-center gap-2 border-b border-robot-800/50 bg-robot-900/30 px-4 py-2 text-xs text-robot-300">
          <span>{truncateAddress(user.ethAddress)}</span>
          <span className="text-neutral-600">·</span>
          <span>{tokenBalance ? formatBalance(tokenBalance) : '0'} GARUDA</span>
          <span className="text-neutral-600">·</span>
          <span className="text-amber-400 font-medium">
            {TIER_WEIGHTS[getTier(tokenBalance)]} weight
          </span>
        </div>
      )}

      <div ref={chatRef} className="scrollbar-hide flex-1 space-y-3 overflow-y-auto p-4">
        {chat.messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            sender={msg.role === 'assistant' ? 'ai' : 'user'}
            text={msg.content}
            time={formatTime(msg.createdAt)}
          />
        ))}
      </div>

      <div className="border-t border-robot-800 p-4">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder={isAuthed ? 'Shape the conversation...' : 'Type a message...'}
            className="flex-1 rounded-xl bg-robot-800 px-4 py-2.5 text-sm text-white outline-none placeholder:text-robot-300 ring-1 ring-robot-700 focus:ring-primary-400 transition-all"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            disabled={chat.sending}
          />
          <Button variant="primary" size="md" onClick={handleSend} disabled={!input.trim() || chat.sending}>
            {chat.sending ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Sending...
              </>
            ) : 'Send'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Content2
