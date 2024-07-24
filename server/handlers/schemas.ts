export { NewsListSchema, UserSchema }

import { z } from 'zod'

const NewsListSchema = z.union([
  z.array(
    z.object({
      excerpt: z.string(),
      id: z.string(),
      media: z.object({
        thumbnail: z.string(),
        alt: z.string(),
      }),
      publishedOn: z.string(),
      title: z.string(),
    }),
  ),
  z.null(),
])

const UserSchema = z.object({
  email: z.string(),
  password: z.string(),
})
