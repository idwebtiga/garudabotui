import { ethers } from 'ethers'
import { config } from '@/lib/config'

const PANCAKE_ROUTER = '0x10ED43C718714eb63d5aA57B78B54704E256024E'
const BSC_USDT = '0x55d398326f99059fF775485246999027B3197955'

const ROUTER_ABI = [
  'function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)',
]

const INITIAL_PRICE = 1 / 15000

export interface TokenPriceData {
  current: number
  changePercent: number
  isUp: boolean
}

export async function getTokenPrice(): Promise<TokenPriceData> {
  const provider = new ethers.JsonRpcProvider(config.chain.rpcUrl)
  const router = new ethers.Contract(PANCAKE_ROUTER, ROUTER_ABI, provider)
  const amounts = await router.getAmountsOut(BigInt(1e18), [config.chain.tokenAddress, BSC_USDT])
  const current = Number(ethers.formatEther(amounts[1]))
  const changePercent = ((current - INITIAL_PRICE) / INITIAL_PRICE) * 100
  return { current, changePercent, isUp: changePercent >= 0 }
}
