import { assert } from '@/helpers/assert'
import { getGuardianDataById } from '@/helpers/getGuardianData'
import { isString } from '@/helpers/predicates'
import type { GuardianAPIDataByID, News } from '@/types'
import { render } from 'vike/abort'
import type { PageContextServer } from 'vike/types'

export async function data(pageContext: PageContextServer): Promise<News> {
  const guardianDataById = await getGuardianDataById(
    pageContext.routeParams['*'],
  )

  return transformer(guardianDataById)
}

function transformer(data: GuardianAPIDataByID): News {
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

  const assets = elements?.find(
    (element) => element.relation === 'main' || element.relation === 'body',
  )?.assets!

  const isImage = !!elements?.find((element) => element.relation === 'main')
  const isVideo = !!elements?.find((element) => element.relation === 'body')
  assert(isImage || isVideo, 'Element is not an image or a video')

  const metaData = isImage
    ? assets?.find((asset) => asset.typeData.width === '1000')!
    : assets?.find((asset) => asset.typeData.iframeUrl)
  assert(metaData, 'No metaData on element')

  const { typeData } = metaData
  const tags = contentTags.map((tag) => {
    const { id, webTitle } = tag
    return { id, title: webTitle }
  })

  if (isImage) {
    assert(typeData.altText)
    return {
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
      type: 'image',
    }
  }
  // if `isVideo` we use a thumbnail as fallback for `file`
  else {
    assert(typeData.altText)
    return {
      body: fields.body,
      excerpt: fields.trailText,
      id,
      media: {
        alt: typeData.altText,
        src: fields.main,
      },
      publishedOn: webPublicationDate,
      tags,
      title: webTitle,
      type: 'video',
    }
  }
}
