export { NewsCardList }

import type { NewsCard as NewsCardType } from '@/types'
import React from 'react'
import { NewsCard } from './NewsCard'

type NewsCardListProps = {
  newsCardList: NewsCardType[]
}

function NewsCardList({ newsCardList }: NewsCardListProps) {
  return (
    <div className='mx-auto w-full p-4 xl:w-8/12'>
      <h1 className='pb-4 text-3xl font-bold'>News List</h1>
      <section className='grid gap-6'>
        {newsCardList.map((newsCard) => (
          <NewsCard key={newsCard.id} newsCard={newsCard} />
        ))}
      </section>
    </div>
  )
}
