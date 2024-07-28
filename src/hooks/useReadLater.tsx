export { useReadLater }

import { useState } from 'react'
import { usePageContext } from 'vike-react/usePageContext'

function useReadLater(): {
  readLaterData: string | null
  updateReadLaterData: (data: string | null) => Promise<void>
} {
  const {
    userFeeds: { readLaterData: initialReadLaterData },
  } = usePageContext()

  const [readLaterData, setReadLaterData] = useState<string | null>(
    initialReadLaterData,
  )

  async function updateReadLaterData(data: string | null): Promise<void> {
    setReadLaterData(data)
  }

  return { readLaterData, updateReadLaterData }
}
