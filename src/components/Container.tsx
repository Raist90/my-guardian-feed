import clsx from 'clsx'
import React, { createElement } from 'react'

export { Container }

type ContainerProps = {
  ariaLabelledBy: string
  as?: 'article' | 'nav'
  children: React.ReactNode
  className?: string
  centered?: boolean
  fullScreen?: boolean
}

function Container({
  as,
  ariaLabelledBy,
  children,
  centered = false,
  fullScreen = false,
  ...rest
}: ContainerProps) {
  const { className } = rest
  const element = as || 'section'

  return createElement(
    element,
    {
      'aria-labelledby': ariaLabelledBy,
      className: clsx(
        centered && 'mx-auto xl:w-8/12',
        fullScreen && 'w-full',
        /** @todo I think p-4 here is a little bit dumb, fix it */
        className ? className : 'p-4',
      ),
    },
    children,
  )
}
