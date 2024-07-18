export { Button }

import { capitalize } from '@/helpers/capitalize'
import { isBrowser } from '@/helpers/isBrowser'
import clsx from 'clsx'
import React from 'react'
import { usePageContext } from 'vike-react/usePageContext'

type ButtonProps =
  | {
    isButtonGroup: true
    buttonGroup: string[]
    isDisabled?: boolean
    handlers: Record<string, () => void>
  }
  | {
    children: React.ReactNode | string
    className?: string
    isDisabled?: boolean
    handler?: () => void
    type?: HTMLButtonElement['type']
  }

function Button(props: ButtonProps) {
  const {
    userFeeds: { customFeedURL },
  } = usePageContext()
  if ('isButtonGroup' in props) {
    const { buttonGroup, isDisabled, handlers } = props
    return (
      <>
        {buttonGroup.map((button) => (
          <button
            onClick={handlers[`handle${capitalize(button)}`]}
            className='border p-2 disabled:opacity-75'
            disabled={button !== 'load' ? isDisabled : !customFeedURL}
            key={button}
          >
            {`${capitalize(button)} filters`}
          </button>
        ))}
      </>
    )
  }

  const { children, isDisabled, handler, type = 'button', ...rest } = props
  const className = rest.className

  return (
    <button
      className={clsx(className && className, 'border p-2 disabled:opacity-75')}
      disabled={isDisabled || false}
      onClick={handler}
      type={type}
    >
      {children}
    </button>
  )
}
