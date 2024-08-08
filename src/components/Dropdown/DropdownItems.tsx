export { DropdownItems }

import React from 'react'

type DropdownItemsProps = {
  /** @todo Rename this to handleOnKeyDown */
  handleNavKeyDown: (e: React.KeyboardEvent) => void
  items: {
    href: string
    label: string
  }[]
}

function DropdownItems({ handleNavKeyDown, items }: DropdownItemsProps) {
  return (
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
  )
}
