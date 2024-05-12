export { SectionList }

import {
  FEED_KEY,
  HARDCODED_SECTION_LIST,
  HOMEPAGE_ROUTE,
  SECTION_ROUTE_PREFIX,
  TOAST_MESSAGES,
  TOAST_TYPES,
} from '@/constants'
import { isDevelopment } from '@/helpers/isDevelopment'
import { isHomepage } from '@/helpers/isHomepage'
import clsx from 'clsx'
import React, { useState } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { Button } from './Button'
import { Toast } from './Toast'

function SectionList() {
  const { urlOriginal, urlParsed } = usePageContext()
  let [isOpen, setIsOpen] = useState(false)
  let [toastProps, setToastProps] = useState<{
    msg: string
    type: Lowercase<keyof typeof TOAST_TYPES>
  }>({ msg: '', type: TOAST_TYPES['ERROR'] })

  const sections = HARDCODED_SECTION_LIST

  let selectedSections: string[]

  /** @todo Not sure if a question mark is needed here, check it out */
  if (urlParsed.searchAll.section?.length) {
    selectedSections = urlParsed.searchAll.section[0].split('|')
  } else {
    selectedSections = []
  }

  const handleAddFilter = (isActive: boolean, id: string) => {
    if (isActive) {
      const updatedSelection = selectedSections.filter(
        // removing current id from selection
        (selectedSection) => selectedSection !== id,
      )
      if (!updatedSelection.length) {
        location.href = HOMEPAGE_ROUTE
      } else
        location.href = `${SECTION_ROUTE_PREFIX}${updatedSelection.join('|')}`
    } else {
      if (selectedSections.length) {
        const sections = urlParsed.searchAll.section.join('|')
        location.href = `${SECTION_ROUTE_PREFIX}${sections}|${id}`
      } else {
        location.href = `${SECTION_ROUTE_PREFIX}${id}`
      }
    }
  }

  const handleSave = () => {
    // remove page number from URL because we don't want to store it on localStorage
    const currentURL = urlOriginal.split('&page')[0]

    const hasStoredURL = !!localStorage.getItem(FEED_KEY)
    if (hasStoredURL) {
      localStorage.removeItem(FEED_KEY)
      if (isDevelopment) console.log(`${FEED_KEY} removed!`)
    }
    localStorage.setItem(FEED_KEY, currentURL)
    if (isDevelopment)
      console.log(`${FEED_KEY} stored! URL is:`, localStorage.getItem(FEED_KEY))

    setToastProps({
      msg: TOAST_MESSAGES['SAVE_FILTERS'],
      type: TOAST_TYPES['SUCCESS'],
    })

    setIsOpen(true)
  }

  const handleLoad = () => {
    const storedURL = localStorage.getItem(FEED_KEY)
    if (storedURL) {
      location.href = storedURL
    }
  }

  const handleReset = () => {
    location.href = HOMEPAGE_ROUTE
  }

  const closeDialog = () => setIsOpen(false)

  return (
    <div className='mb-8 flex flex-wrap justify-between gap-4 text-xs'>
      <div className='flex flex-wrap gap-2'>
        {sections.map((section) => {
          const isActive = selectedSections.includes(section)
          return (
            <div className='inline-flex items-center gap-1' key={section}>
              <input
                checked={isActive}
                className={clsx(isActive && 'bg-purple-500', 'border p-2')}
                id={section}
                onChange={() => handleAddFilter(isActive, section)}
                type='checkbox'
              />
              <label htmlFor={section}>{section}</label>
            </div>
          )
        })}
      </div>

      <div className='flex flex-wrap gap-2'>
        <Button
          isButtonGroup={true}
          buttonGroup={['load', 'reset', 'save']}
          isDisabled={isHomepage(urlOriginal)}
          handlers={{ handleLoad, handleReset, handleSave }}
        />
      </div>

      <Toast
        isOpen={isOpen}
        closeDialog={closeDialog}
        message={toastProps?.msg || ''}
        type={toastProps?.type || 'error'}
      />
    </div>
  )
}
