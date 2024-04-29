/**
 * This file only contains raw data types. If you need frontend types check
 * `types/index.ts` file
 */
export type { GuardianAPIData, GuardianAPIDataByID }

type Tag = {
  apiUrl: string
  id: `${string}/${string}`
  sectionId: string
  sectionName: string
  type: string
  webTitle: string
  webUrl: string
}

type NewsCard = {
  id: string
  /** @todo Double-check this */
  type: string
  /** @todo Double-check this */
  sectionId: string
  /** @todo Double-check this */
  sectionName: string
  webPublicationDate: string
  webTitle: string
  webUrl: string
  apiUrl: string
  isHosted: boolean
  /** @todo Double-check this */
  pillarId: string
  /** @todo Double-check this */
  pillarName: string
  fields: {
    thumbnail: string
    trailText: string
  }
  tags: Tag[]
}

type GuardianAPIData = {
  response: {
    /** @todo This should be an union between different status codes */
    status: string
    userTier: string
    total: number
    startIndex: number
    pageSize: number
    currentPage: number
    pages: number
    /** @todo This should be an union between different values */
    orderBy: string
    results: NewsCard[]
  }
}

type News = Omit<NewsCard, 'fields'> & {
  fields: {
    body: string
    trailText: string
  }
}

type GuardianAPIDataByID = {
  response: {
    content: News & {
      elements: {
        relation: 'main' | 'thumbnail'
        assets: {
          file: string
          typeData: {
            altText: string
            caption: string
            credit: string
            width: '1000' | '500' | '100'
          }
        }[]
      }[]
    }
    /** @todo This should be an union between different status codes */
    status: string
    total: number
    userTier: string
  }
}
