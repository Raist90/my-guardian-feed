export { Navigation }

import { useNavigation } from '@/hooks/useNavigation'
import React, { useState, type ComponentProps } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { Link } from '../Link'
import { UserNavigation } from './UserNavigation'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const {
    token: { user },
  } = usePageContext()

  const { primary: links, userNavigation } = useNavigation()

  const toggleNav = (): void => {
    setIsOpen(!isOpen)
  }

  const userNavigationProps: ComponentProps<typeof UserNavigation> = {
    isOpen,
    items: userNavigation,
    toggleNav,
    userName: user,
  }

  return (
    /**
     * @todo This style is also used on Feed component. Make sure to make it a
     *   css variable if used across other components
     */
    <div className='mx-auto mt-4 flex w-full justify-between p-4 xl:w-8/12'>
      <nav>
        <ul className='mb-4 inline-flex flex-wrap gap-8'>
          {links.map((link) => {
            const { label, href } = link
            return (
              <li key={label}>
                <Link href={href}>{label}</Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {user && <UserNavigation {...userNavigationProps} />}
    </div>
  )
}
