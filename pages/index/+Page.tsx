import { Feed } from '@/components/Feed'
import { NewsCardList } from '@/components/NewsCardList'
import { Pagination } from '@/components/Pagination'
import { SectionList } from '@/components/SectionList'
import type { NewsCardWithPages } from '@/types'
import React from 'react'
import { useData } from 'vike-react/useData'

export default function Page() {
  const newsCardList = useData<NewsCardWithPages>()

  return (
    <Feed title='Guardian Feed'>
      <SectionList />
      <NewsCardList newsCardList={newsCardList.results} />
      <Pagination />
    </Feed>
  )
}
