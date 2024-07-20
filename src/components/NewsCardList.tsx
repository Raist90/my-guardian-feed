export { NewsCardList }

import type { NewsCard as NewsCardType } from '@/types'
import React, { useState } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { NewsCard } from './NewsCard'
import { SectionList } from './SectionList'

type NewsCardListProps = {
  newsCardList: NewsCardType[]
}

function NewsCardList({ newsCardList }: NewsCardListProps) {
  const {
    userFeeds: { readLaterData: initialReadLaterData },
  } = usePageContext()
  const [readLaterData, setReadLaterData] = useState(initialReadLaterData)

  // this is used in order to trigger NewsCard re-render
  const handleReadLaterDataUpdate = async (data: string | null) => {
    setReadLaterData(data)
  }
  return (
    <>
      <SectionList />
      <section className='grid gap-6'>
        {newsCardList.map((newsCard) => (
          <NewsCard
            key={newsCard.id}
            handleReadLaterDataUpdate={handleReadLaterDataUpdate}
            newsCard={newsCard}
            readLaterData={readLaterData}
          />
        ))}
      </section>
    </>
  )
}
