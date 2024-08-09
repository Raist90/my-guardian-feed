export { DropdownMenu }

import { useDropdown } from '@/contexts/useDropdown'
import {
  getArrowFocusableElemsByActiveElemId,
  getNodeListFromReactRef,
} from '@/domHelpers'
import React, { forwardRef, useEffect, useId } from 'react'

type DropdownProps = {
  children: React.ReactNode
}

const DropdownMenu = forwardRef(function DropdownMenu(
  { children }: DropdownProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const { isOpen, toggleNav } = useDropdown()
  const navRef = ref as React.RefObject<HTMLElement>

  const handleBlur = (e: React.FocusEvent): void => {
    const relatedTarget = e.relatedTarget as HTMLElement
    const isOutOfFocus =
      !relatedTarget || !navRef.current?.parentNode?.contains(relatedTarget) // we use parentNode because it contains the button which toggles Dropdown appearence

    if (isOutOfFocus) {
      toggleNav()
    }
  }

  useEffect(() => {
    if (navRef.current) {
      const nodeList = getNodeListFromReactRef(navRef, 'a')

      const { firstElem } = getArrowFocusableElemsByActiveElemId(nodeList)
      firstElem.focus({ focusVisible: true } as FocusOptions)
    }
  })

  const navId = useId()

  return (
    <>
      {isOpen && (
        <nav
          id={navId}
          ref={ref}
          className='absolute right-0 z-[1] mt-4 text-nowrap rounded-sm border border-gray-400 bg-black'
          onBlur={(e) => handleBlur(e)}
        >
          {children}
        </nav>
      )}
    </>
  )
})
