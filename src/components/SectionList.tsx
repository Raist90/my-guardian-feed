export { SectionList }
import { FEED_KEY, HOMEPAGE_ROUTE, SECTION_ROUTE_PREFIX } from '@/constants'
import { isDevelopment } from '@/helpers/isDevelopment'
import clsx from 'clsx'
import React from 'react'
import { usePageContext } from 'vike-react/usePageContext'

function SectionList() {
  const { urlOriginal, urlParsed } = usePageContext()
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

  /** @todo Move this somewhere else */
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

  /** @todo Move this somewhere else */
  const handleSave = () => {
    const { localStorage } = window
    // remove page number from URL because we don't want to store it on localStorage
    const currentURL = urlOriginal.split('&page')[0]

    const hasStoredURL = !!localStorage.getItem(FEED_KEY)
    if (hasStoredURL) {
      localStorage.removeItem(FEED_KEY)
      if (isDevelopment) console.log(`${FEED_KEY} removed!`)
      localStorage.setItem(FEED_KEY, currentURL)
      if (isDevelopment)
        console.log(
          `${FEED_KEY} stored! URL is:`,
          localStorage.getItem(FEED_KEY),
        )
      return
    }
    localStorage.setItem(FEED_KEY, currentURL)
    if (isDevelopment)
      console.log(`${FEED_KEY} stored! URL is:`, localStorage.getItem(FEED_KEY))
  }

  /** @todo Move this somewhere else */
  const handleLoad = () => {
    const { location, localStorage } = window
    const storedURL = localStorage.getItem(FEED_KEY)
    if (storedURL) {
      location.href = storedURL
    }
    if (isDevelopment) console.log('No stored filters')
  }

  return (
    <div className='mb-8 flex flex-wrap justify-between gap-y-4 text-xs'>
      <div className='flex flex-wrap gap-2'>
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
      <div>
        <button onClick={handleLoad} className='border p-2'>
          Load filters
        </button>
        <button onClick={handleSave} className='border p-2'>
          Save filters
        </button>
      </div>
    </div>
  )
}
