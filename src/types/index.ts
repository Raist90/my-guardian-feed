type Tag = {
  apiUrl: string
  id: `${string}/${string}`
  sectionId: string
  sectionName: string
  type: string
  webTitle: string
  webUrl: string
}

type News = {
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

export type GuardianAPIData = {
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
    results: News[]
  }
}
