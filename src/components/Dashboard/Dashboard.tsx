export { Dashboard }

import { useId, type ComponentProps } from 'react'
import { Container } from '../Container'
import { DashboardNavigation } from './DashboardNavigation'

type DashboardProps = {
  user: string | null
}

/** @todo Make sure to complete this and move it elsewhere */
const navigationItems: ComponentProps<typeof DashboardNavigation>['items'] = [
  {
    href: '/',
    label: 'Custom Feed',
  },
  {
    href: '/user/dashboard',
    label: 'Read later list',
  },
]

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

      <DashboardNavigation items={navigationItems} />
    </Container>
  )
}
