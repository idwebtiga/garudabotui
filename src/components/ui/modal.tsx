import { forwardRef } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, children, title, description, className }, ref) => {
    return (
      <Dialog.Root open={open} onOpenChange={onClose}>
        <Dialog.Portal>
          <Dialog.Overlay
            className={cn(
              'fixed inset-0 z-50 bg-black/30',
              'data-[state=open]:animate-fade-in',
            )}
          />
          <Dialog.Content
            ref={ref}
            className={cn(
              'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
              'w-auto max-w-[80vw] max-h-[80vh] overflow-auto',
              'rounded-xl bg-robot-900 p-6 shadow-xl',
              'data-[state=open]:animate-slide-up',
              'focus:outline-none',
              className,
            )}
          >
            {title && (
              <Dialog.Title className="mb-1 text-lg font-semibold text-white pr-8">
                {title}
              </Dialog.Title>
            )}
            {description && (
              <Dialog.Description className="mb-4 text-sm text-neutral-400">
                {description}
              </Dialog.Description>
            )}
            {children}
            <Dialog.Close
              className={cn(
                'absolute top-4 right-4 inline-flex items-center justify-center',
                'h-8 w-8 rounded-full text-neutral-400',
                'hover:bg-robot-800 hover:text-white',
                'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                'cursor-pointer',
              )}
              aria-label="Close"
            >
              ✕
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
  },
)
Modal.displayName = 'Modal'

export { Modal }
export type { ModalProps }
