export { DropdownMenu }

import React, { forwardRef } from 'react'

type DropdownProps = {
  children: React.ReactNode
}

const DropdownMenu = forwardRef(function DropdownMenu(
  { children }: DropdownProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  return (
    <nav
      ref={ref}
      className='absolute right-0 z-[1] mt-4 text-nowrap rounded-sm border border-gray-400 bg-black p-4'
    >
      {children}
    </nav>
  )
})
