import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { createAppKit } from '@reown/appkit/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { bsc } from '@reown/appkit/networks'
import { config } from '@/lib/config'

createAppKit({
  adapters: [new EthersAdapter()],
  defaultNetwork: bsc,
  defaultAccountTypes: { eip155: 'eoa' },
  networks: [bsc],
  metadata: {
    description: config.reownConfig.projectDescription,
    icons: [config.reownConfig.projectIcon],
    name: config.reownConfig.projectName,
    url: config.reownConfig.projectUrl,
  },
  projectId: config.reownConfig.projectId,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
