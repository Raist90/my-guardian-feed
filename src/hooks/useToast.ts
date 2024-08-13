export { useToast }

import { TOAST_TYPES } from '@/constants'
import React, { useState } from 'react'

const initialToastProps: {
  message: string
  type: Lowercase<keyof typeof TOAST_TYPES>
} = {
  message: '',
  type: 'error',
}

function useToast(): {
  isOpen: boolean
  setToastProps: React.Dispatch<React.SetStateAction<typeof initialToastProps>>
  toastProps: typeof initialToastProps
  toggleToast: () => void
} {
  const [isOpen, setIsOpen] = useState(false)
  const [toastProps, setToastProps] = useState(initialToastProps)

  const toggleToast = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  return { isOpen, setToastProps, toastProps, toggleToast }
}
