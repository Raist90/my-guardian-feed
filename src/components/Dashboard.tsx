export { Dashboard }

import { useSession } from '@/hooks/useSession'
import { navigate } from 'vike/client/router'

function Dashboard() {
  const { session, user, loading } = useSession()

  if (!loading && !session) {
    navigate('/login')
  }

  return (
    <section>
      {session && (
        <div>
          <h2 className='text-xl'>Dashboard</h2>
          <p>Welcome back, {user}</p>
        </div>
      )}
    </section>
  )
}
