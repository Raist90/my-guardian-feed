import { db } from '@/db/client'
import { usersTable } from '@/drizzle/schema'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import bcrypt from 'bcryptjs'
import { sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { compress } from 'hono/compress'
import { getCookie, setCookie } from 'hono/cookie'
import { sign } from 'hono/jwt'
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
  const pageContextInit = {
    urlOriginal: c.req.url,
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

function parseJwt(token: string): any {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

app.post('/get-token', async (c) => {
  const cookie = getCookie(c, 'token')

  if (!cookie) {
    return c.json({ error: 'No token found in cookie' })
  }

  const token = parseJwt(cookie)

  return c.json(token)
})

/** @todo This belongs to auth module/package */
function userExists(rows: (typeof usersTable.$inferSelect)[]): boolean {
  return rows.length > 0
}

/** @todo This belongs to auth module/package */
async function getUserByEmail(
  email: string,
): Promise<(typeof usersTable.$inferSelect)[]> {
  return await db
    .select()
    .from(usersTable)
    .where(sql`${usersTable.email} = ${email}`)
}

async function checkUserPass(
  plainPass: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(plainPass, hash)
}

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

async function generateToken(email: string, role?: string): Promise<string> {
  const jwtSecret = import.meta.env.JWT_SECRET
  const jwtPayload = {
    user: email,
    role: role || 'user',
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
  }
  return await sign(jwtPayload, jwtSecret, 'HS256')
}

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
