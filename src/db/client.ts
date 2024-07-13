export { db }

import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

const turso = createClient({
  url: import.meta.env.TURSO_DB_URL,
  authToken: import.meta.env.TURSO_AUTH_TOKEN,
})

const db = drizzle(turso)
