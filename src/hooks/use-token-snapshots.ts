import { useEffect, useState } from 'react'

import type { SnapshotItem } from '@/lib/api/types'

import { getTokenSnapshots } from '@/lib/api/snapshots'

export function useTokenSnapshots() {
  const [snapshots, setSnapshots] = useState<SnapshotItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      try {
        const data = await getTokenSnapshots()
        if (!cancelled) setSnapshots(data.snapshots)
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load snapshots')
          console.error(err)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()

    const interval = setInterval(fetchData, 60000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  return { error, loading, snapshots }
}
