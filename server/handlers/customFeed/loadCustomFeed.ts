export { loadCustomFeedURLHandler }

import { getUserByEmail, userExists } from '@/auth'
import { db } from '@/db/client'
import { userFeedsTable } from '@/drizzle/schema'
import { zValidator } from '@hono/zod-validator'
import { sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'
import type { User } from '../types'

const msgs = {
  USER_NOT_FOUND: 'User does not exist',
  FEED_NOT_FOUND: 'Feed URL does not exist',
}

const ReqSchema = z.object({
  email: z.string(),
})

const router = new Hono()

const loadCustomFeedURLHandler = router.post(
  '/load-custom-feed-url',
  zValidator('json', ReqSchema, async (result, c) => {
    if (!result.success) {
      return c.json({ error: result.error.message }, 500)
    }

    const { data: req } = result

    const user = await getUserByEmail(req.email)
    if (!userExists(user)) {
      return c.json({ error: msgs.USER_NOT_FOUND })
    }

    const res = await query(user)

    /** @todo Double check if question mark is needed on res[0]?.feedURL */
    const customFeedURL = res?.length > 0 ? res[0]?.feedURL : null

    if (!customFeedURL) {
      return c.json({ error: msgs.FEED_NOT_FOUND }, 404)
    }

    return c.json({ customFeedURL })
  }),
)

/** @todo Maybe move return type elsewhere */
async function query(user: User[]): Promise<
  {
    favorite: string | null
    feedURL: string | null
    history: string | null
    id: number
    lists: string | null
    readLater: string | null
    suggestedNews: string | null
    userID: number | null
  }[]
> {
  return await db
    .select()
    .from(userFeedsTable)
    .where(sql`${userFeedsTable.userID} = ${user[0].id}`)
}
