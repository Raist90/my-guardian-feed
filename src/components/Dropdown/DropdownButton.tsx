export { DropdownButton }

import React, { forwardRef } from 'react'

type DropdownButtonProps = {
  children: React.ReactNode
  handleArrowDownKey: (e: React.KeyboardEvent) => void
  handleClick: () => void
}

const DropdownButton = forwardRef(function DropdownButton(
  { children, handleArrowDownKey, handleClick }: DropdownButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      className='flex items-center gap-2'
      onClick={handleClick}
      onKeyDown={(e) => handleArrowDownKey(e)}
    >
      {children}
    </button>
  )
})
