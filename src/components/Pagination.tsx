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
    urlClient,
    urlParsed,
  } = usePageContext() as PageContext<NewsCardWithPages>

  let prevPageUrl: string
  let nextPageUrl: string

  // on /search route
  const isSearchPageRoot =
    !urlParsed.searchOriginal ||
    ('page' in urlParsed.search && Object.keys(urlParsed.search).length === 1)
  // on /search? with queries
  const isSearchPageWithQueries = urlClient.includes('search')

  switch (true) {
    case isSearchPageRoot:
      prevPageUrl = `${PAGE_ROUTE_PREFIX}${currentPage - 1}`
      nextPageUrl = `${PAGE_ROUTE_PREFIX}${currentPage + 1}`
      break
    case isSearchPageWithQueries:
      // remove '&page=pageNumber' with split
      prevPageUrl = `${urlParsed.searchOriginal?.split('&')[0]}&page=${currentPage - 1}`
      nextPageUrl = `${urlParsed.searchOriginal?.split('&')[0]}&page=${currentPage + 1}`
      break
    default:
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
        {currentPage > 1 && (
          <Link intercept={true} href={prevPageUrl}>
            Prev page
          </Link>
        )}
        <Link intercept={true} href={nextPageUrl}>
          Next page
        </Link>
      </div>
      <p className='mt-8 text-center text-xs'>
        Page {currentPage} of {pages}
      </p>
    </>
  )
}
