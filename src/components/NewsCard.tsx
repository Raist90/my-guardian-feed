export { NewsCard }

import { READ_LATER_ROUTE } from '@/constants'
import { assert } from '@/helpers/assert'
import { isArray, isString } from '@/helpers/predicates'
import { removeHTMLTags } from '@/helpers/removeHTMLTags'
import { useToast } from '@/hooks/useToast'
import type { AppType } from '@/index'
import type { NewsCard, NewsCard as NewsCardType } from '@/types'
import clsx from 'clsx'
import { hc } from 'hono/client'
import { Clock } from 'lucide-react'
import React, { useState } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { Button } from './Button'
import { Link } from './Link'
import { Toast } from './Toast'

type NewsCardProps = {
  newsCard: NewsCardType
  readLaterData: string | null
  /** This is used to trigger a re-render of the parent component */
  updateReadLaterData: (data: string | null) => Promise<void>
}

const client = hc<AppType>(import.meta.env.BASE_URL)

function NewsCard({
  updateReadLaterData,
  newsCard,
  readLaterData,
}: NewsCardProps) {
  const {
    excerpt,
    id,
    media: { alt, thumbnail },
    publishedOn,
    title,
  } = newsCard

  const { isOpen, toggleToast, toastProps, setToastProps } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const {
    token: { session, user },
    urlClient,
  } = usePageContext()

  const isReadLater = isString(readLaterData)
    ? readLaterData.length > 0 &&
      !!(JSON.parse(readLaterData) as NewsCard[])?.find(
        (news) => news.id === newsCard.id,
      )
    : false

  const isReadLaterFeed = urlClient === READ_LATER_ROUTE
  const hideFromReadLaterFeed = !isReadLater && isReadLaterFeed

  /** @todo This is similar to handleRemoveReadLater. Try to do some refactor */
  const handleAddReadLater = async (): Promise<void> => {
    setIsLoading(true)

    assert(user, 'User must be logged in to add news to read later list')
    let body

    if (readLaterData) {
      const readLaterParsed = JSON.parse(readLaterData) as NewsCard[]
      readLaterParsed.push(newsCard)

      body = { newsList: readLaterParsed, email: user }
    } else {
      body = { newsList: [newsCard], email: user }
    }

    const res = await client['add-read-later'].$post({ json: body })

    const msg = (await res.json()) as { error: string } | { success: string }

    if ('error' in msg) {
      setToastProps({
        message: msg.error,
        type: 'error',
      })
    } else {
      setToastProps({
        message: msg.success,
        type: 'success',
      })

      updateReadLaterData(JSON.stringify(body.newsList))
    }
    toggleToast()
    setIsLoading(false)
  }

  const handleRemoveReadLater = async (): Promise<void> => {
    setIsLoading(true)

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

    const body = {
      newsList,
      email: user,
    }

    const res = await client['add-read-later'].$post({ json: body })

    const msg = (await res.json()) as { error: string } | { success: string }

    if ('error' in msg) {
      setToastProps({
        message: 'Error removing news from Read later list',
        type: 'error',
      })
    } else {
      setToastProps({
        message: 'News successfully removed from Read later list',
        type: 'success',
      })

      updateReadLaterData(JSON.stringify(body.newsList))
    }
    toggleToast()
    setIsLoading(false)
  }

  return (
    <>
      {!hideFromReadLaterFeed && (
        <div key={id} className={'flex flex-col gap-4 p-4 md:flex-row'}>
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
            {/** @todo Refactor this into getPublishedDate or something like that */}
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
        </div>
      )}

      <Toast
        isOpen={isOpen}
        closeDialog={toggleToast}
        message={toastProps.message}
        type={toastProps.type}
      />
    </>
  )
}
