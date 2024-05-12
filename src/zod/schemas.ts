export { GuardianAPIDataByIDSchema, GuardianAPIDataSchema }

import z from 'zod'

const TagSchema = z.object({
  apiUrl: z.string(),
  id: z.string(),
  sectionId: z.string().optional(),
  sectionName: z.string().optional(),
  type: z.string(),
  webTitle: z.string(),
  webUrl: z.string(),
})

const NewsCardSchema = z.object({
  id: z.string(),
  type: z.string(),
  sectionId: z.string(),
  sectionName: z.string(),
  webPublicationDate: z.string(),
  webTitle: z.string(),
  webUrl: z.string(),
  apiUrl: z.string(),
  isHosted: z.boolean(),
  pillarId: z.string(),
  pillarName: z.string(),
  fields: z.object({
    thumbnail: z.string().optional(),
    trailText: z.string(),
  }),
  tags: z.array(TagSchema),
})

const GuardianAPIDataSchema = z.object({
  response: z.object({
    status: z.string(),
    userTier: z.string(),
    total: z.number(),
    startIndex: z.number(),
    pageSize: z.number(),
    currentPage: z.number(),
    pages: z.number(),
    orderBy: z.string(),
    results: z.array(NewsCardSchema),
  }),
})

const NewsSchema = NewsCardSchema.omit({ fields: true }).extend({
  fields: z.object({
    body: z.string(),
    main: z.string(),
    trailText: z.string(),
  }),
})

const GuardianAPIDataByIDSchema = z.object({
  response: z.object({
    content: NewsSchema.extend({
      elements: z.array(
        z.object({
          relation: z.union([
            z.literal('body'),
            z.literal('main'),
            z.literal('thumbnail'),
          ]),
          assets: z.array(
            z.object({
              file: z.string(),
              typeData: z.object({
                altText: z.string().optional(),
                caption: z.string().optional(),
                credit: z.string().optional(),
                iframeUrl: z.string().optional(),
                width: z
                  .union([
                    z.literal('1000'),
                    z.literal('500'),
                    z.literal('100'),
                    z.string(),
                  ])
                  .optional(),
              }),
            }),
          ),
        }),
      ),
    }),
    status: z.string(),
    total: z.number(),
    userTier: z.string(),
  }),
})
