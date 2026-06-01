export const TIERS = [
  { tier: 0, stars: '—', weight: '×0', range: '0', minTokens: 0 },
  { tier: 1, stars: '★', weight: '×1', range: '1 – 1,000', minTokens: 1 },
  { tier: 2, stars: '★★', weight: '×2', range: '1,001 – 10,000', minTokens: 1001 },
  { tier: 3, stars: '★★★', weight: '×3', range: '10,001 – 100,000', minTokens: 10001 },
  { tier: 4, stars: '★★★★', weight: '×4', range: '100,001 – 500,000', minTokens: 100001 },
  { tier: 5, stars: '★★★★★', weight: '×5', range: '500,001 – 1,000,000', minTokens: 500001 },
] as const

export const TIER_LABELS = TIERS.map((t) => t.stars)
export const TIER_WEIGHTS = TIERS.map((t) => t.weight)

export function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatBalance(s: string): string {
  const n = parseFloat(s.replace(/,/g, ''))
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2).replace(/\.?0+$/, '') + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  if (n >= 1) return n.toFixed(2).replace(/\.?0+$/, '')
  if (n >= 0.01) return n.toFixed(4).replace(/\.?0+$/, '')
  if (n > 0) return '< 0.01'
  return '0'
}

export function formatTime(isoString?: string): string {
  if (!isoString) return ''
  const d = new Date(isoString)
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

export function getTier(balance?: string): number {
  if (!balance) return 0
  const num = parseFloat(balance.replace(/,/g, ''))
  if (num >= 500_000) return 5
  if (num >= 100_000) return 4
  if (num >= 10_000) return 3
  if (num >= 1_000) return 2
  if (num > 0) return 1
  return 0
}
