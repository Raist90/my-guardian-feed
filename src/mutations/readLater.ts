export { addNewsToReadList, executeReadLaterMutation, removeNewsFromReadList }

import { TOAST_TYPES } from '@/constants'
import { isArray } from '@/helpers/predicates'
import type { AppType } from '@/index'
import type { NewsCard } from '@/types'
import { hc } from 'hono/client'

const client = hc<AppType>(import.meta.env.BASE_URL)

async function executeReadLaterMutation(
  action: 'add' | 'remove',
  body: {
    email: string
    newsList: NewsCard[] | null
  },
  handlers: {
    setToastProps: React.Dispatch<
      React.SetStateAction<{
        message: string
        type: Lowercase<keyof typeof TOAST_TYPES>
      }>
    >
    updateReadLaterData: (data: string | null) => Promise<void>
  },
): Promise<void> {
  const res = await client['add-read-later'].$post({ json: body })
  const msg = (await res.json()) as { error: string } | { success: string }

  const { setToastProps, updateReadLaterData } = handlers

  switch (action) {
    case 'add': {
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
      break
    }
    case 'remove': {
      /**
       * This msgs should come directly from the handler or maybe not, but fix
       * it because of consistency
       */
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
    }
  }
}

function addNewsToReadList(
  news: NewsCard,
  user: string,
  readLaterData: string | null,
): {
  newsList: NewsCard[]
  email: string
} {
  let body

  if (readLaterData) {
    const readLaterParsed = JSON.parse(readLaterData) as NewsCard[]
    readLaterParsed.push(news)

    body = { newsList: readLaterParsed, email: user }
  } else {
    body = { newsList: [news], email: user }
  }
  return body
}

function removeNewsFromReadList(
  newsId: string,
  user: string,
  readLaterData: string,
): { newsList: NewsCard[] | null; email: string } {
  const readLaterParsed = JSON.parse(readLaterData) as NewsCard[]
  const filteredReadLaterParse = readLaterParsed.filter(
    (news) => news.id !== newsId,
  )

  const newsList =
    isArray(filteredReadLaterParse) && filteredReadLaterParse.length > 0
      ? filteredReadLaterParse
      : null

  const body = {
    newsList,
    email: user,
  }

  return body
}
