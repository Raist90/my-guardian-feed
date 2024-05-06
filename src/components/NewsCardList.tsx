export { NewsCardList }

import type { NewsCard as NewsCardType } from '@/types'
import React from 'react'
import { NewsCard } from './NewsCard'
import { SectionList } from './SectionList'

type NewsCardListProps = {
  newsCardList: NewsCardType[]
}

/** @todo Div, h1 and section should be outside of this component */
function NewsCardList({ newsCardList }: NewsCardListProps) {
  return (
    <div className='mx-auto w-full p-4 xl:w-8/12'>
      <h1 className='pb-4 text-3xl font-bold'>News List</h1>
      <SectionList />
      <section className='grid gap-6'>
        {newsCardList.map((newsCard) => (
          <NewsCard key={newsCard.id} newsCard={newsCard} />
        ))}
      </section>
    </div>
  )
}
