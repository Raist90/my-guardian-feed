import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { compress } from 'hono/compress'
import {
  addUserHandler,
  authHandler,
  catchAllHandler,
  getTokenHandler,
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

if (isProduction) {
  console.log(`Server listening on http://localhost:${port}`)
  serve({
    fetch: app.fetch,
    port,
  })
}

export default app
