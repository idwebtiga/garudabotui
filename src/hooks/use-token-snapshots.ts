import { useCallback, useEffect, useState } from 'react'

import type { SnapshotItem } from '@/lib/api/types'

import { getTokenSnapshots } from '@/lib/api/snapshots'

export function useTokenSnapshots() {
  const [snapshots, setSnapshots] = useState<SnapshotItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)

  const fetch = useCallback(async () => {
    try {
      const data = await getTokenSnapshots()
      setSnapshots(data.snapshots)
    } catch (err) {
      setError('Failed to load snapshots')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
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
    })()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
      setLoading(true)
      setError(null)
      try {
        await fetch()
      } catch (err) {
        setError('Failed to refresh snapshots')
        console.error(err)
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [fetch])

  return { error, loading, snapshots }
}
