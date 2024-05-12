export { Navigation }

import { HOMEPAGE_ROUTE } from '@/constants'
import { useCustomFeed } from '@/hooks/useCustomFeed'
import React from 'react'
import { Link } from './Link'

const links = [{ label: 'Guardian Feed', href: HOMEPAGE_ROUTE }]

function Navigation() {
  const customFeed = useCustomFeed()
  return (
    /**
     * @todo This style is also used on Feed component. Make sure to make it a
     *   css variable if used across other components
     */
    <div className='mx-auto mt-4 w-full p-4 xl:w-8/12'>
      <nav className='mb-4 inline-flex flex-wrap gap-8'>
        {links.map((link) => {
          const { label, href } = link
          return (
            <Link key={label} href={href}>
              {label}
            </Link>
          )
        })}
        {customFeed && <Link href={customFeed}>Your Feed</Link>}
      </nav>
    </div>
  )
}
