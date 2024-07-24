export { authHandler }

import {
  checkUserPass,
  generateToken,
  getUserByEmail,
  userExists,
} from '@/auth'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { setCookie } from 'hono/cookie'
import { UserSchema } from './schemas'

/** @todo Move this elsewhere if reused across other handlers */
const msgs = {
  userNotFound: (email: string) => `User with email ${email} not found.`,
  invalidPass: (email: string) => `Password for user ${email} is invalid.`,
  SUCCESS: 'Successfully logged in!',
} as const

const ReqSchema = UserSchema

const router = new Hono()

const authHandler = router.post(
  '/auth',
  zValidator('json', ReqSchema, async (result, c) => {
    if (!result.success) {
      return c.json({ error: result.error.message })
    }

    const { data: req } = result
    const rows = await getUserByEmail(req.email)

    if (!userExists(rows)) {
      const payload = { error: msgs.userNotFound(req.email) }
      return c.json(payload)
    }

    const isValidPass = await checkUserPass(
      req.password,
      rows[0].password as string,
    )

    if (!isValidPass) {
      const payload = { error: msgs.invalidPass(req.email) }
      return c.json(payload)
    }

    const token = await generateToken(req.email)

    /** @todo Make sure to rename this one */
    setCookie(c, 'token', JSON.stringify(token))

    const payload = { success: msgs.SUCCESS }
    return c.json(payload)
  }),
)
