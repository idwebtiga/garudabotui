import type { Document } from './types'

import { client } from './client'
import { ApiError, handleApiError } from './errors'

export async function getDocuments(): Promise<Document[]> {
  const { data, error } = await client.GET('/api/knowledge/documents')
  if (error) handleApiError(error, 'Failed to fetch documents')
  if (!data) throw new ApiError('Empty response from server')
  return data
}
