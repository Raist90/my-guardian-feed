import { NewsCardList } from '@/components/NewsCardList'
import type { NewsCard } from '@/types'
import React from 'react'
import { useData } from 'vike-react/useData'

export default function Page() {
  const newsCardList = useData<NewsCard[]>()

  return <NewsCardList newsCardList={newsCardList} />
}
