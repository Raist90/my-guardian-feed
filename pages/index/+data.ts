import { getGuardianData } from '@/helpers/getGuardianData'
import type { GuardianAPIData, NewsCard } from '@/types'

export async function data() {
  const guardianData = await getGuardianData({
    page: 1,
    // query: 'europe AND italy',
    query: '',
    section: 'world|politic|economic|culture',
  })

  return transformer(guardianData)
}

function transformer(data: GuardianAPIData): NewsCard[] {
  const {
    response: { results },
  } = data

  return results.map((result) => {
    const {
      id,
      webPublicationDate,
      webTitle,
      fields: { thumbnail, trailText },
    } = result

    return {
      excerpt: trailText,
      id,
      media: {
        thumbnail,
        /** @todo Figure out how to extract this from `results` */
        alt: '',
      },
      publishedOn: webPublicationDate,
      title: webTitle,
    }
  })
}
