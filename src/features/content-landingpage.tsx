import { Fragment } from 'react'
import { useTypewriter } from '@/hooks/use-typewriter'
import { Button } from '@/components/ui/button'
import { FeatureCard } from '@/components/ui/feature-card'
import { scrollByPages } from '@/lib/scroll'
import { TIERS } from '@/lib/format'
import { config } from '@/lib/config'

const problemStatements = [
  { icon: '🌍', text: 'AI governance is centralized, leaving communities without a meaningful voice' },
  { icon: '🗣️', text: 'Underserved languages and cultural contexts are treated as afterthoughts' },
  { icon: '🔒', text: 'Users have no mechanism to influence how the AI systems they depend on behave' },
]

const howItWorks = [
  { icon: '💬', title: 'Chat Freely', description: 'No sign-in required. Start a conversation instantly with zero barriers.' },
  { icon: '🔑', title: 'Connect & Influence', description: 'Link your wallet to activate token-weighted influence over the AI\'s direction.' },
  { icon: '🧠', title: 'Shape the AI', description: 'Each weighted conversation feeds into the AI\'s evolving personality and knowledge base.' },
]

const features = [
  { icon: '🤝', title: 'Community-Shaped AI', description: 'Every weighted conversation from the community feeds into how the AI evolves.' },
  { icon: '🇮🇩', title: 'Indonesian at Heart', description: 'Built around Indonesian language, culture, current affairs, and community values.' },
  { icon: '🏛️', title: 'No Central Authority', description: 'No single entity controls Garuda BOT\'s direction. The community does.' },
  { icon: '🚪', title: 'Open to Everyone', description: 'Chat freely with or without tokens. Influence scales with participation.' },
  { icon: '📈', title: 'Evolving Personality', description: 'Track the AI\'s emergent character over time through a live personality dashboard.' },
  { icon: '🔍', title: 'Transparent by Design', description: 'All token holdings and influence weights are publicly verifiable on-chain.' },
]

const tierColors = ['text-robot-500', 'text-robot-400', 'text-robot-300', 'text-primary-400', 'text-amber-400', 'text-amber-500']

