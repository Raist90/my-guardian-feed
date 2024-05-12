export { Button }

import { capitalize } from '@/helpers/capitalize'
import React from 'react'

type ButtonProps =
  | {
      isButtonGroup: true
      buttonGroup: string[]
      isDisabled: boolean
      handlers: Record<string, () => void>
    }
  | {
      children: React.ReactNode | string
      isDisabled?: boolean
      handler: () => void
    }

function Button(props: ButtonProps) {
  if ('isButtonGroup' in props) {
    const { buttonGroup, isDisabled, handlers } = props
    return (
      <>
        {buttonGroup.map((button) => (
          <button
            onClick={handlers[`handle${capitalize(button)}`]}
            className='border p-2 disabled:opacity-75'
            disabled={button !== 'load' && isDisabled}
            key={button}
          >
            {`${capitalize(button)} filters`}
          </button>
        ))}
      </>
    )
  }

  const { children, isDisabled, handler } = props

  return (
    <button
      className='border p-2 disabled:opacity-75'
      disabled={isDisabled || false}
      onClick={handler}
    >
      {children}
    </button>
  )
}
