import { Feed } from '@/components/Feed'
import { NewsCardList } from '@/components/NewsCardList'
import { Pagination } from '@/components/Pagination'
import { SectionList } from '@/components/SectionList'
import type { NewsCardWithPages } from '@/types'
import React from 'react'
import { useData } from 'vike-react/useData'
import { usePageContext } from 'vike-react/usePageContext'

export default function Page() {
  const newsCardList = useData<NewsCardWithPages>()
  const {
    userFeeds: { customFeedURL },
    urlClient,
  } = usePageContext()
  const title =
    customFeedURL && urlClient.includes(customFeedURL)
      ? 'Custom Feed'
      : 'Guardian Feed'

  return (
    <Feed title={title}>
      <SectionList />
      <NewsCardList newsCardList={newsCardList.results} />
      <Pagination />
    </Feed>
  )
}
