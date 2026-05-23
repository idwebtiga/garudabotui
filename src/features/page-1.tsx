import { ContentLandingPage } from '@/features'
import { PageShell } from '@/components/layout/page-shell'

function Page1() {
  return (
    <PageShell className="overflow-y-auto scrollbar-hide bg-robot-950">
      <ContentLandingPage />
    </PageShell>
  )
}

export default Page1
