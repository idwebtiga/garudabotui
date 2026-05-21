import Content1 from '@/features/content-1'
import { PageShell } from '@/components/layout/page-shell'

function Page1() {
  return (
    <PageShell className="overflow-y-auto scrollbar-hide bg-robot-950">
      <Content1 />
    </PageShell>
  )
}

export default Page1
