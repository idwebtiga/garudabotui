import { Children, useRef } from 'react'
import type { ReactNode } from 'react'
import { useDragScroll } from '@/hooks/use-drag-scroll'

interface RightSwipeableProps {
  children: ReactNode
}

function RightSwipeable({ children }: RightSwipeableProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pageCount = Children.count(children)

  useDragScroll(containerRef, pageCount)

  return (
    <div className="relative h-full w-full">
      <div
        ref={containerRef}
        data-swipeable="right"
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto scrollbar-hide"
      >
        {Children.map(children, (child) => (
          <div className="h-full w-full shrink-0 snap-start snap-always">
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

export { RightSwipeable }
