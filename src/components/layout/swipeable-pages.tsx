import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useDragScroll } from '@/hooks/use-drag-scroll'

interface SwipeablePagesProps {
  children: ReactNode
}

function SwipeablePages({ children }: SwipeablePagesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useDragScroll(containerRef, 3)

  return (
    <div className="relative h-dvh w-full">
      <div
        ref={containerRef}
        className="flex h-dvh w-full snap-x snap-mandatory overflow-x-auto scrollbar-hide"
      >
        {children}
      </div>
    </div>
  )
}

export { SwipeablePages }
