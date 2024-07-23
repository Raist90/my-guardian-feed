import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { compress } from 'hono/compress'
import {
  addCustomFeedURLHandler,
  addReadLaterHandler,
  addUserHandler,
  authHandler,
  catchAllHandler,
  getTokenHandler,
  loadCustomFeedURLHandler,
} from './handlers'

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

app.get('*', ...catchAllHandler)

app.post('/get-token', ...getTokenHandler)
app.post('/auth', ...authHandler)
app.post('/add-user', ...addUserHandler)
app.post('/add-custom-feed-url', ...addCustomFeedURLHandler)
app.post('/load-custom-feed-url', ...loadCustomFeedURLHandler)
const routes = app.route('/', addReadLaterHandler)
export type AppType = typeof routes

if (isProduction) {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`)
  serve({
    fetch: app.fetch,
    port,
  })
}

export default app
