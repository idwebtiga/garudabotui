import { ethers } from 'ethers'
import { useTokenSnapshots } from '@/hooks/use-token-snapshots'
import { scrollByPages } from '@/lib/scroll'
import { TIERS, truncateAddress, formatBalance } from '@/lib/format'

function Leaderboard() {
  const { snapshots, loading, error } = useTokenSnapshots()

  return (
    <>
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
          {snapshots.map((s, i) => {
            return (
              <div key={s.userId} className="px-6 py-3 hover:bg-robot-900/30 transition-colors">
                <div className="flex items-center gap-2">
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
                    {formatBalance(ethers.formatEther(s.rawBalance))}
                  </span>
                </div>
                <div className="mt-1.5 ml-[52px] rounded-lg bg-robot-900/40 border border-robot-800/50 px-3 py-1.5">
                  <p className="text-sm text-amber-400/90 font-medium leading-snug">
                    Tier {s.tier} {TIERS[s.tier]?.stars} {TIERS[s.tier]?.weight}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Leaderboard
