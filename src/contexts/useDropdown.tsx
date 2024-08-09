export { DropdownProvider, useDropdown }

import { createContext, useContext, useState } from 'react'

const initialState = {
  isOpen: false,
  toggleNav: () => {},
}
const Dropdown = createContext(initialState)

function useDropdown(): typeof initialState {
  return useContext(Dropdown)
}

type DropdownProps = {
  children: React.ReactNode
}

function DropdownProvider({ children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleNav = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  const value = { isOpen, toggleNav }

  return <Dropdown.Provider value={value}>{children}</Dropdown.Provider>
}
