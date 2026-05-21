import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useTokenSnapshots } from '@/hooks/use-token-snapshots'
import { config } from '@/lib/config'
import { scrollByPages } from '@/lib/scroll'
import { truncateAddress, formatBalance, TIERS } from '@/lib/format'

type Tab = 'buy' | 'leaderboard'

const tokenAddress = config.chain.tokenAddress

const tokenPrice = {
  current: 0.0427,
  change24h: 12.4,
}

function Content3() {
  const { snapshots, loading, error } = useTokenSnapshots()
  const [tab, setTab] = useState<Tab>('buy')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(tokenAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="scrollbar-hide flex-1 overflow-y-auto">
        {tab === 'buy' ? (
          <div key="buy">
            <div className="sticky top-0 border-b border-robot-800 bg-robot-950/90 backdrop-blur-sm px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-white font-heading">🪙 Get GARUDA</h2>
                  <p className="mt-0.5 text-xs text-robot-300">Acquire GARUDA on BSC</p>
                </div>
                <button onClick={() => scrollByPages('left')} className="cursor-pointer text-xs text-primary-400 hover:text-primary-300 transition-colors shrink-0 font-medium">
                  ← Back to Chat
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="rounded-xl border border-robot-800 bg-robot-900/50 p-5">
                <h3 className="text-sm font-semibold text-white font-heading">GARUDA Token</h3>
                <p className="mt-1.5 text-xs text-robot-300 leading-relaxed">
                  GARUDA is a BEP-20 token on Binance Smart Chain (BSC), freely tradeable on
                  PancakeSwap. Holding GARUDA grants proportional influence over the AI's
                  behavioral direction — the more you hold, the greater your voice in shaping
                  Garuda BOT's collective personality.
                </p>
              </div>

              <div className="rounded-xl border border-robot-800 bg-robot-900/50 p-5">
                <h3 className="text-sm font-semibold text-white font-heading">Community Governance</h3>
                <p className="mt-1.5 text-xs text-robot-300 leading-relaxed">
                  No single entity controls Garuda BOT's direction. Governance is distributed
                  across the token-holding community, with influence determined by on-chain
                  balances — making the system transparent, auditable, and resistant to
                  unilateral manipulation.
                </p>
              </div>

              <div className="rounded-xl border border-robot-800 bg-robot-900/50 p-5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-robot-400">Current Price</p>
                    <p className="mt-0.5 text-3xl font-bold text-white font-heading">
                      ${tokenPrice.current.toFixed(4)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2.5 py-1 text-sm font-medium text-green-400">
                      ▲ +{tokenPrice.change24h}%
                    </div>
                    <p className="mt-1 text-xs text-robot-400">24h Change</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-robot-400">Contract Address</p>
                <div className="flex items-center gap-2 rounded-xl border border-robot-800 bg-robot-900/50 px-4 py-3">
                  <code className="flex-1 truncate text-xs text-amber-400 font-mono">
                    {tokenAddress}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="shrink-0 cursor-pointer rounded-lg bg-robot-800 px-3 py-1.5 text-xs text-robot-300 transition-colors hover:bg-robot-700 hover:text-white"
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <a
                href={`https://pancakeswap.finance/swap?outputCurrency=${tokenAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="robot-amber" size="md" className="w-full">
                  🥞 Buy GARUDA on PancakeSwap
                </Button>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://dexscreener.com/bsc/${tokenAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-robot-800 py-2.5 text-xs text-robot-300 transition-colors hover:bg-robot-700 hover:text-white"
                >
                  📈 Chart
                </a>
                <a
                  href={`https://bscscan.com/token/${tokenAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-robot-800 py-2.5 text-xs text-robot-300 transition-colors hover:bg-robot-700 hover:text-white"
                >
                  🔗 Contract
                </a>
              </div>

              <div className="rounded-xl border border-robot-800 bg-robot-900/50 p-5">
                <h3 className="text-sm font-semibold text-white font-heading">Influence Tiers</h3>
                <p className="mt-1 text-xs text-robot-300">
                  Your token balance determines your influence tier and conversation weight
                </p>
                <div className="mt-4 space-y-1">
                  {TIERS.map((t) => (
                    <div
                      key={t.tier}
                      className="flex items-center gap-3 rounded-lg bg-robot-950/50 px-3 py-2"
                    >
                      <span className="w-16 text-center text-sm text-amber-400 font-medium">
                        {t.stars}
                      </span>
                      <span className="w-8 text-center text-xs text-robot-400 font-mono">
                        {t.weight}
                      </span>
                      <span className="flex-1 text-right text-xs text-neutral-500">
                        {t.range}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div key="leaderboard">
            <div className="sticky top-0 border-b border-robot-800 bg-robot-950/90 backdrop-blur-sm px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-white font-heading">👑 Influence Leaderboard</h2>
                  <p className="mt-0.5 text-xs text-robot-300">Top GARUDA holders by balance</p>
                </div>
                <button onClick={() => scrollByPages('left')} className="cursor-pointer text-xs text-primary-400 hover:text-primary-300 transition-colors shrink-0 font-medium">
                  ← Back to Chat
                </button>
              </div>
            </div>

            {loading && snapshots.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary-400 border-t-transparent" />
              </div>
            ) : error && snapshots.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            ) : snapshots.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <p className="text-sm text-robot-400">No token holders yet</p>
              </div>
            ) : (
              <div className="divide-y divide-robot-800/50">
                {snapshots.map((s, i) => (
                  <div key={s.userId} className="flex items-center gap-2 px-6 py-3 hover:bg-robot-900/30 transition-colors">
                    <span className="w-5 text-center text-sm font-medium text-robot-400">
                      {i + 1}
                    </span>
                    <img
                      src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${s.ethAddress.toLowerCase()}`}
                      alt=""
                      className="w-8 h-8 rounded-full shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="block truncate text-sm text-white font-mono">
                        {truncateAddress(s.ethAddress)}
                      </span>
                      <span className="block truncate text-xs text-robot-400">
                        {s.aiPersonality}
                      </span>
                    </div>
                    <div className="hidden sm:block w-24">
                      <div className="h-1.5 rounded-full bg-robot-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary-600 to-amber-400 transition-all"
                          style={{ width: `${Math.min(s.percentage, 100)}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-robot-500 w-10 text-right font-mono">
                      {s.percentage.toFixed(1)}%
                    </span>
                    <span className="text-sm font-medium text-primary-400 w-16 text-right">
                      {formatBalance(s.formattedBalance)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex border-t border-robot-800">
        <button
          onClick={() => setTab('buy')}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-4 text-sm font-medium transition-colors ${
            tab === 'buy'
              ? 'text-primary-400 border-t-2 border-primary-400'
              : 'text-robot-300 border-t-2 border-transparent hover:text-robot-100 hover:bg-robot-900/30'
          }`}
        >
          <span className="text-lg">🪙</span>
          <span className="text-[11px]">Get GARUDA</span>
        </button>
        <button
          onClick={() => setTab('leaderboard')}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-4 text-sm font-medium transition-colors ${
            tab === 'leaderboard'
              ? 'text-primary-400 border-t-2 border-primary-400'
              : 'text-robot-300 border-t-2 border-transparent hover:text-robot-100 hover:bg-robot-900/30'
          }`}
        >
          <span className="text-lg">👑</span>
          <span className="text-[11px]">Leaderboard</span>
        </button>
      </div>
    </div>
  )
}

export default Content3
