import { useState } from 'react'
import GetToken from './content-gettoken'
import Leaderboard from './content-leaderboard'

interface TabConfig {
  id: string
  label: string
  icon: string
  component: React.ComponentType
}

const tabs: TabConfig[] = [
  { id: 'get-token', label: 'Get GARUDA', icon: '🪙', component: GetToken },
  { id: 'leaderboard', label: 'Leaderboard', icon: '👑', component: Leaderboard },
]

function TabPages() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const ActiveComponent = tabs.find((t) => t.id === activeTab)!.component

  return (
    <div className="flex h-full w-full flex-col">
      <div className="scrollbar-hide flex-1 overflow-y-auto">
        <ActiveComponent />
      </div>
      <div className="flex border-t border-robot-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-4 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-primary-400 border-t-2 border-primary-400'
                : 'text-robot-300 border-t-2 border-transparent hover:text-robot-100 hover:bg-robot-900/30'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-[11px]">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TabPages
