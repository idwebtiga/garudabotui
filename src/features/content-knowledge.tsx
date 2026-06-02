import { useCallback, useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useKnowledge, useDocumentDetail } from '@/hooks/use-knowledge'
import { scrollByPages } from '@/lib/scroll'
import { formatTime } from '@/lib/format'

const markdownComponents = {
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-bold text-white">{children}</strong>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="italic text-primary-300">{children}</em>
  ),
  code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement> & { className?: string; children?: React.ReactNode }) => {
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
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <img src={src} alt={alt ?? ''} className="my-2 max-w-full rounded-lg" />
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      className="underline text-primary-300 hover:text-primary-200"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="my-2 overflow-x-auto">
      <table className="w-full text-xs border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="border border-robot-600 px-2 py-1 text-left font-medium">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="border border-robot-600 px-2 py-1">{children}</td>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="my-2 border-l-2 border-primary-400 pl-3 text-neutral-400 italic">
      {children}
    </blockquote>
  ),
}

function Knowledge() {
  const { documents, loading, error, loadingMore, loadMore, nextCursor } = useKnowledge()
  const { detail, loading: detailLoading, error: detailError, fetchDetail, clear } = useDocumentDetail()
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const handleRowClick = useCallback(
    (id: number) => {
      if (expandedId === id) {
        setExpandedId(null)
        clear()
      } else {
        setExpandedId(id)
        fetchDetail(id)
      }
    },
    [expandedId, clear, fetchDetail],
  )

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore()
      },
      { threshold: 0.1 },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadMore])

  return (
    <>
      <div className="sticky top-0 border-b border-robot-800 bg-robot-950/90 backdrop-blur-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-white font-heading">📚 Knowledge</h2>
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
            <div key={doc.id}>
              <button
                onClick={() => handleRowClick(doc.id)}
                className={`w-full text-left px-6 py-4 transition-colors cursor-pointer ${
                  expandedId === doc.id ? 'bg-robot-900/50' : 'hover:bg-robot-900/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  {doc.emoji && <span className="text-base shrink-0">{doc.emoji}</span>}
                  <h3 className="text-sm font-semibold text-white flex-1 min-w-0 truncate">{doc.title}</h3>
                  {doc.stance && (
                    <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-robot-800 text-robot-300 border border-robot-700">
                      {doc.stance}
                    </span>
                  )}
                  <span className="shrink-0 text-[11px] text-robot-500">{formatTime(doc.updatedAt)}</span>
                </div>
              </button>

              {expandedId === doc.id && (
                <div className="px-6 pb-5 border-t border-robot-800/50">
                  {detailLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-primary-400 border-t-transparent" />
                    </div>
                  ) : detailError ? (
                    <p className="text-sm text-red-400 py-4">{detailError}</p>
                  ) : detail ? (
                    <div className="text-sm leading-relaxed text-neutral-300 space-y-1 pt-4 [&>p]:my-1 [&>ul]:pl-4 [&>ol]:pl-4 [&>li]:my-0.5">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                        {detail.content}
                      </ReactMarkdown>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          ))}

          {loadingMore && (
            <div className="flex items-center justify-center py-4">
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-primary-400 border-t-transparent" />
            </div>
          )}

          {nextCursor === null && documents.length > 0 && (
            <div className="py-4 text-center">
              <p className="text-xs text-robot-500">No more documents</p>
            </div>
          )}

          <div ref={sentinelRef} className="h-px" />
        </div>
      )}
    </>
  )
}

export default Knowledge
