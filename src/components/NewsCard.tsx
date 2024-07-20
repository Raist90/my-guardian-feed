export { NewsCard }

import { TOAST_TYPES } from '@/constants'
import { assert } from '@/helpers/assert'
import { isArray, isString } from '@/helpers/predicates'
import { removeHTMLTags } from '@/helpers/removeHTMLTags'
import type { NewsCard, NewsCard as NewsCardType } from '@/types'
import clsx from 'clsx'
import { Clock } from 'lucide-react'
import React, { useState } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { Button } from './Button'
import { Link } from './Link'
import { Toast } from './Toast'

type NewsCardProps = {
  newsCard: NewsCardType
}

function NewsCard({ newsCard }: NewsCardProps) {
  const {
    excerpt,
    id,
    media: { alt, thumbnail },
    publishedOn,
    title,
  } = newsCard

  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [toastProps, setToastProps] = useState<{
    msg: string
    type: Lowercase<keyof typeof TOAST_TYPES>
  }>({ msg: '', type: TOAST_TYPES['ERROR'] })

  const {
    token: { session, user },
    userFeeds: { readLaterData },
  } = usePageContext()

  const initialIsReadLater = isString(readLaterData)
    ? readLaterData.length > 0 &&
      !!(JSON.parse(readLaterData) as NewsCard[])?.find(
        (news) => news.id === newsCard.id,
      )
    : false

  const [isReadLater, setIsReadLater] = useState(initialIsReadLater)

  const handleAddReadLater = async (): Promise<void> => {
    setIsLoading(true)
    setIsOpen(false)

    assert(user, 'User must be logged in to add news to read later list')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any

    if (readLaterData) {
      /**
       * @todo Maybe later export NewsCard schema from zod schemas file and use
       *   it here to safeParse
       */
      const readLaterParsed = JSON.parse(readLaterData) as NewsCard[]
      readLaterParsed.push(newsCard)

      body = JSON.stringify({ newsList: readLaterParsed, email: user })
    } else {
      body = JSON.stringify({ newsList: [newsCard], email: user })
    }

    const res = await fetch('add-read-later', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })

    const msg = await res.json()

    if ('error' in msg) {
      setToastProps({
        msg: msg.error,
        type: TOAST_TYPES['ERROR'],
      })
    } else {
      setToastProps({
        msg: msg.success,
        type: TOAST_TYPES['SUCCESS'],
      })

      setIsReadLater(true)
    }
    setIsOpen(true)
    setIsLoading(false)
  }

  const handleRemoveReadLater = async (): Promise<void> => {
    setIsLoading(true)
    setIsOpen(false)

    assert(user, 'User must be logged in to remove news from read later list')
    assert(
      readLaterData,
      'Read later data must be present to remove news from list',
    )

    const readLaterParsed = JSON.parse(readLaterData) as NewsCard[]
    const filteredReadLaterParse = readLaterParsed.filter(
      (news) => news.id !== newsCard.id,
    )

    const newsList =
      isArray(filteredReadLaterParse) && filteredReadLaterParse.length > 0
        ? filteredReadLaterParse
        : null

    const body = JSON.stringify({
      newsList,
      email: user,
    })

    const res = await fetch('add-read-later', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })

    const msg = await res.json()

    if ('error' in msg) {
      setToastProps({
        msg: 'Error removing news from Read later list',
        type: TOAST_TYPES['ERROR'],
      })
    } else {
      setToastProps({
        msg: 'News successfully removed from Read later list',
        type: TOAST_TYPES['SUCCESS'],
      })

      setIsReadLater(false)
    }
    setIsOpen(true)
    setIsLoading(false)
  }

  /** @todo Refactor this */
  const closeDialog = () => {
    setIsOpen(false)
    window.location.reload() // we use this instead of Vike reload() because it keeps the scroll position
  }

  return (
    <div key={id} className='flex flex-col gap-4 p-4 md:flex-row'>
      <div className='relative aspect-video max-h-[200px] md:h-[100px]'>
        <img
          className='absolute h-full w-full object-cover'
          src={thumbnail}
          alt={alt}
        />
      </div>
      <div>
        <Link href={`news/${id}`}>
          <h2 className='mb-1 text-xl hover:underline'>{title}</h2>
        </Link>
        <p className='mb-2 text-sm'>{removeHTMLTags(excerpt)}</p>
        <p className='text-xs'>Published on {publishedOn.split('T')[0]}</p>

        {session && (
          <section className='mt-4 items-center text-xs'>
            <Button
              handler={
                !isReadLater ? handleAddReadLater : handleRemoveReadLater
              }
              className={clsx(
                isReadLater && 'bg-gray-700',
                'inline-flex gap-2',
              )}
              type='button'
              isDisabled={isLoading}
            >
              <Clock size='14' />
              {!isReadLater ? 'Read later' : 'Remove from list'}
            </Button>
          </section>
        )}
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
