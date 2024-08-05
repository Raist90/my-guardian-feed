export { useNavigation }

import { DASHBOARD_ROUTE, HOMEPAGE_ROUTE, READ_LATER_ROUTE } from '@/constants'
import type { Navigation } from '@/types'

type Primary = Navigation['primary']
type User = Navigation['userNavigation']

const navigation: Navigation = {
  primary: [{ href: HOMEPAGE_ROUTE, label: 'Guardian Feed' }],
  userNavigation: [
    { href: DASHBOARD_ROUTE, label: 'Dashboard' },
    { href: READ_LATER_ROUTE, label: 'Read later list' },
  ],
}

function useNavigation(): { primary: Primary; userNavigation: User } {
  const { primary, userNavigation } = navigation

  return { primary, userNavigation }
}
