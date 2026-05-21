import { cn } from '@/lib/utils'

type StackDirection = 'row' | 'col'
type StackAlign = 'start' | 'center' | 'end' | 'stretch'
type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
  align?: StackAlign
  justify?: StackJustify
  wrap?: boolean
}

const gapMap: Record<NonNullable<StackProps['gap']>, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
}

const alignMap: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
}

const justifyMap: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

function Stack({
  direction = 'col',
  gap = 4,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        'flex',
        direction === 'col' ? 'flex-col' : 'flex-row',
        gapMap[gap],
        alignMap[align],
        justifyMap[justify],
        wrap && 'flex-wrap',
        className,
      )}
      {...props}
    />
  )
}

export { Stack }
