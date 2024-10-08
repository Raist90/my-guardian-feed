export { newsCardTransformer }

import { IMAGE_PLACEHOLDER } from '@/constants'
import type { GuardianAPIDataByID, News } from '@/types'
import * as sanitizeHTML from 'sanitize-html'
import { assert } from './assert'

function newsCardTransformer(data: GuardianAPIDataByID): News {
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
  )?.assets

  const isImage = !!elements?.find((element) => element.relation === 'main')
  /** @todo Use this one or delete it */
  const isVideo = !!elements?.find((element) => element.relation === 'body')

  const metaData = isImage
    ? assets?.find((asset) => asset.typeData.width === '1000')
    : assets?.find((asset) => asset.typeData.iframeUrl)

  fields.body = sanitizeHTML.default(fields.body)

  const tags = contentTags.map((tag) => {
    const { id, webTitle } = tag
    return { id, title: webTitle }
  })

  // if no metaData we early return a different object
  if (!metaData) {
    return {
      body: fields.body,
      publishedOn: webPublicationDate,
      excerpt: fields.trailText,
      id,
      media: {
        alt: 'placeholder image',
        src: IMAGE_PLACEHOLDER,
      },
      tags,
      title: webTitle,
      type: 'image',
    }
  }

  // this is only for debugging
  assert(isImage || isVideo, 'Element is not an image or a video')

  const { typeData } = metaData
  assert(metaData, 'No metaData on element')
  assert(typeData.altText, 'No alt tag on element')

  if (isImage) {
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
  // if `isVideo` we use main as fallback for `file`
  else {
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
