# Garuda BOT

A decentralized, community-governed conversational AI platform designed for Indonesia — where $GARUDA token holdings determine your weighted influence over the AI's evolution.

**Live at [garudabot.web.id](https://garudabot.web.id)**

---

## Overview

Garuda BOT is an AI assistant whose personality and knowledge base evolve through token-weighted community interactions. Unlike conventional AI governed by a single authority, Garuda BOT's behavioral direction is shaped collectively by its token-holding community — with each participant's influence weighted proportionally to their $GARUDA balance.

The project prioritizes Indonesian cultural identity, addressing local topics: national current affairs, culture, education, and community economics. The long-term vision is a distinctly Indonesian AI persona — collectively authored by and accountable to its community.

## Key Features

- **Community-Shaped AI** — Token-weighted conversations feed into the AI's evolving personality
- **Indonesian at Heart** — Built around Indonesian language, culture, and values
- **Token-Weighted Influence** — $GARUDA tokens (BEP-20 on BSC) determine your conversation weight tier
- **No Central Authority** — Governance distributed across the token-holding community
- **Guest-Friendly** — Chat freely without sign-in; connect a wallet to activate weighted influence
- **Live Leaderboard** — See top token holders and their influence share
- **Transparent** — All holdings and weights verifiable on-chain

## Influence Tiers

| Tier | Stars | Weight | Token Range |
|------|-------|--------|-------------|
| 0 | — | ×0 | 0 |
| 1 | ★ | ×1 | 1 – 1,000 |
| 2 | ★★ | ×2 | 1,001 – 10,000 |
| 3 | ★★★ | ×3 | 10,001 – 100,000 |
| 4 | ★★★★ | ×4 | 100,001 – 500,000 |
| 5 | ★★★★★ | ×5 | 500,001 – 1,000,000 |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Vite 8 + React 19 + TypeScript 6 (strict) |
| Styling | Tailwind CSS v4 (`@theme` tokens, no config file) |
| Routing | React Router DOM v7 |
| Wallet | Reown AppKit + ethers (WalletConnect) |
| Auth | SIWE (Sign-In With Ethereum) |
| API | openapi-fetch (generated types from OpenAPI spec) |
| UI | Radix UI Dialog, DiceBear avatars |
| Blockchain | BSC (BNB Smart Chain), BEP-20 tokens |

## Architecture

**Mobile** (default): 3-page horizontal scroll-snap layout — Landing → Chat → Token/Leaderboard.

**Desktop** (≥1024px): Split pane — landing page scrolls on the left, Chat and Token pages on the right with vertical swipe.

Routes:
- `/` — Main 3-page application
- `/idea` — Project whitepaper

Auth flow: Guest token on first visit (no sign-in). Wallet Connect + SIWE to authenticate and link a $GARUDA balance for weighted influence.

## Getting Started

```bash
npm install
npm run dev
```

### Environment Variables

Copy `.env` or set these in your environment:

| Variable | Description |
|----------|-------------|
| `VITE_CHAIN_ID` | BSC chain ID (97 = testnet, 56 = mainnet) |
| `VITE_TOKEN_ADDRESS` | $GARUDA BEP-20 contract address |
| `VITE_RPC_URL` | BSC RPC endpoint |
| `VITE_REOWN_PROJECT_ID` | Reown (WalletConnect) project ID |
| `VITE_REOWN_PROJECT_NAME` | App name |
| `VITE_REOWN_PROJECT_DESCRIPTION` | App description |
| `VITE_REOWN_PROJECT_URL` | App URL |
| `VITE_REOWN_PROJECT_ICON` | App icon URL |

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + Vite build |
| `npm run lint` | ESLint |
| `npm run preview` | Preview production build |
| `npm run openapi` | Regenerate `src/openapi.d.ts` from `openapi.json` |

## Project Structure

```
src/
├── App.tsx                 # Route definitions
├── main.tsx                # Entry point (BrowserRouter)
├── index.css               # Tailwind theme tokens + globals
├── components/
│   ├── ui/                 # Button, Card, Avatar, ChatBubble, StatCard, FeatureCard
│   ├── layout/             # PageShell, SwipeablePages, Container, Stack, Grid
│   └── auth/               # LoginSIWE (wallet connect modal)
├── features/               # Page content components (Content1-3, PageIdea)
├── hooks/                  # use-auth, use-chat, use-typewriter, use-siwe, etc.
├── lib/
│   ├── api/                # openapi-fetch client, auth, chat, snapshots
│   ├── data/               # Dummy data
│   ├── config.ts           # Environment config
│   ├── format.ts           # truncateAddress, formatBalance, getTier, TIERS
│   ├── scroll.ts           # scrollByPages helper
│   └── utils.ts            # cn() utility
├── context/
│   └── AuthContext.tsx      # Auth state provider
└── types/                  # Shared type helpers
```

## Links

- **App:** [garudabot.web.id](https://garudabot.web.id)
- **Token (BSCScan):** [0xd01a...8324](https://bscscan.com/token/0xd01a151be7149e58a589cf544029536ab4648324)
- **Buy on PancakeSwap:** [PCS Swap](https://pancakeswap.finance/swap?outputCurrency=0xd01a151be7149e58a589cf544029536ab4648324)
- **GitHub:** [github.com/idwebtiga/garudabotui](https://github.com/idwebtiga/garudabotui)
- **X / Twitter:** [@garudabot_](https://x.com/garudabot_)

---

*GARUDA tokens are a governance utility. This is not financial advice.*
