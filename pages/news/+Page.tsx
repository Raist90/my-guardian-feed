import { assert } from '@/helpers/assert'
import { isArray } from '@/helpers/predicates'
import type { News } from '@/types'
import React from 'react'
import { useData } from 'vike-react/useData'

export default function Page() {
  const news = useData<News>()

  const isImage = news.type === 'image'
  const isVideo = news.type === 'video'
  assert(isImage || isVideo, 'Element is not an image or a video')

  let videoSrc

  if (isVideo) {
    const regex = /<iframe .*?src="(.*?)".*?><\/iframe>/
    // this will return only the src attribute from the HTML response
    videoSrc = news.media.src.split(regex)[1]
  } else videoSrc = news.media.src

  return (
    <section className='grid gap-8 p-4 md:p-8'>
      <div>
        <h1 className='text-xl lg:text-3xl'>{news.title}</h1>
      </div>

      <div className='grid w-full gap-4 lg:grid-cols-12'>
        <div className='relative aspect-video w-full lg:col-span-7'>
          {isImage ? (
            <img
              className='absolute h-full w-full object-cover'
              src={news.media.src}
              alt={news.media.alt}
            />
          ) : (
            <iframe
              className='absolute h-full w-full object-cover'
              src={videoSrc}
            />
          )}
        </div>

        <div className='text-sm lg:col-span-5'>
          <p className='mb-1 text-xs'>{news.publishedOn}</p>
          <p className='mb-4 hidden text-xl italic'>{news.excerpt}</p>
          <p className='mb-1'>{news.caption}</p>
          <p className='mb-4 text-xs'>{news.credit}</p>
          <ul className='flex flex-wrap gap-x-2 gap-y-1 text-xs'>
            {isArray(news.tags) &&
              news.tags.map((tag) => {
                const { id, title } = tag
                return (
                  <li className='italic' key={id}>
                    #{title.toLowerCase()}
                  </li>
                )
              })}
          </ul>
        </div>
      </div>

      <div className='my-8 lg:mx-auto lg:w-8/12'>
        <div
          className='[&_a]:underline [&_div]:mb-12 [&_p]:mb-4'
          dangerouslySetInnerHTML={{ __html: news.body }}
        />
      </div>
    </section>
  )
}
