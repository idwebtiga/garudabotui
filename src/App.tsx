import { Routes, Route } from 'react-router-dom'
import { Page1, Page2, Page3, PageIdea } from '@/features'
import { SwipeablePages } from '@/components/layout/swipeable-pages'
import { RightSwipeable } from '@/components/layout/right-swipeable'
import Content1 from '@/features/content-1'
import Content2 from '@/features/content-2'
import Content3 from '@/features/content-3'

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
          <Content1 />
        </div>
        <div className="w-1/2 h-dvh border-l border-robot-800">
          <RightSwipeable>
            <Content2 />
            <Content3 />
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
        <Route path="/idea" element={<PageIdea />} />
      </Routes>
    </main>
  )
}

export default App
