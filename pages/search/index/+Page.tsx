import { NewsCardList } from '@/components/NewsCardList'
import { Pagination } from '@/components/Pagination'
import type { NewsCardWithPages } from '@/types'
import React from 'react'
import { useData } from 'vike-react/useData'

export default function Page() {
  const newsCardList = useData<NewsCardWithPages>()

  return (
    <div className='mx-auto w-full p-4 xl:w-8/12'>
      <h1 className='pb-4 text-3xl font-bold'>News List</h1>
      <NewsCardList newsCardList={newsCardList.results} />
      <Pagination />
    </div>
  )
}
