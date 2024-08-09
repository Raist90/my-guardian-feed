export { UserNavigation }

import { useDropdown } from '@/contexts/useDropdown'
import {
  findIndexByArrayField,
  generateKeyMovements,
  getCurrentKeyTargetAsString,
  getNodeListFromReactRef,
} from '@/domHelpers'
import { assert } from '@/helpers/assert'
import { ChevronDown, CircleUserRound } from 'lucide-react'
import { useRef } from 'react'
import { DropdownButton, DropdownItems, DropdownMenu } from '../Dropdown'

type UserNavigationProps = {
  items: {
    href: string
    label: string
  }[]
  userName: string | null
}

function UserNavigation({ items, userName }: UserNavigationProps) {
  const { isOpen, toggleNav } = useDropdown()

  const errMsg = 'User name is required for UserNavigation component'
  assert(userName, errMsg)

  const btnRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)

  const handleArrowDownKey = async (e: React.KeyboardEvent): Promise<void> => {
    if (!isOpen && e.key === 'ArrowDown') {
      e.preventDefault()

      toggleNav()
    }
  }

  const handleOnKeyDown = (e: React.KeyboardEvent): void => {
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

  return (
    <div className='relative'>
      <DropdownButton handleArrowDownKey={handleArrowDownKey} ref={btnRef}>
        <CircleUserRound aria-hidden />
        {userName.split('@')[0]}
        <ChevronDown aria-hidden size={14} />
      </DropdownButton>

      <DropdownMenu ref={navRef}>
        <DropdownItems handleOnKeyDown={handleOnKeyDown} items={items} />
      </DropdownMenu>
    </div>
  )
}
