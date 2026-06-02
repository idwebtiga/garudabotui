import type { Document, DocumentDetail, DocumentFeedResponse } from './types'

import { client } from './client'
import { ApiError, handleApiError } from './errors'

export async function getDocuments(): Promise<Document[]> {
  const { data, error } = await client.GET('/api/knowledge/documents')
  if (error) handleApiError(error, 'Failed to fetch documents')
  if (!data) throw new ApiError('Empty response from server')
  return data
}

export async function getDocumentFeed(cursor?: number): Promise<DocumentFeedResponse> {
  const { data, error } = await client.GET('/api/knowledge/documents/feed', {
    params: { query: { cursor } } as never,
  })
  if (error) handleApiError(error, 'Failed to fetch document feed')
  if (!data) throw new ApiError('Empty response from server')
  return data
}

export async function getDocumentDetail(id: number): Promise<DocumentDetail> {
  const { data, error } = await client.GET('/api/knowledge/documents/{id}', {
    params: { path: { id } },
  })
  if (error) handleApiError(error, 'Failed to fetch document')
  if (!data) throw new ApiError('Empty response from server')
  return data
}