function LandingPage() {
  const { displayed, done } = useTypewriter('Garuda BOT', 50)

  return (
    <>
      <section className="flex h-svh items-center justify-center">
        <div className="text-center max-w-2xl px-4">
          <div className="mb-6 text-6xl animate-float">🦅</div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-heading min-h-[3.5rem]">
            {displayed}
            {!done && <span className="animate-pulse text-primary-400 ml-0.5">|</span>}
          </h1>
          <p className="mt-4 text-base text-neutral-400 max-w-lg mx-auto">
            A community-governed AI built for Indonesia — designed around Indonesian language, culture, and values, shaped by the people it serves.
          </p>
          <div className="mt-3 text-xs text-neutral-500">
            Built for Indonesia · Governed by its community
          </div>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <Button variant="robot" size="lg" onClick={() => scrollByPages('right')} className="lg:hidden">
              Start Chatting
            </Button>
            <div className="hidden lg:flex flex-col items-center gap-1 animate-fade-in">
              <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-500">Scroll to explore</span>
              <span className="text-primary-400 text-lg animate-bounce">↓</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-robot-800 bg-robot-900 px-4 py-24">
        <div className="mx-auto text-center max-w-2xl">
          <p className="text-lg italic text-neutral-300 sm:text-xl">
            "Most AI systems reflect the values of the institutions that build them — not the communities they serve."
          </p>
          <div className="mt-10 space-y-5 text-left">
            {problemStatements.map((s) => (
              <div key={s.text} className="flex items-start gap-4">
                <span className="text-2xl shrink-0">{s.icon}</span>
                <p className="text-sm text-neutral-400 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-base font-semibold text-primary-400">
            Garuda BOT changes that.
          </p>
        </div>
      </section>

      <section className="border-t border-robot-800 px-4 py-24">
        <div className="mx-auto text-center max-w-4xl">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl font-heading">
            How It Works
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {howItWorks.map((s) => (
              <FeatureCard
                key={s.title}
                icon={s.icon}
                title={s.title}
                description={s.description}
                className="border-robot-800 bg-robot-900/50"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-robot-800 bg-robot-900 px-4 py-24">
        <div className="mx-auto text-center max-w-3xl">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl font-heading">
            Your Voice, Your Tier
          </h2>
          <p className="mt-2 text-sm text-robot-300">
            Token holdings determine your influence tier and conversation weight.
          </p>
          <div className="mt-10 mx-auto max-w-xl">
            <div className="grid grid-cols-3 gap-px rounded-xl overflow-hidden border border-robot-800 bg-robot-800 text-sm">
              <div className="bg-robot-900 px-3 py-2 text-center text-xs font-medium uppercase tracking-wider text-neutral-400">
                Tier
              </div>
              <div className="bg-robot-900 px-3 py-2 text-center text-xs font-medium uppercase tracking-wider text-neutral-400">
                Weight
              </div>
              <div className="bg-robot-900 px-3 py-2 text-right text-xs font-medium uppercase tracking-wider text-neutral-400">
                Tokens
              </div>
              <div className="bg-robot-950 px-3 py-2.5 text-center text-neutral-500">—</div>
              <div className="bg-robot-950 px-3 py-2.5 text-center text-neutral-500">×0</div>
              <div className="bg-robot-950 px-3 py-2.5 text-right text-neutral-500">0</div>
              {TIERS.slice(1).map((t, i) => (
                <Fragment key={t.stars}>
                  <div className={`px-3 py-2.5 text-center ${tierColors[t.tier]} ${i % 2 === 1 ? 'bg-robot-950' : 'bg-robot-900/50'}`}>
                    {t.stars}
                  </div>
                  <div className={`px-3 py-2.5 text-center text-neutral-300 ${i % 2 === 1 ? 'bg-robot-950' : 'bg-robot-900/50'}`}>
                    {t.weight}
                  </div>
                  <div className={`px-3 py-2.5 text-right text-neutral-400 ${i % 2 === 1 ? 'bg-robot-950' : 'bg-robot-900/50'}`}>
                    {t.range}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            No tokens? No problem. You can still chat freely.
          </p>
          <a
            href={`https://pancakeswap.finance/swap?outputCurrency=${config.chain.tokenAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="robot-amber" size="md" className="mt-5">
              Get GARUDA Tokens →
            </Button>
          </a>
        </div>
      </section>

      <section className="border-t border-robot-800 px-4 py-24">
        <div className="mx-auto text-center max-w-5xl">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl font-heading">
            Why Garuda BOT?
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <FeatureCard
                key={f.title}
                icon={f.icon}
                title={f.title}
                description={f.description}
                className="border-robot-800 bg-robot-900/50"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-robot-800 bg-robot-900 px-4 py-24">
        <div className="mx-auto text-center max-w-2xl">
          <div className="mx-auto mb-8 h-px w-16 bg-primary-400/50" />
          <blockquote className="text-xl italic text-white leading-relaxed sm:text-2xl">
            "Who should decide how an AI behaves? We believe the answer is: the people it serves."
          </blockquote>
          <p className="mt-6 text-sm text-neutral-400 leading-relaxed max-w-lg mx-auto">
            Garuda BOT proposes a novel approach to AI alignment — encoding community influence in a verifiable, permissionless token system. By distributing governance across its token-holding community, the AI evolves in a direction collectively determined by those it serves.
          </p>
          <div className="mt-10 border-t border-robot-800 pt-10">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl font-heading">
              Shape the Future of Decentralized AI
            </h2>
            <p className="mt-3 text-sm text-neutral-400">
              Be part of the community building AI for Indonesia, by Indonesia.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
              <Button variant="robot" size="lg" onClick={() => scrollByPages('right')} className="lg:hidden">
                Start Chatting
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="flex flex-col items-center justify-center gap-3 border-t border-robot-800 px-4 py-8 text-xs text-neutral-500 text-center">
        <p className="font-semibold text-neutral-400">Garuda BOT</p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/idwebtiga/garudabotui" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://x.com/garudabot_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X / Twitter</a>
        </div>
        <p className="font-mono text-[10px] text-neutral-600">v{__COMMIT_HASH__}</p>
        <p>GARUDA tokens are a governance utility. This is not financial advice.</p>
      </footer>
    </>
  )
}

export default LandingPage
