import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-4 bg-robot-950 p-8 text-center">
          <div className="rounded-full bg-red-900/30 p-4">
            <span className="text-3xl">!</span>
          </div>
          <h2 className="text-lg font-semibold text-white">Something went wrong</h2>
          <p className="max-w-md text-sm text-robot-400">
            {this.state.error.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="cursor-pointer rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
          >
            Reload page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
