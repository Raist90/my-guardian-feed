import type { GuardianAPIData } from '@/types'
import fetch from 'cross-fetch'

/**
 * Use this only serverside in order to not expose your api key
 *
 * @todo Make sure to complete this one
 */
export async function getGuardianData() {
  const response = await fetch(
    `${import.meta.env.GUARDIAN_API}/search?q=italy AND sweden&show-fields=trailText,thumbnail&show-tags=all&section=world|politic|economic|culture&order-by=newest&api-key=${import.meta.env.GUARDIAN_API_KEY}`,
  )

  const guardianData: Awaited<GuardianAPIData> = await response.json()
  return guardianData
}
