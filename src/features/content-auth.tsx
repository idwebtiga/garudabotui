import { useAuth } from '@/hooks/use-auth'
import { useSiwe } from '@/hooks/use-siwe'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ContentAuthProps {
  onBack: () => void
}

function ContentAuth({ onBack }: ContentAuthProps) {
  const { user, updateUser } = useAuth()
  const siwe = useSiwe()
  const isAuthed = user ? !user.isGuest : false

  const handleSignIn = async () => {
    const authedUser = await siwe.signIn()
    if (authedUser) {
      updateUser(authedUser)
      onBack()
    }
  }

  const handleLogout = async () => {
    const guestUser = await siwe.disconnect()
    if (guestUser) updateUser(guestUser)
    onBack()
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center gap-3 border-b border-robot-800 px-4 py-3">
        <button
          onClick={onBack}
          className="cursor-pointer rounded-lg px-2 py-1 text-sm text-robot-300 transition-colors hover:bg-robot-800 hover:text-white"
        >
          ← Back
        </button>
        <h2 className="text-lg font-semibold text-white">
          {isAuthed ? 'Profile' : 'Sign In'}
        </h2>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 overflow-y-auto p-6">
        {isAuthed ? (
          <>
            <div className="text-4xl">✅</div>
            <div className="text-center">
              <p className="text-sm text-neutral-400">Signed in as</p>
              <p className="mt-1 break-all font-mono text-sm text-white">
                {user?.ethAddress ?? ''}
              </p>
            </div>
            <div className="flex w-full max-w-xs flex-col gap-3">
              <Button variant="danger" onClick={handleLogout} className="w-full">
                Logout
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="text-4xl">👛</div>
            <p className="max-w-xs text-center text-sm text-neutral-400">
              Connect your wallet and sign in with Ethereum to access your account
            </p>
            {siwe.isConnected && (
              <div className="w-full max-w-xs rounded-lg bg-amber-500/10 px-4 py-2.5 text-center text-sm text-amber-400">
                Wallet connected — sign in to continue
              </div>
            )}
            <div className="flex w-full max-w-xs flex-col gap-3">
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
              <p className="text-center text-xs text-red-400">{siwe.error}</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ContentAuth
