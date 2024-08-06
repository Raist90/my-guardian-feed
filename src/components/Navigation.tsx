export { Navigation }

import {
  findIndexByArrayField,
  generateKeyMovements,
  getArrowFocusableElemsByActiveElemId,
  getCurrentKeyTargetAsString,
  getNodeListFromReactRef,
} from '@/domHelpers'
import { assert } from '@/helpers/assert'
import { useNavigation } from '@/hooks/useNavigation'
import { ChevronDown, CircleUserRound } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { Link } from './Link'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const {
    token: { user },
  } = usePageContext()

  const { primary: links, userNavigation } = useNavigation()

  const toggleNav = (): void => {
    setIsOpen(!isOpen)
  }

  const userNavigationProps: UserNavigationProps = {
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

type UserNavigationProps = {
  isOpen: boolean
  items: {
    href: string
    label: string
  }[]
  toggleNav: () => void
  userName: string | null
}

/**
 * @todo I think I can make this a generic MenuDropdown component by removing
 *   userName prop and handling conditional rendering on parent instead
 */
function UserNavigation({
  isOpen,
  items,
  toggleNav,
  userName,
}: UserNavigationProps) {
  const errMsg = 'User name is required for UserNavigation component'
  assert(userName, errMsg)

  const btnRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)

  const handleOutsideClick = (e: MouseEvent): void => {
    // navRef.current will work because 'click' event bubbles
    if (e.target !== btnRef.current && e.target !== navRef.current) {
      toggleNav()
    }
  }

  const toggle = async (): Promise<void> => {
    toggleNav()
  }

  const handleClick = async (): Promise<void> => {
    if (!isOpen) {
      await toggle()

      if (navRef.current) {
        const nodeList = getNodeListFromReactRef(navRef, 'a')

        const { firstElem } = getArrowFocusableElemsByActiveElemId(nodeList)
        firstElem.focus({ focusVisible: true } as FocusOptions)
      }
    } else {
      toggleNav()
    }
  }

  const handleButtonKeyDown = async (e: React.KeyboardEvent): Promise<void> => {
    if (!isOpen && e.key === 'ArrowDown') {
      e.preventDefault()

      await toggle()

      const nodeList = getNodeListFromReactRef(navRef, 'a')

      const { firstElem } = getArrowFocusableElemsByActiveElemId(nodeList)
      firstElem.focus()
    }
  }

  const handleNavKeyDown = (e: React.KeyboardEvent): void => {
    if (isOpen) {
      const currentActiveElem = getCurrentKeyTargetAsString(e)
      const currentActiveElemIdx = findIndexByArrayField(
        currentActiveElem,
        items,
        'label',
      )

      const nodeList = getNodeListFromReactRef(navRef, 'a')

      generateKeyMovements(e, {
        arr: items,
        currentActiveElemIdx,
        dialogButton: btnRef.current!,
        handler: toggleNav,
        nodeList,
      })
    }
  }

  useEffect(() => {
    if (!isOpen) return

    document.addEventListener('click', (e) => handleOutsideClick(e))

    return () =>
      document.removeEventListener('click', (e) => handleOutsideClick(e))
  })

  return (
    <div className='relative'>
      <button
        ref={btnRef}
        className='flex items-center gap-2'
        onClick={handleClick}
        onKeyDown={(e) => handleButtonKeyDown(e)}
      >
        <CircleUserRound aria-hidden />
        {userName.split('@')[0]}
        <ChevronDown aria-hidden size={14} />
      </button>

      {isOpen && (
        <nav
          ref={navRef}
          className='absolute right-0 z-[1] mt-4 text-nowrap rounded-sm border border-gray-400 bg-black p-4'
        >
          <ul className='space-y-4'>
            {items.map((item) => {
              const { href, label } = item
              return (
                <li onKeyDown={(e) => handleNavKeyDown(e)} key={label}>
                  <a href={href}>{label}</a>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </div>
  )
}
