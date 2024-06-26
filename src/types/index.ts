export type { GuardianAPIData, GuardianAPIDataByID } from './api'
export type { News, NewsCard, NewsCardWithPages }

type Tag = {
  id: string
  title: string
}

type NewsCard = {
  excerpt: string
  id: string
  media: {
    thumbnail: string
    alt: string
  }
  publishedOn: string
  title: string
}

type NewsCardWithPages = {
  currentPage: number
  pages: number
  results: NewsCard[]
}

type News = {
  body: string
  caption?: string
  credit?: string
  publishedOn: string
  excerpt: string
  id: string
  media: {
    alt: string
    src: string
  }
  tags: Tag[]
  title: string
  type: 'image' | 'video'
}
