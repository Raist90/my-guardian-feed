import { isArray } from '@/helpers/predicates'
import type { News } from '@/types'
import React from 'react'
import { useData } from 'vike-react/useData'

export default function Page() {
  const news = useData<News>()

  return (
    <section className='grid gap-8 p-8'>
      <div>
        <h1 className='text-3xl'>{news.title}</h1>
      </div>

      <div className='flex w-full flex-col gap-4 lg:flex-row'>
        <div className='relative aspect-video max-h-[200px] w-full md:max-h-[400px]'>
          <img
            className='absolute h-full w-full object-cover'
            src={news.media.src}
            alt={news.media.alt}
          />
        </div>

        <div className='text-sm'>
          <p className='mb-1 text-xs'>{news.publishedOn}</p>
          <p className='mb-4 text-xl italic'>{news.excerpt}</p>
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

      <div>
        <div
          className='[&_p]:mb-4'
          dangerouslySetInnerHTML={{ __html: news.body }}
        />
      </div>
    </section>
  )
}
