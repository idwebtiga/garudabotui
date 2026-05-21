# vibe-app — AI Development Context

## Stack
- **Vite 8** + **React 19** + **TypeScript 6** (strict mode)
- **Tailwind CSS v4** (CSS-based config via `@theme` in `src/index.css`)
- **React Router DOM v7** for routing

## Project Structure
```
src/
├── components/
│   ├── ui/           # Shared UI components (Button, Card, etc.)
│   └── layout/       # Layout components (Container, Stack, Grid, PageShell, SwipeablePages)
├── features/         # Page sections / feature-level components
│   └── index.ts      # Barrel: Page1, Page2, Page3, PageIdea, Content1, Content2, Content3
├── hooks/            # Custom React hooks
├── lib/
│   ├── utils.ts      # cn() — clsx + tailwind-merge
│   ├── format.ts     # Shared: truncateAddress, formatBalance, formatTime, getTier, TIERS
│   ├── scroll.ts     # Shared: scrollByPages(direction)
│   ├── api/          # API layer (openapi-fetch client, auth, chat, snapshots)
│   └── data/         # Dummy data (leaderboard, messages, etc.)
├── styles/           # Global styles (if needed beyond index.css)
├── types/            # Shared TypeScript types
│   └── index.ts      # PolymorphicProps helper
├── App.tsx           # Route definitions
└── main.tsx          # Entry point (BrowserRouter wrapper)
```

## Page Structure
Every page is a `PageShell` + `ContentN` component:
- `PageShell` provides `h-svh w-svw shrink-0 snap-start snap-always`
- Content components fill the page and contain the actual UI

```
features/
├── page-1.tsx         → PageShell("flex-col overflow-y-auto ...") → Content1
├── page-2.tsx         → PageShell("flex-col ...")                 → Content2
├── page-3.tsx         → PageShell(...)                            → Content3
├── content-1.tsx      → Landing page (chatbot MVP)
├── content-2.tsx      → Chat box
├── content-3.tsx      → Leaderboard + Analytics tabs
└── index.ts           → barrel: Page1, Page2, Page3, PageIdea, Content1, Content2, Content3
```

## Page Theming
Each page uses a different theme token palette:
| Page | Theme token | Background |
|---|---|---|
| Page 1 | `neutral-*` | `bg-neutral-950` (dark landing) |
| Page 2 | `primary-*` | `bg-primary-600` (blue chat) |
| Page 3 | `secondary-*` | `bg-secondary-600` (purple tabs) |

When adding content to a page, use the page's theme token family for borders, backgrounds, and text.

## Conventions

### File naming
- Components: `kebab-case.tsx` (e.g., `button.tsx`, `card.tsx`)
- Hooks: `use-hook-name.ts`
- Utilities: `kebab-case.ts`
- Data: `kebab-case.ts` in `lib/data/`

### Imports
- Use `@/` path alias for all src imports: `import { Button } from '@/components/ui/button'`
- Use barrel exports (`index.ts`) for component groups
- Pages imported from `@/features`: `import { Page1 } from '@/features'`
- Layout components from `@/components/layout`
- UI components from `@/components/ui`
- Dummy data from `@/lib/data/`

### Component patterns
- Use `forwardRef` for reusable UI components
- Use `cn()` from `@/lib/utils` for className merging
- Prefer composition over prop drilling

### Available UI components
All in `src/components/ui/` with barrel export:
- `Button` — variants: primary, secondary, outline, ghost, danger, **inverted**, **outline-inverted**, **robot**, **robot-amber**. Sizes: sm, md, lg
- `Card` + CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- `Avatar` — colored circle with initials (`name`, `colorClass` props)
- `ChatBubble` — chat message (`side: 'left' | 'right'`, `text`)
- `StatCard` — metric display (`label`, `value`, `className` for theme)
- `FeatureCard` — icon + title + description card

### Available layout components
All in `src/components/layout/` with barrel export:
- `PageShell` — snap-aware page wrapper (add `flex-col`, bg, scroll classes via `className`)
- `SwipeablePages` — horizontal scroll-snap container (wraps all pages)
- `Container` — responsive max-width wrapper
- `Stack` — flexbox with direction, gap, align, justify props
- `Grid` — responsive CSS grid with cols prop per breakpoint

### Tailwind CSS v4
- Theme tokens defined in `src/index.css` via `@theme` block — DO NOT use `tailwind.config.js`
- Color tokens: `primary-*`, `secondary-*`, `accent-*`, `neutral-*`, `success-*`, `danger-*`
- Animation tokens: `animate-fade-in`, `animate-slide-up`, `animate-slide-down`
- Responsive breakpoints: Tailwind defaults (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- Always use mobile-first responsive classes
- Scrollbar hiding: `scrollbar-hide` utility class available

### Styling rules
- Never use inline styles — use Tailwind utility classes
- Use `cn()` for conditional styles
- Prefer `Stack` and `Grid` layout components over raw flexbox

### React Router
- Define routes in `App.tsx`
- Feature pages live in `src/features/`
