export { userFeedsTable, usersTable }

import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const usersTable = sqliteTable('users', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  email: text('email'),
  password: text('password'),
})

const userFeedsTable = sqliteTable('userFeeds', {
  favorite: text('favorite'),
  feedURL: text('feed_url'),
  history: text('history'),
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  lists: text('lists'),
  readLater: text('read_later'),
  suggestedNews: text('suggested_news'),
  userID: integer('user_id').references(() => usersTable.id),
})
