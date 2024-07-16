export { checkUserPass, generateToken, getUserByEmail, parseJwt, userExists }

import { db } from '@/db/client'
import { usersTable } from '@/drizzle/schema'
import bcrypt from 'bcryptjs'
import { sql } from 'drizzle-orm'
import { sign } from 'hono/jwt'

async function checkUserPass(
  plainPass: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(plainPass, hash)
}

async function generateToken(email: string, role?: string): Promise<string> {
  const jwtSecret = import.meta.env.JWT_SECRET
  const jwtPayload = {
    user: email,
    role: role || 'user',
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
  }
  return await sign(jwtPayload, jwtSecret, 'HS256')
}

async function getUserByEmail(
  email: string,
): Promise<(typeof usersTable.$inferSelect)[]> {
  return await db
    .select()
    .from(usersTable)
    .where(sql`${usersTable.email} = ${email}`)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseJwt(token: string): any {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

function userExists(rows: (typeof usersTable.$inferSelect)[]): boolean {
  return rows.length > 0
}
