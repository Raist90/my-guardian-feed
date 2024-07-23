export { addReadLaterHandler }

import { getUserByEmail, userExists } from '@/auth'
import { db } from '@/db/client'
import { userFeedsTable } from '@/drizzle/schema'
import { zValidator } from '@hono/zod-validator'
import type { ResultSet } from '@libsql/client'
import { Hono } from 'hono'
import { z } from 'zod'
import { NewsListSchema } from './schemas'

/** @todo Move this elsewhere if reused across other handlers */
const msgs = {
  USER_NOT_FOUND: 'User does not exist',
  SUCCESS: 'News was successfully added to your Read later list',
}

const ReqSchema = z.object({
  newsList: NewsListSchema,
  email: z.string(),
})

const router = new Hono()

const addReadLaterHandler = router.post(
  '/add-read-later',
  zValidator('json', ReqSchema, async (result, c) => {
    if (!result.success) {
      return c.json({ error: result.error.message }, 400)
    }

    const { data } = result

    const user = await getUserByEmail(data.email)
    if (!userExists(user)) {
      return c.json({ error: msgs.USER_NOT_FOUND }, 500)
    }

    const readLater = data.newsList ? JSON.stringify(data.newsList) : null
    await query(user, readLater)

    return c.json({ success: msgs.SUCCESS }, 200)
  }),
)

async function query(
  user: { id: number; email: string | null; password: string | null }[],
  data: string | null,
): Promise<ResultSet> {
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
