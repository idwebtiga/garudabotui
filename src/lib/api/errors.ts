export class ApiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export function handleApiError(error: unknown, fallback: string): never {
  const msg =
    error && typeof error === 'object' && 'message' in error
      ? String((error as { message: string }).message)
      : fallback
  throw new ApiError(msg)
}
