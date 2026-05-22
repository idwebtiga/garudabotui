import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { createAppKit } from '@reown/appkit/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { bsc } from "@reown/appkit/networks";

// const metadata = {
//   description: config.reownConfig.projectDescription,
//   icons: [config.reownConfig.projectIcon],
//   name: config.reownConfig.projectName,
//   url: config.reownConfig.projectUrl,
// }

createAppKit({
  adapters: [new EthersAdapter()],
  defaultNetwork: bsc,
  defaultAccountTypes: { eip155: "eoa" },
  networks: [bsc],
  metadata: {
    description: "Garuda BOT",
    icons: ["https://garudabot.web.id/favicon.svg"],
    name: "Garuda BOT",
    url: "https://garudabot.web.id",
  },
  projectId: "6e18090fa24912ee55968a1de61bf5a5",
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },

  // adapters: [new EthersAdapter()],
  // defaultAccountTypes: { eip155: 'eoa' },
  // enableNetworkSwitch: false,
  // enableWallets: true,
  // features: {
  //   email: false,
  //   emailShowWallets: false,
  //   socials: ['google', 'facebook'],
  // },
  // metadata,
  // networks: [bsc, bscTestnet],
  // projectId: config.reownConfig.projectId,
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
