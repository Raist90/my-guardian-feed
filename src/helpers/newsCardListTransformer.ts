export { newsCardListTransformer }

import { IMAGE_PLACEHOLDER } from '@/constants'
import type { GuardianAPIData, NewsCardWithPages } from '@/types'

function newsCardListTransformer(data: GuardianAPIData): NewsCardWithPages {
  const {
    response: { currentPage, pages, results },
  } = data

  return {
    currentPage,
    pages,
    results: results.map((result) => {
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
          thumbnail: thumbnail || IMAGE_PLACEHOLDER,
          /** @todo Figure out how to extract this from `results` */
          alt: '',
        },
        publishedOn: webPublicationDate,
        title: webTitle,
      }
    }),
  }
}
