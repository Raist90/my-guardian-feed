import type { GuardianAPIData } from '@/types'

/**
 * Regular expression to identify HTML tags in the input string. Replacing the
 * identified HTML tag with a null string
 */
export function removeHTMLTags(str: string | null) {
  if (str === null || str === '') return false
  else str = str.toString()

  return str.replace(/(<([^>]+)>)/gi, '')
}

/**
 * You can use this both clientside and serverside
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
