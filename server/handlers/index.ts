export {
  addCustomFeedURLHandler,
  addUserHandler,
  authHandler,
  catchAllHandler,
  getTokenHandler,
  loadCustomFeedURLHandler,
  router,
}

import {
  checkUserPass,
  generateToken,
  getUserByEmail,
  parseJwt,
  userExists,
} from '@/auth'
import { db } from '@/db/client'
import { userFeedsTable, usersTable } from '@/drizzle/schema'
import { isArray } from '@/helpers/predicates'
import bcrypt from 'bcryptjs'
import { sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { getCookie, setCookie } from 'hono/cookie'
import { createFactory } from 'hono/factory'
import { renderPage } from 'vike/server'

const router = new Hono()

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

const addCustomFeedURLHandler = factory.createHandlers(async (c) => {
  const req = await c.req.json<{ email: string; url: string }>()

  const user = await getUserByEmail(req.email)
  if (!userExists(user)) {
    return c.json({ error: 'User does not exist' })
  }

  await db
    .insert(userFeedsTable)
    .values({ id: user[0].id, userID: user[0].id, feedURL: req.url })
    .onConflictDoUpdate({
      target: userFeedsTable.id,
      set: { feedURL: req.url },
    })

  return c.json({ success: 'Feed URL added successfully' })
})

const loadCustomFeedURLHandler = factory.createHandlers(async (c) => {
  const req = await c.req.json<{ email: string }>()

  const user = await getUserByEmail(req.email)
  if (!userExists(user)) {
    return c.json({ error: 'User does not exist' })
  }

  const result = await db
    .select()
    .from(userFeedsTable)
    .where(sql`${userFeedsTable.userID} = ${user[0].id}`)

  const customFeedURL = result?.length > 0 ? result[0]?.feedURL : null

  if (!customFeedURL) {
    return c.json({ error: 'Feed URL does not exist' })
  }

  return c.json({ customFeedURL })
})

const addUserHandler = factory.createHandlers(async (c) => {
  const req = await c.req.json<{ email: string; password: string }>()
  const rows = await getUserByEmail(req.email)

  if (userExists(rows)) {
    const payload = { error: `User with email ${req.email} already exists.` }
    return c.json(payload)
  }

  const hashedPassword = await bcrypt.hash(req.password, 10)

  const user = await db
    .insert(usersTable)
    .values({ email: req.email, password: hashedPassword })
    .returning({ id: usersTable.id })

  await db.insert(userFeedsTable).values({ id: user[0].id, userID: user[0].id })

  const token = await generateToken(req.email)
  setCookie(c, 'token', JSON.stringify(token))

  return c.json({ success: 'User successfully added!' })
})

const authHandler = factory.createHandlers(async (c) => {
  const req = await c.req.json<{ email: string; password: string }>()
  const rows = await getUserByEmail(req.email)

  if (!userExists(rows)) {
    const payload = { error: `User with email "${req.email}" not found.` }
    return c.json(payload)
  }

  const isValidPass = await checkUserPass(
    req.password,
    rows[0].password as string,
  )

  if (!isValidPass) {
    const payload = { error: `Password for user "${req.email}" is invalid.` }
    return c.json(payload)
  }

  const token = await generateToken(req.email)

  /** @todo Make sure to rename this one */
  setCookie(c, 'token', JSON.stringify(token))

  const payload = { success: 'Successfully logged in!' }
  return c.json(payload)
})

const getTokenHandler = factory.createHandlers(async (c) => {
  const cookie = getCookie(c, 'token')

  if (!cookie) {
    return c.json({ error: 'No token found in cookie' })
  }

  const token = parseJwt(cookie)

  return c.json(token)
})
