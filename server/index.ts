import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { compress } from 'hono/compress'
import {
  addCustomFeedURLHandler,
  addReadLaterHandler,
  addUserHandler,
  catchAllHandler,
  loadCustomFeedURLHandler,
} from './handlers'
import { authHandler } from './handlers/auth'

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

/**
 * @todo Merge addCustomFeedURLHandler and loadCustomFeedURLHandler in the same
 *   route and also check implementation
 */
const routes = app
  .route('/', addReadLaterHandler)
  .route('/', addCustomFeedURLHandler)
  .route('/', loadCustomFeedURLHandler)
  .route('/', addUserHandler)
  .route('/', authHandler)
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
