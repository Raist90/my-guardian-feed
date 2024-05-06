export { newsCardListTransformer }

import type { GuardianAPIData, NewsCard } from '@/types'

function newsCardListTransformer(data: GuardianAPIData): NewsCard[] {
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
