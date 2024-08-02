export { DashboardNavigation }

import clsx from 'clsx'
import { useId } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { Container } from '../Container'
import { Link } from '../Link'

type NavigationItemProps = {
  href: string
  label: string
}

type DashboardNavigationProps = {
  items: NavigationItemProps[]
}

function DashboardNavigation({ items }: DashboardNavigationProps) {
  const dashboardNavigationId = useId()

  return (
    <Container
      ariaLabelledBy={dashboardNavigationId}
      as='nav'
      className='my-4 text-sm'
    >
      <span className='sr-only' id={dashboardNavigationId}>
        Dashboard navigation
      </span>
      <ul className='flex gap-4'>
        {items.map((item) => (
          <NavigationItem
            key={item.label}
            href={item.href}
            label={item.label}
          />
        ))}
      </ul>
    </Container>
  )
}

function NavigationItem({ href, label }: NavigationItemProps) {
  const { urlClient } = usePageContext()
  const isActive = href === urlClient

  return (
    <li className={clsx(isActive && 'bg-gray-700', 'btn-primary')}>
      <Link href={href}>{label}</Link>
    </li>
  )
}
