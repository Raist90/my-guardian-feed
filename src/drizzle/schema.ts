export { usersTable }

import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const usersTable = sqliteTable('users', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  email: text('email'),
  password: text('password'),
})
