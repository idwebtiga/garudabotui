import * as Dialog from '@radix-ui/react-dialog'
import { useAuth } from '@/hooks/use-auth'
import { useSiwe } from '@/hooks/use-siwe'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface LoginSIWEProps {
  open: boolean
  onClose: () => void
}

export function LoginSIWE({ open, onClose }: LoginSIWEProps) {
  const { user, updateUser } = useAuth()
  const siwe = useSiwe()

  const handleSignIn = async () => {
    const authedUser = await siwe.signIn()
    if (authedUser) {
      updateUser(authedUser)
      onClose()
    }
  }

  const handleLogout = async () => {
    onClose()
    const guestUser = await siwe.disconnect()
    if (guestUser) updateUser(guestUser)
  }

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-black/30',
            'data-[state=open]:animate-fade-in',
          )}
        />
        <Dialog.Content
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          className={cn(
            'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
            'w-auto max-w-[80vw] max-h-[80vh] overflow-auto',
            'rounded-xl bg-robot-900 p-6 shadow-xl',
            'data-[state=open]:animate-slide-up',
            'focus:outline-none',
          )}
        >
          <Dialog.Title className="mb-1 text-lg font-semibold text-white pr-8">
            {siwe.isAuthenticated ? 'Profile' : 'Sign In'}
          </Dialog.Title>
          {siwe.isAuthenticated ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="text-4xl">✅</div>
              <div className="text-center">
                <p className="text-sm text-neutral-400">Signed in as</p>
                <p className="mt-1 text-sm text-white font-mono break-all">
                  {user?.ethAddress ?? ''}
                </p>
              </div>
              <div className="flex w-full flex-col gap-3">
                <Button variant="danger" onClick={handleLogout} className="w-full">
                  Logout
                </Button>
                <Button variant="outline-inverted" onClick={onClose} className="w-full">
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="text-4xl">👛</div>
              <p className="text-sm text-neutral-400 text-center">
                Connect your wallet and sign in with Ethereum to access your account
              </p>
              {siwe.isConnected && (
                <div className="w-full rounded-lg bg-amber-500/10 px-4 py-2.5 text-center text-sm text-amber-400">
                  Wallet connected — sign in to continue
                </div>
              )}
              <div className="flex w-full flex-col gap-3">
                <Button
                  variant={siwe.isConnected ? 'outline-inverted' : 'robot'}
                  disabled={siwe.isConnecting || siwe.isConnected}
                  onClick={siwe.connect}
                  className="w-full"
                >
                  {siwe.isConnecting ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Connecting...
                    </>
                  ) : siwe.isConnected ? '✓ Connected' : 'Connect Wallet'}
                </Button>
                <Button
                  variant="robot-amber"
                  disabled={siwe.isLoading || !siwe.isConnected}
                  onClick={handleSignIn}
                  className={cn('w-full', siwe.isConnected && 'ring-2 ring-amber-400/50')}
                >
                  {siwe.isLoading ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Signing in...
                    </>
                  ) : 'Sign In'}
                </Button>
              </div>
              {siwe.error && (
                <p className="text-xs text-red-400 text-center">{siwe.error}</p>
              )}
            </div>
          )}
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
}
