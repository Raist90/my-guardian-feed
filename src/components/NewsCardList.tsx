export { NewsCardList }

import type { NewsCard as NewsCardType } from '@/types'
import React from 'react'
import { NewsCard } from './NewsCard'
import { SectionList } from './SectionList'

type NewsCardListProps = {
  newsCardList: NewsCardType[]
}

function NewsCardList({ newsCardList }: NewsCardListProps) {
  return (
    <>
      <SectionList />
      <section className='grid gap-6'>
        {newsCardList.map((newsCard) => (
          <NewsCard key={newsCard.id} newsCard={newsCard} />
        ))}
      </section>
    </>
  )
}
