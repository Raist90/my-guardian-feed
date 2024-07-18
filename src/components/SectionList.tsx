export { SectionList }

import {
  HARDCODED_SECTION_LIST,
  HOMEPAGE_ROUTE,
  SECTION_ROUTE_PREFIX,
  TOAST_MESSAGES,
  TOAST_TYPES,
} from '@/constants'
import clsx from 'clsx'
import React, { useState } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { Button } from './Button'
import { Toast } from './Toast'

function SectionList() {
  const {
    urlOriginal,
    urlParsed,
    token: { session, user },
  } = usePageContext()
  const [isOpen, setIsOpen] = useState(false)
  const [toastProps, setToastProps] = useState<{
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

  const handleSave = async (): Promise<void> => {
    const currentURL = urlOriginal.split('&page')[0]
    const body = JSON.stringify({ email: user, url: currentURL })

    await fetch('/add-custom-feed-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })

    setToastProps({
      msg: TOAST_MESSAGES['SAVE_FILTERS'],
      type: TOAST_TYPES['SUCCESS'],
    })

    setIsOpen(true)
  }

  const handleLoad = async (): Promise<void> => {
    const body = JSON.stringify({ email: user })

    const res = await fetch('/load-custom-feed-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })

    const { customFeedURL } = await res.json()

    location.href = customFeedURL
  }

  const handleReset = () => {
    location.href = HOMEPAGE_ROUTE
  }

  const closeDialog = () => setIsOpen(false)

  const areFiltersEnabled = selectedSections.length > 0

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
          isDisabled={!areFiltersEnabled || !session}
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
