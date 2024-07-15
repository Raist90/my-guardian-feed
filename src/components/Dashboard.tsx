export { Dashboard }

import { usePageContext } from 'vike-react/usePageContext'

function Dashboard() {
  const {
    token: { session, user },
  } = usePageContext()

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
