import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'
import { memo, type ComponentProps } from 'react'

interface ChatBubbleProps {
  text: string
  sender: 'ai' | 'user'
  time: string
}

type CodeProps = ComponentProps<'code'> & { className?: string }

const ChatBubble = memo(function ChatBubble({ text, sender, time }: ChatBubbleProps) {
  return (
    <div className={`flex ${sender === 'ai' ? 'justify-start' : 'justify-end'}`}>
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-2',
          sender === 'ai'
            ? 'rounded-tl-sm bg-robot-800 text-neutral-100'
            : 'rounded-tr-sm bg-primary-600 text-white',
        )}
      >
        <div className="flex items-center gap-2 mb-1.5 text-[11px] opacity-70">
          <span className="font-medium">{sender === 'ai' ? 'Garuda BOT' : 'You'}</span>
          <span className="opacity-60">{time}</span>
        </div>
        {sender === 'ai' ? (
          <div className="text-sm leading-relaxed space-y-1 [&>p]:my-1">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                strong: ({ children }) => (
                  <strong className="font-bold text-white">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-primary-300">{children}</em>
                ),
                code: ({ className, children, ...props }: CodeProps) => {
                  const isInline = !className
                  return isInline ? (
                    <code
                      className="rounded bg-robot-700 px-1 py-0.5 text-primary-300 text-xs font-mono"
                      {...props}
                    >
                      {children}
                    </code>
                  ) : (
                    <pre className="my-2 overflow-x-auto rounded-lg bg-robot-950 p-3 text-xs font-mono text-primary-300">
                      <code className="block" {...props}>
                        {children}
                      </code>
                    </pre>
                  )
                },
                img: ({ src, alt }) => (
                  <img
                    src={src}
                    alt={alt ?? ''}
                    className="my-2 max-w-full rounded-lg"
                  />
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="underline text-primary-300 hover:text-primary-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                table: ({ children }) => (
                  <div className="my-2 overflow-x-auto">
                    <table className="w-full text-xs border-collapse">{children}</table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-robot-600 px-2 py-1 text-left font-medium">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-robot-600 px-2 py-1">{children}</td>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="my-2 border-l-2 border-primary-400 pl-3 text-neutral-400 italic">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {text}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm leading-relaxed font-medium">{text}</p>
        )}
      </div>
    </div>
  )
})

export { ChatBubble }
