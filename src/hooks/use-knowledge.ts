import { useEffect, useState } from 'react'

import type { Document } from '@/lib/api/types'

import { getDocuments } from '@/lib/api/knowledge'

export function useKnowledge() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      try {
        const data = await getDocuments()
        if (!cancelled) setDocuments(data)
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load documents')
          console.error(err)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => {
      cancelled = true
    }
  }, [])

  return { documents, error, loading }
}
