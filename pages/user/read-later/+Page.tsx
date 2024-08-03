import { Feed } from '@/components/Feed'
import { NewsCardList } from '@/components/NewsCardList'
import type { NewsCard } from '@/types'
import { usePageContext } from 'vike-react/usePageContext'

function Page() {
  const {
    userFeeds: { readLaterData },
  } = usePageContext()

  const newsCardList: NewsCard[] = readLaterData
    ? JSON.parse(readLaterData)
    : []

  return (
    <Feed title='Read later list'>
      <NewsCardList newsCardList={newsCardList} />
    </Feed>
  )
}

export default Page
