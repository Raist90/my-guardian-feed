export { DropdownItems }

import clsx from 'clsx'
import React from 'react'

type DropdownItemsProps = {
  handleOnKeyDown: (e: React.KeyboardEvent) => void
  items: {
    href: string
    label: string
  }[]
}

function DropdownItems({ handleOnKeyDown, items }: DropdownItemsProps) {
  return (
    <ul>
      {items.map((item, idx) => {
        const { href, label } = item
        const isFirst = idx === 0
        return (
          <li
            className={clsx(isFirst ? 'p-2 pb-0' : 'p-2')}
            onKeyDown={(e) => handleOnKeyDown(e)}
            key={label}
          >
            <a
              className='block w-full p-2 focus:bg-gray-800 focus:outline-none'
              rel='external'
              href={href}
            >
              {label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
