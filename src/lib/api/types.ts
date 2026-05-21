import type { components } from '@/openapi'

export type Message = components['schemas']['ChatMessage']
export type SnapshotItem = components['schemas']['SnapshotItem']
export type SnapshotListResponse = components['schemas']['SnapshotListResponse']
export type User = components['schemas']['AuthUser'] & {
  tokenBalance?: components['schemas']['TokenBalance']
}
export type UserInfoResponse = components['schemas']['UserInfoResponse']
