import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { compress } from 'hono/compress'
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

if (isProduction) {
  console.log(`Server listening on http://localhost:${port}`)
  serve({
    fetch: app.fetch,
    port,
  })
}

export default app
