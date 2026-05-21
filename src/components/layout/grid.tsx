import { cn } from '@/lib/utils'

type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 12

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: GridCols
  sm?: GridCols
  md?: GridCols
  lg?: GridCols
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
}

const colMap: Record<GridCols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
}

const smColMap: Record<GridCols, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
  6: 'sm:grid-cols-6',
  12: 'sm:grid-cols-12',
}

const mdColMap: Record<GridCols, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
  12: 'md:grid-cols-12',
}

const lgColMap: Record<GridCols, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
  12: 'lg:grid-cols-12',
}

const gapMap: Record<NonNullable<GridProps['gap']>, string> = {
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

function Grid({
  cols = 1,
  sm,
  md,
  lg,
  gap = 4,
  className,
  ...props
}: GridProps) {
  return (
    <div
      className={cn(
        'grid',
        colMap[cols],
        sm && smColMap[sm],
        md && mdColMap[md],
        lg && lgColMap[lg],
        gapMap[gap],
        className,
      )}
      {...props}
    />
  )
}

export { Grid }
