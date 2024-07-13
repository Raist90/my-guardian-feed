import type { Config } from 'drizzle-kit'

export default {
  schema: './src/drizzle/schema.ts',
  out: './src/drizzle/migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DB_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config
