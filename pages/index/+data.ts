import { GuardianAPIData } from '@/types'
import fetch from 'cross-fetch'

export const data = async () => {
  const response = await fetch(
    `${import.meta.env.GUARDIAN_API}/search?q=italy AND sweden&show-fields=trailText&api-key=${import.meta.env.GUARDIAN_API_KEY}`,
  )

  const newsData: Awaited<GuardianAPIData> = await response.json()
  return newsData
}
