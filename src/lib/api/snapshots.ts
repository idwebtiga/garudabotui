import type { SnapshotListResponse } from './types'

import { client } from './client'
import { handleApiError } from './errors'

export async function getTokenSnapshots(): Promise<SnapshotListResponse> {
  const { data, error } = await client.GET('/api/token-snapshot/')
  if (error) handleApiError(error, 'Failed to fetch token snapshots')
  return data
}
