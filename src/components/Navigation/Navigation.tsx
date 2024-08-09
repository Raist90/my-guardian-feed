export { Navigation }

import { DropdownProvider } from '@/contexts/useDropdown'
import { useNavigation } from '@/hooks/useNavigation'
import React, { type ComponentProps } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { Link } from '../Link'
import { UserNavigation } from './UserNavigation'

function Navigation() {
  const {
    token: { user },
  } = usePageContext()

  const { primary: links, userNavigation } = useNavigation()

  const userNavigationProps: ComponentProps<typeof UserNavigation> = {
    items: userNavigation,
    userName: user,
  }

  return (
    <div className='mx-auto mt-4 flex w-full justify-between p-4 xl:w-8/12'>
      <nav>
        <ul className='mb-4 inline-flex flex-wrap gap-8'>
          {links.map((link) => {
            const { label, href } = link
            return (
              <li key={label}>
                <Link intercept href={href}>
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {user && (
        <DropdownProvider>
          <UserNavigation {...userNavigationProps} />
        </DropdownProvider>
      )}
    </div>
  )
}
