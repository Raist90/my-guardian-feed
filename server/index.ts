import { db } from '@/db/client'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import type { Row } from '@libsql/client'
import bcrypt from 'bcryptjs'
import { Hono } from 'hono'
import { compress } from 'hono/compress'
import { setCookie } from 'hono/cookie'
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

/** @todo This belongs to auth module/package */
function userExists(rows: Row[]): boolean {
  return rows.length > 0
}

/** @todo This belongs to auth module/package */
async function getUserByEmail(email: string): Promise<{ rows: Row[] }> {
  return await db.execute({
    sql: 'SELECT * FROM users WHERE email = ?',
    args: [email],
  })
}

async function checkUserPass(
  plainPass: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(plainPass, hash)
}

app.post('/auth', async (c) => {
  const req = await c.req.json<{ email: string; password: string }>()
  const { rows } = await getUserByEmail(req.email)

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

  const jwtPayload = {
    user: req.email,
    role: 'user',
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
  }

  const jwtSecret = import.meta.env.JWT_SECRET

  const token = await sign(jwtPayload, jwtSecret, 'HS256')

  /** @todo Make sure to rename this one */
  setCookie(c, 'token', JSON.stringify(token))

  return c.redirect('/dashboard')
})

if (isProduction) {
  console.log(`Server listening on http://localhost:${port}`)
  serve({
    fetch: app.fetch,
    port,
  })
}

export default app
