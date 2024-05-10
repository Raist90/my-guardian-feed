export { useCustomFeed }

import { FEED_KEY } from '@/constants'
import { useEffect, useState } from 'react'

function useCustomFeed() {
  let [customFeed, setCustomFeed] = useState<string | null>()

  useEffect(() => {
    const feed = localStorage.getItem(FEED_KEY)
    setCustomFeed(feed)
  }, [])

  return customFeed
}
