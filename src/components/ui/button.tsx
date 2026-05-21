import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'inverted' | 'outline-inverted' | 'robot' | 'robot-amber'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500 shadow-xs',
  secondary:
    'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus-visible:ring-neutral-400',
  outline:
    'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 focus-visible:ring-neutral-400',
  ghost:
    'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-neutral-400',
  danger:
    'bg-danger-500 text-white hover:bg-danger-700 focus-visible:ring-danger-500 shadow-xs',
  inverted:
    'bg-white text-neutral-900 hover:bg-neutral-100 focus-visible:ring-white shadow-xs',
  'outline-inverted':
    'border border-robot-700 text-neutral-300 hover:bg-robot-800 focus-visible:ring-white',
  robot:
    'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500 shadow-xs',
  'robot-amber':
    'bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-amber-400',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-robot-950',
          'active:scale-[0.98]',
          'disabled:pointer-events-none disabled:opacity-50',
          'cursor-pointer select-none',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button }
export type { ButtonProps, ButtonVariant, ButtonSize }
