import {
  checkUserPass,
  generateToken,
  getUserByEmail,
  parseJwt,
  userExists,
} from '@/auth'
import { db } from '@/db/client'
import { usersTable } from '@/drizzle/schema'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import bcrypt from 'bcryptjs'
import { Hono } from 'hono'
import { compress } from 'hono/compress'
import { getCookie, setCookie } from 'hono/cookie'
import { renderPage } from 'vike/server'

const isProduction = import.meta.env.MODE === 'production'
const port = Number(import.meta.env.PORT) || 3000

const app = new Hono()
app.use(compress())

if (isProduction) {
  app.use(
    '/*',
    serveStatic({
      root: `./dist/client/`,
    }),
  )
}
app.get('*', async (c, next) => {
  const cookie = getCookie(c, 'token')

  const token = cookie && parseJwt(cookie)

  const pageContextInit = {
    urlOriginal: c.req.url,
    token: {
      session: !!token,
      user: token?.user || null,
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

app.post('/get-token', async (c) => {
  const cookie = getCookie(c, 'token')

  if (!cookie) {
    return c.json({ error: 'No token found in cookie' })
  }

  const token = parseJwt(cookie)

  return c.json(token)
})

app.post('/auth', async (c) => {
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

app.post('/add-user', async (c) => {
  const req = await c.req.json<{ email: string; password: string }>()
  const rows = await getUserByEmail(req.email)

  if (userExists(rows)) {
    const payload = { error: `User with email ${req.email} already exists.` }
    return c.json(payload)
  }

  const hashedPassword = await bcrypt.hash(req.password, 10)

  await db
    .insert(usersTable)
    .values({ email: req.email, password: hashedPassword })

  const token = await generateToken(req.email)
  setCookie(c, 'token', JSON.stringify(token))

  return c.json({ success: 'User successfully added!' })
})

if (isProduction) {
  console.log(`Server listening on http://localhost:${port}`)
  serve({
    fetch: app.fetch,
    port,
  })
}

export default app
