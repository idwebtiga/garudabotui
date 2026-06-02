import type { SnapshotListResponse } from './types'

import { client } from './client'
import { ApiError, handleApiError } from './errors'

export async function getTokenSnapshots(): Promise<SnapshotListResponse> {
  const { data, error } = await client.GET('/api/token-snapshot')
  if (error) handleApiError(error, 'Failed to fetch token snapshots')
  if (!data) throw new ApiError('Empty response from server')
  return data
}
