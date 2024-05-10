import { Feed } from '@/components/Feed'
import { NewsCardList } from '@/components/NewsCardList'
import { Pagination } from '@/components/Pagination'
import { SEARCH_ROUTE } from '@/constants'
import type { NewsCardWithPages } from '@/types'
import React from 'react'
import { useData } from 'vike-react/useData'
import { usePageContext } from 'vike-react/usePageContext'

export default function Page() {
  const newsCardList = useData<NewsCardWithPages>()
  const { urlOriginal } = usePageContext()

  const isCustomFeed = urlOriginal !== SEARCH_ROUTE

  const title = isCustomFeed ? 'Custom Feed' : 'Guardian Feed'

  return (
    <Feed title={title}>
      <NewsCardList newsCardList={newsCardList.results} />
      <Pagination />
    </Feed>
  )
}
