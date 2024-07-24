export { authHandler } from './auth'
export { addCustomFeedURLHandler, loadCustomFeedURLHandler } from './customFeed'
export { addReadLaterHandler } from './readLater'
export { addUserHandler } from './user'
export { catchAllHandler, getTokenHandler }

import { getUserByEmail, parseJwt, userExists } from '@/auth'
import { db } from '@/db/client'
import { userFeedsTable } from '@/drizzle/schema'
import { isArray } from '@/helpers/predicates'
import { sql } from 'drizzle-orm'
import { getCookie } from 'hono/cookie'
import { createFactory } from 'hono/factory'
import { renderPage } from 'vike/server'

const factory = createFactory()

async function getCustomFeedURL(email: string): Promise<{
  customFeedURL: string | null
  readLaterData: string | null
} | null> {
  const user = await getUserByEmail(email)

  if (!userExists(user)) {
    return null
  }

  const result = await db
    .select()
    .from(userFeedsTable)
    .where(sql`${userFeedsTable.userID} = ${user[0].id}`)

  if (isArray(result) && result.length > 0) {
    const customFeedURL = result?.length > 0 ? result[0]?.feedURL : null
    const readLaterData = result?.length > 0 ? result[0]?.readLater : null

    return { customFeedURL, readLaterData }
  }

  return null
}

const catchAllHandler = factory.createHandlers(async (c, next) => {
  const cookie = getCookie(c, 'token')

  const token = cookie && parseJwt(cookie)
  const userFeedsData = token?.user ? await getCustomFeedURL(token.user) : null

  const pageContextInit = {
    urlOriginal: c.req.url,
    urlClient: c.req.url.replace(import.meta.env.APP_URL, ''),
    token: {
      session: !!token,
      user: token?.user || null,
    },
    userFeeds: {
      customFeedURL: userFeedsData && userFeedsData?.customFeedURL,
      readLaterData: userFeedsData && userFeedsData?.readLaterData,
    },
  }

  const pageContext = await renderPage(pageContextInit)
  const { httpResponse } = pageContext

  if (!httpResponse) {
    return next()
  }

  const { body, statusCode, headers } = httpResponse
  headers.forEach(([name, value]) => c.header(name, value))
  c.status(statusCode)

  return c.body(body)
})

/**
 * @todo I think we don't need this but I will leave it here for now just in
 *   case. Anyway, this should be a GET request, not POST
 */
const getTokenHandler = factory.createHandlers(async (c) => {
  const cookie = getCookie(c, 'token')

  if (!cookie) {
    return c.json({ error: 'No token found in cookie' })
  }

  const token = parseJwt(cookie)

  return c.json(token)
})
