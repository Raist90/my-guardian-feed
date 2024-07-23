export { AddReadLaterHandlerSchema }

import { z } from 'zod'

const AddReadLaterHandlerSchema = z.object({
  newsList: z.union([
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
  ]),
  email: z.string(),
})
