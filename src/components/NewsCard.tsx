export { NewsCard }

import { removeHTMLTags } from '@/helpers/removeHTMLTags'
import type { NewsCard as NewsCardType } from '@/types'
import React from 'react'
import { Link } from './Link'

type NewsCardProps = {
  newsCard: NewsCardType
}

function NewsCard({ newsCard }: NewsCardProps) {
  const {
    excerpt,
    id,
    media: { alt, thumbnail },
    publishedOn,
    title,
  } = newsCard
  return (
    <div key={id} className='flex flex-col gap-4 p-4 md:flex-row'>
      <div className='relative aspect-video max-h-[200px] md:h-[100px]'>
        <img
          className='absolute h-full w-full object-cover'
          src={thumbnail}
          alt={alt}
        />
      </div>
      <div>
        <Link href={`news/${id}`}>
          <h2 className='mb-1 text-xl hover:underline'>{title}</h2>
        </Link>
        <p className='mb-2 text-sm'>{removeHTMLTags(excerpt)}</p>
        <p className='text-xs'>Published on {publishedOn.split('T')[0]}</p>
      </div>
    </div>
  )
}
