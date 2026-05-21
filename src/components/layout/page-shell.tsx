import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageShellProps {
  children: ReactNode
  className?: string
}

function PageShell({ children, className }: PageShellProps) {
  return (
    <div className={cn('h-svh w-svw shrink-0 snap-start snap-always', className)}>
      {children}
    </div>
  )
}

export { PageShell }
