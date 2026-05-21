export const config = {
  chain: {
    chainId: Number(import.meta.env.VITE_CHAIN_ID ?? 97),
    rpcUrl: import.meta.env.VITE_RPC_URL ?? 'https://bsc-testnet.drpc.org',
    tokenAddress: import.meta.env.VITE_TOKEN_ADDRESS ?? '0xd810c8C075EbE02C77F88846631E4c44Aa540F58',
  },
  reownConfig: {
    projectDescription: import.meta.env.VITE_REOWN_PROJECT_DESCRIPTION ?? 'VIBE',
    projectIcon: import.meta.env.VITE_REOWN_PROJECT_ICON ?? 'http://localhost:5173/icon.svg',
    projectId: import.meta.env.VITE_REOWN_PROJECT_ID ?? '',
    projectName: import.meta.env.VITE_REOWN_PROJECT_NAME ?? 'VIBE',
    projectUrl: import.meta.env.VITE_REOWN_PROJECT_URL ?? 'http://localhost:5173/',
  },
}
