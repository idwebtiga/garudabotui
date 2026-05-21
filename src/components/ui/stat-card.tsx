import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string
  className?: string
}

function StatCard({ label, value, className }: StatCardProps) {
  return (
    <div className={cn('rounded-xl border px-4 py-4', className)}>
      <p className="text-xs text-inherit opacity-60">{label}</p>
      <p className="mt-1 text-xl font-bold text-inherit">{value}</p>
    </div>
  )
}

export { StatCard }
