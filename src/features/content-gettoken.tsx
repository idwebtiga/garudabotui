import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { config } from '@/lib/config'
import { scrollByPages } from '@/lib/scroll'
import { getTokenPrice } from '@/lib/price'
import type { TokenPriceData } from '@/lib/price'

const tokenAddress = config.chain.tokenAddress

function GetToken() {
  const [copied, setCopied] = useState(false)
  const [priceData, setPriceData] = useState<TokenPriceData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTokenPrice()
      .then(setPriceData)
      .catch(() => setPriceData(null))
      .finally(() => setLoading(false))
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(tokenAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
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
            Garuda BOT's collective personality. No single entity controls the AI;
            governance is distributed across the token-holding community, with influence
            determined by on-chain balances — transparent, auditable, and resistant to
            unilateral manipulation.
          </p>
        </div>

        <div className="rounded-xl border border-robot-800 bg-robot-900/50 p-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-robot-400">Current Price</p>
              <p className="mt-0.5 text-3xl font-bold text-white font-heading">
                {loading ? '...' : priceData ? `$${priceData.current.toFixed(8)}` : '—'}
              </p>
            </div>
            <div className="text-right">
              {priceData && (
                <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-medium ${priceData.isUp ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {priceData.isUp ? '▲' : '▼'} {priceData.changePercent.toFixed(1)}%
                </div>
              )}
              <p className="mt-1 text-xs text-robot-400">Since Launch</p>
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
            href={`https://www.geckoterminal.com/bsc/pools/${tokenAddress}`}
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

      </div>
    </>
  )
}

export default GetToken
