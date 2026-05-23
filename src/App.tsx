import { Routes, Route } from 'react-router-dom'
import { Page1, Page2, Page3, ContentLandingPage, ContentChatBox, ContentTabPages } from '@/features'
import { SwipeablePages, RightSwipeable } from '@/components/layout'

function HomeLayout() {
  return (
    <>
      <div className="lg:hidden">
        <SwipeablePages>
          <Page1 />
          <Page2 />
          <Page3 />
        </SwipeablePages>
      </div>
      <div className="hidden lg:flex h-dvh w-dvw">
        <div className="w-1/2 h-dvh overflow-y-auto scrollbar-hide bg-robot-950">
          <ContentLandingPage />
        </div>
        <div className="w-1/2 h-dvh border-l border-robot-800">
          <RightSwipeable>
            <ContentChatBox />
            <ContentTabPages />
          </RightSwipeable>
        </div>
      </div>
    </>
  )
}

function App() {
  return (
    <main className="h-dvh w-dvw overflow-hidden">
      <Routes>
        <Route path="/" element={<HomeLayout />} />
      </Routes>
    </main>
  )
}

export default App
