import { getGuardianDataById } from '@/helpers/getGuardianData'
import type { GuardianAPIDataByID, News } from '@/types'
import type { PageContextServer } from 'vike/types'

export async function data(pageContext: PageContextServer) {
  const guardianDataById = await getGuardianDataById(
    pageContext.routeParams['*'],
  )

  return transformer(guardianDataById)
}

function transformer(data: GuardianAPIDataByID): News {
  let news

  const {
    response: {
      content: {
        elements,
        fields,
        id,
        tags: contentTags,
        webPublicationDate,
        webTitle,
      },
    },
  } = data

  const assets = elements.find(
    (element) => element.relation === 'main',
  )?.assets!
  const metaData = assets.find((asset) => asset.typeData.width === '1000')!
  const { typeData } = metaData
  const tags = contentTags.map((tag) => {
    const { id, webTitle } = tag
    return { id, title: webTitle }
  })

  news = {
    body: fields.body,
    caption: typeData.caption,
    credit: typeData.credit,
    publishedOn: webPublicationDate,
    excerpt: fields.trailText,
    id,
    media: {
      alt: typeData.altText,
      src: metaData.file,
    },
    tags,
    title: webTitle,
  }

  return news
}
