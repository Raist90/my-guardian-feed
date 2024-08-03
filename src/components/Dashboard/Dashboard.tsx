export { Dashboard }

import { useId } from 'react'
import { Container } from '../Container'

type DashboardProps = {
  user: string | null
}

function Dashboard({ user }: DashboardProps) {
  const dashboardId = useId()

  return (
    <Container ariaLabelledBy={dashboardId} centered fullScreen>
      <div>
        <h2 id={dashboardId} className='text-xl'>
          Dashboard
        </h2>
        <p>Welcome back, {user}</p>
      </div>
    </Container>
  )
}
