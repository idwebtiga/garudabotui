import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useKnowledge } from '@/hooks/use-knowledge'
import { scrollByPages } from '@/lib/scroll'
import { formatTime } from '@/lib/format'

function Knowledge() {
  const { documents, loading, error } = useKnowledge()

  return (
    <>
      <div className="sticky top-0 border-b border-robot-800 bg-robot-950/90 backdrop-blur-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-white font-heading">Knowledge</h2>
            <p className="mt-0.5 text-xs text-robot-300">Published documents</p>
          </div>
          <button
            onClick={() => scrollByPages('left')}
            className="cursor-pointer text-xs text-primary-400 hover:text-primary-300 transition-colors shrink-0 font-medium"
          >
            ← Back to Chat
          </button>
        </div>
      </div>

      {loading && documents.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary-400 border-t-transparent" />
        </div>
      ) : error && documents.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      ) : documents.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-robot-400">No documents yet</p>
        </div>
      ) : (
        <div className="divide-y divide-robot-800/50">
          {documents.map((doc) => (
            <div key={doc.id} className="px-6 py-5 hover:bg-robot-900/30 transition-colors">
              <h3 className="text-sm font-semibold text-white mb-1">{doc.title}</h3>
              <div className="text-sm leading-relaxed text-neutral-300 space-y-1 [&>p]:my-1 [&>ul]:pl-4 [&>ol]:pl-4 [&>li]:my-0.5">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    strong: ({ children }) => (
                      <strong className="font-bold text-white">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-primary-300">{children}</em>
                    ),
                    code: ({ className, children, ...props }) => {
                      const isInline = !className
                      return isInline ? (
                        <code
                          className="rounded bg-robot-800 px-1 py-0.5 text-primary-300 text-xs font-mono"
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
                      <img src={src} alt={alt ?? ''} className="my-2 max-w-full rounded-lg" />
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
                  {doc.content}
                </ReactMarkdown>
              </div>
              <p className="mt-2 text-[11px] text-robot-500">{formatTime(doc.updatedAt)}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Knowledge
