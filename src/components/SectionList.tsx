export { SectionList }
import { HOMEPAGE_ROUTE, SECTION_ROUTE_PREFIX } from '@/constants'
import clsx from 'clsx'
import React from 'react'
import { usePageContext } from 'vike-react/usePageContext'

function SectionList() {
  const { urlParsed } = usePageContext()
  const sections = [
    'world',
    'sport',
    'culture',
    'books',
    'artanddesign',
    'environment',
    'technology',
  ]

  let selectedSections: string[]

  /** @todo Not sure if a question mark is needed here, check it out */
  if (urlParsed.searchAll.section?.length) {
    selectedSections = urlParsed.searchAll.section[0].split('|')
  } else {
    selectedSections = []
  }

  const handleClick = (isActive: boolean, id: string) => {
    const { location } = window
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
  return (
    <div className='mb-8 flex gap-2 text-xs'>
      {sections.map((section) => {
        const isActive = selectedSections.includes(section)
        return (
          <button
            onClick={() => handleClick(isActive, section)}
            className={clsx(isActive && 'bg-purple-500', 'border p-2')}
            key={section}
          >
            {section}
          </button>
        )
      })}
    </div>
  )
}
