export { DropdownButton }

import { useDropdown } from '@/contexts/useDropdown'
import { assert } from '@/helpers/assert'
import React, { forwardRef, useEffect, useState } from 'react'

type DropdownButtonProps = {
  children: React.ReactNode
  handleArrowDownKey: (e: React.KeyboardEvent) => void
}

const DropdownButton = forwardRef(function DropdownButton(
  { children, handleArrowDownKey }: DropdownButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  // this is used as DropdownButton aria-controls accessibility prop
  const [navId, setNavId] = useState<string | null>(null)
  const { isOpen, toggleNav } = useDropdown()

  useEffect(() => {
    if (!isOpen) return

    const btnRef = ref as React.RefObject<HTMLButtonElement>
    const container = btnRef.current?.parentNode
    assert(container)
    const nav = container?.querySelector('nav')
    assert(nav)
    const navId = nav.id
    setNavId(navId)
  }, [isOpen, ref])

  return (
    <button
      aria-expanded={isOpen}
      aria-controls={navId || undefined}
      className='flex items-center gap-2'
      onClick={toggleNav}
      onKeyDown={(e) => handleArrowDownKey(e)}
      ref={ref}
    >
      {children}
    </button>
  )
})
