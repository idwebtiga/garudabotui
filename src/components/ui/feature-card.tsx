import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  className?: string
}

function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-robot-800 p-6 transition-all duration-300 hover:border-primary-500/50 hover:shadow-sm hover:-translate-y-0.5',
        className,
      )}
    >
      <div className="mb-3 text-2xl">{icon}</div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-neutral-400">{description}</p>
    </div>
  )
}

export { FeatureCard }
