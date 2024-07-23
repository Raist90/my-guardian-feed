export { addCustomFeedURLHandler }

import { getUserByEmail, userExists } from '@/auth'
import { db } from '@/db/client'
import { userFeedsTable } from '@/drizzle/schema'
import { zValidator } from '@hono/zod-validator'
import { ResultSet } from '@libsql/client'
import { Hono } from 'hono'
import { z } from 'zod'
import { User } from './types'

/** @todo Move this elsewhere if reused across other handlers */
const msgs = {
  USER_NOT_FOUND: 'User does not exist',
  SUCCESS: 'Feed URL added successfully',
} as const

const ReqSchema = z.object({
  email: z.string(),
  url: z.string(),
})

const router = new Hono()

const addCustomFeedURLHandler = router.post(
  '/add-custom-feed-url',
  zValidator('json', ReqSchema, async (result, c) => {
    if (!result.success) {
      return c.json({ error: result.error.message }, 500)
    }

    const { data: req } = result

    const user = await getUserByEmail(req.email)
    if (!userExists(user)) {
      return c.json({ error: msgs.USER_NOT_FOUND })
    }

    await query(user, req.url)

    return c.json({ success: msgs.SUCCESS })
  }),
)

async function query(user: User[], feedURL: string): Promise<ResultSet> {
  return await db
    .insert(userFeedsTable)
    .values({ id: user[0].id, userID: user[0].id, feedURL })
    .onConflictDoUpdate({
      target: userFeedsTable.id,
      set: { feedURL },
    })
}
