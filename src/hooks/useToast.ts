export { useToast }

import { useState } from 'react'

function useToast(): { isOpen: boolean; toggleToast: () => void } {
  const [isOpen, setIsOpen] = useState(false)

  const toggleToast = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  return { isOpen, toggleToast }
}
