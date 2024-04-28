import type { GuardianAPIData } from '@/types'
import fetch from 'cross-fetch'

type Options = {
  page: number
  query: string
  section: string
}

/**
 * Use this only serverside in order to not expose your api key
 *
 * @todo Make sure to complete this one
 */
export async function getGuardianData(options: Options) {
  const page = options.page
  const query = options.query
  const section = options.section

  const response = await fetch(
    `${import.meta.env.GUARDIAN_API}/search?q=${query}&show-fields=trailText,thumbnail&show-tags=all&section=${section}&order-by=newest&page=${page}&api-key=${import.meta.env.GUARDIAN_API_KEY}`,
  )

  const guardianData: Awaited<GuardianAPIData> = await response.json()
  return guardianData
}
