export { NewsCardList }

import { useReadLater } from '@/hooks/useReadLater'
import type { NewsCard as NewsCardType } from '@/types'
import { NewsCard } from './NewsCard'

type NewsCardListProps = {
  newsCardList: NewsCardType[]
}

function NewsCardList({ newsCardList }: NewsCardListProps) {
  const { readLaterData, updateReadLaterData } = useReadLater()

  return (
    <>
      <section className='grid gap-6'>
        {newsCardList.map((newsCard) => (
          <NewsCard
            key={newsCard.id}
            updateReadLaterData={updateReadLaterData}
            newsCard={newsCard}
            readLaterData={readLaterData}
          />
        ))}
      </section>
    </>
  )
}
