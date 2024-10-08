export { addReadLaterHandler }

import { getUserByEmail, userExists } from '@/auth'
import { db } from '@/db/client'
import { userFeedsTable } from '@/drizzle/schema'
import { zValidator } from '@hono/zod-validator'
import type { ResultSet } from '@libsql/client'
import { Hono } from 'hono'
import { z } from 'zod'
import { NewsListSchema } from './schemas'
import type { User } from './types'

/** @todo Move this elsewhere if reused across other handlers */
const msgs = {
  USER_NOT_FOUND: 'User does not exist',
  SUCCESS: 'News was successfully added to your Read later list',
} as const

const ReqSchema = z.object({
  newsList: NewsListSchema,
  email: z.string(),
})

const router = new Hono()

const addReadLaterHandler = router.post(
  '/add-read-later',
  zValidator('json', ReqSchema, async (result, c) => {
    if (!result.success) {
      return c.json({ error: result.error.message }, 500)
    }

    const { data: req } = result

    const user = await getUserByEmail(req.email)
    if (!userExists(user)) {
      return c.json({ error: msgs.USER_NOT_FOUND }, 500)
    }

    const readLater = req.newsList ? JSON.stringify(req.newsList) : null
    await query(user, readLater)

    return c.json({ success: msgs.SUCCESS }, 200)
  }),
)

async function query(user: User[], data: string | null): Promise<ResultSet> {
  return await db
    .insert(userFeedsTable)
    .values({
      id: user[0].id,
      userID: user[0].id,
      readLater: data,
    })
    .onConflictDoUpdate({
      target: userFeedsTable.id,
      set: { readLater: data },
    })
}
