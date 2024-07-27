import { isArray } from '@/helpers/predicates'
import type { NewsCard as NewsCardType } from '@/types'
import { useState } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { NewsCard } from './NewsCard'

export { Dashboard }

type DashboardProps = {
  user: string | null
}

function Dashboard({ user }: DashboardProps) {
  const {
    userFeeds: { readLaterData: initialReadLaterData },
  } = usePageContext()

  const [newsCardList, setNewsCardList] = useState(initialReadLaterData)

  const newsCardListParsed =
    newsCardList && (JSON.parse(newsCardList) as NewsCardType[])

  // this is used in order to trigger NewsCard re-render
  const handleReadLaterDataUpdate = async (data: string | null) => {
    setNewsCardList(data)
  }
  return (
    <section className='p-4'>
      <div>
        <h2 className='text-xl'>Dashboard</h2>
        <p>Welcome back, {user}</p>
      </div>
      {isArray(newsCardListParsed) && newsCardListParsed.length && (
        <section className='grid-gap-6'>
          {newsCardListParsed.map((newsCard) => (
            <NewsCard
              key={newsCard.id}
              handleReadLaterDataUpdate={handleReadLaterDataUpdate}
              newsCard={newsCard}
              readLaterData={newsCardList}
            />
          ))}
        </section>
      )}
    </section>
  )
}
