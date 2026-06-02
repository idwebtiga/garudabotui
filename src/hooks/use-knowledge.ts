import { useCallback, useEffect, useRef, useState } from 'react'

import type { DocumentDetail, DocumentFeedItem } from '@/lib/api/types'

import { getDocumentDetail, getDocumentFeed } from '@/lib/api/knowledge'

export function useKnowledge() {
  const [documents, setDocuments] = useState<DocumentFeedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [nextCursor, setNextCursor] = useState<number | null>(null)
  const cursorRef = useRef<number | null>(null)

  const loadMore = useCallback(async () => {
    if (loadingMore || nextCursor === null) return
    setLoadingMore(true)
    try {
      const data = await getDocumentFeed(nextCursor)
      setDocuments((prev) => [...prev, ...data.documents])
      setNextCursor(data.nextCursor)
      cursorRef.current = data.nextCursor
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingMore(false)
    }
  }, [loadingMore, nextCursor])

  useEffect(() => {
    let cancelled = false

    const fetchInitial = async () => {
      try {
        const data = await getDocumentFeed()
        if (!cancelled) {
          setDocuments(data.documents)
          setNextCursor(data.nextCursor)
          cursorRef.current = data.nextCursor
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load documents')
          console.error(err)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchInitial()
    return () => {
      cancelled = true
    }
  }, [])

  return { documents, error, loading, loadingMore, loadMore, nextCursor }
}

export function useDocumentDetail() {
  const [detail, setDetail] = useState<DocumentDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const abortRef = useRef<AbortController | null>(null)

  const fetchDetail = useCallback(async (id: number) => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)
    setDetail(null)
    try {
      const data = await getDocumentDetail(id)
      if (!controller.signal.aborted) setDetail(data)
    } catch (err) {
      if (!controller.signal.aborted) {
        setError('Failed to load document')
        console.error(err)
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false)
    }
  }, [])

  const clear = useCallback(() => {
    abortRef.current?.abort()
    setDetail(null)
    setLoading(false)
    setError(null)
  }, [])

  return { detail, loading, error, fetchDetail, clear }
}
