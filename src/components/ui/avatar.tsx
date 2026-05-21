import { cn } from '@/lib/utils'

interface AvatarProps {
  name: string
  className?: string
  colorClass?: string
}

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
}

function Avatar({ name, className, colorClass }: AvatarProps) {
  return (
    <div
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white',
        'ring-1 ring-robot-700',
        colorClass ?? 'bg-gradient-to-br from-primary-500 to-primary-600',
        className,
      )}
    >
      {initials(name)}
    </div>
  )
}

export { Avatar }
