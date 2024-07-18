export { Feed }

import { isString } from '@/helpers/predicates'
import React from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { Link } from './Link'

type FeedProps = {
  children: React.ReactNode
  title?: string
  className?: string
}

function Feed({ title, children, ...rest }: FeedProps) {
  const {
    userFeeds: { customFeedURL },
  } = usePageContext()

  const { className } = rest

  const hasCustomFeed = !!customFeedURL

  return (
    <div
      className={
        (isString(className) && className) || 'mx-auto w-full p-4 xl:w-8/12'
      }
    >
      {title && <h1 className='mb-4 text-3xl font-bold'>{title}</h1>}
      {hasCustomFeed && (
        <p className='mb-7 inline-block rounded-r-md border-l-2 border-yellow-500 bg-gray-700 p-2 text-sm'>
          Hey! You are now seeing the default Guardian Feed. Click{' '}
          <Link href={customFeedURL!}>
            <span className='underline'>here</span>
          </Link>{' '}
          to reach your custom feed instead!
        </p>
      )}
      {children}
    </div>
  )
}
