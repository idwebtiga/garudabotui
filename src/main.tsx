import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { bsc, bscTestnet } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { config } from './lib/config'

const metadata = {
  description: config.reownConfig.projectDescription,
  icons: [config.reownConfig.projectIcon],
  name: config.reownConfig.projectName,
  url: config.reownConfig.projectUrl,
}

createAppKit({
  adapters: [new EthersAdapter()],
  defaultAccountTypes: { eip155: 'eoa' },
  enableNetworkSwitch: false,
  enableWallets: true,
  features: {
    email: false,
    emailShowWallets: false,
    socials: ['google', 'facebook'],
  },
  metadata,
  networks: [bsc, bscTestnet],
  projectId: config.reownConfig.projectId,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
