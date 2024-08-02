import clsx from 'clsx'
import { createElement } from 'react'

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
        className ? className : 'p-4',
      ),
    },
    children,
  )
}
