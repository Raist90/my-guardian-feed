import { Dashboard } from '@/components/Dashboard'
import { usePageContext } from 'vike-react/usePageContext'

function Page() {
  const {
    token: { user },
  } = usePageContext()

  return (
    <>
      <Dashboard user={user} />
    </>
  )
}

export default Page
