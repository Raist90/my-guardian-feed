export { UserNavigation }

import {
  findIndexByArrayField,
  generateKeyMovements,
  getArrowFocusableElemsByActiveElemId,
  getCurrentKeyTargetAsString,
  getNodeListFromReactRef,
} from '@/domHelpers'
import { assert } from '@/helpers/assert'
import { ChevronDown, CircleUserRound } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { DropdownButton, DropdownItems, DropdownMenu } from '../Dropdown'

type UserNavigationProps = {
  isOpen: boolean
  items: {
    href: string
    label: string
  }[]
  toggleNav: () => void
  userName: string | null
}

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

  const handleArrowDownKey = async (e: React.KeyboardEvent): Promise<void> => {
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
      <DropdownButton
        ref={btnRef}
        handleArrowDownKey={handleArrowDownKey}
        handleClick={handleClick}
      >
        <CircleUserRound aria-hidden />
        {userName.split('@')[0]}
        <ChevronDown aria-hidden size={14} />
      </DropdownButton>

      {isOpen && (
        <DropdownMenu ref={navRef}>
          <DropdownItems handleNavKeyDown={handleNavKeyDown} items={items} />
        </DropdownMenu>
      )}
    </div>
  )
}
