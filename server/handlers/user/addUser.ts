export { addUserHandler }

import { generateToken, getUserByEmail, userExists } from '@/auth'
import { db } from '@/db/client'
import { userFeedsTable, usersTable } from '@/drizzle/schema'
import { zValidator } from '@hono/zod-validator'
import type { ResultSet } from '@libsql/client'
import bcrypt from 'bcryptjs'
import { Hono } from 'hono'
import { setCookie } from 'hono/cookie'
import { UserSchema } from '../schemas'

/** @todo Move this elsewhere if reused across other handlers */
const msgs = {
  userExistsErr: (email: string) => `User with email ${email} already exists`,
  SUCCESS: 'User successfully added!',
} as const

const ReqSchema = UserSchema

const router = new Hono()

const addUserHandler = router.post(
  '/add-user',
  zValidator('json', ReqSchema, async (result, c) => {
    if (!result.success) {
      return c.json({ error: result.error.message }, 500)
    }

    const { data: req } = result

    const rows = await getUserByEmail(req.email)

    if (userExists(rows)) {
      const payload = { error: msgs.userExistsErr(req.email) }
      return c.json(payload)
    }

    const hashedPassword = await bcrypt.hash(req.password, 10)

    await query(req.email, hashedPassword)

    const token = await generateToken(req.email)
    setCookie(c, 'token', JSON.stringify(token))

    return c.json({ success: msgs.SUCCESS })
  }),
)

async function query(email: string, password: string): Promise<ResultSet> {
  const user = await db
    .insert(usersTable)
    .values({ email, password })
    .returning({ id: usersTable.id })

  return await db
    .insert(userFeedsTable)
    .values({ id: user[0].id, userID: user[0].id })
}
