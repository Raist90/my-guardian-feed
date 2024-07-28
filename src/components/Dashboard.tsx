import { isArray } from '@/helpers/predicates'
import { useReadLater } from '@/hooks/useReadLater'
import type { NewsCard as NewsCardType } from '@/types'
import { NewsCard } from './NewsCard'

export { Dashboard }

type DashboardProps = {
  user: string | null
}

function Dashboard({ user }: DashboardProps) {
  const { readLaterData: initialReadLaterData, updateReadLaterData } =
    useReadLater()

  const newsCardListParsed =
    initialReadLaterData && (JSON.parse(initialReadLaterData) as NewsCardType[])

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
              handleReadLaterDataUpdate={updateReadLaterData}
              newsCard={newsCard}
              readLaterData={initialReadLaterData}
            />
          ))}
        </section>
      )}
    </section>
  )
}
