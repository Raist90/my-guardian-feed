export type { AppType, User }

import type { AppType } from '..'

type User = {
  id: number
  email: string | null
  password: string | null
}
