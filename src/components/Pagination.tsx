export { Pagination }

import { PAGE_ROUTE_PREFIX } from '@/constants'
import type { NewsCardWithPages } from '@/types'
import clsx from 'clsx'
import React from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import type { PageContext } from 'vike/types'
import { Link } from './Link'

function Pagination() {
  const {
    data: { currentPage, pages },
    urlOriginal,
  } = usePageContext() as PageContext<NewsCardWithPages>

  let prevPageUrl: string
  let nextPageUrl: string
  if (urlOriginal.includes('search')) {
    prevPageUrl = `${urlOriginal}&page=${currentPage - 1}`
    nextPageUrl = `${urlOriginal}&page=${currentPage + 1}`
  } else {
    prevPageUrl = `${PAGE_ROUTE_PREFIX}${currentPage - 1}`
    nextPageUrl = `${PAGE_ROUTE_PREFIX}${currentPage + 1}`
  }

  return (
    <>
      <div
        className={clsx(
          currentPage > 1 && 'justify-between',
          'my-4 flex justify-end',
        )}
      >
        {currentPage > 1 && <Link href={prevPageUrl}>Prev page</Link>}
        <Link href={nextPageUrl}>Next page</Link>
      </div>
      <p className='mt-8 text-center text-xs'>
        Page {currentPage} of {pages}
      </p>
    </>
  )
}
