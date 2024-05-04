import { Link } from '@/components/Link'
import { isArray } from '@/helpers/predicates'
import { removeHTMLTags } from '@/helpers/removeHTMLTags'
import type { NewsCard } from '@/types'
import React from 'react'
import { useData } from 'vike-react/useData'

export default function Page() {
  const newsCardList = useData<NewsCard[]>()

  return (
    <div className='mx-auto w-full p-4 xl:w-8/12'>
      <h1 className='pb-4 text-3xl font-bold'>News List</h1>
      {/** @todo Make a tab list with the sections you want to query for */}
      <section className='grid gap-6'>
        {isArray(newsCardList) &&
          newsCardList.map((newsCard) => {
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
                  <p className='text-xs'>
                    Published on {publishedOn.split('T')[0]}
                  </p>
                </div>
              </div>
            )
          })}
      </section>
    </div>
  )
}
