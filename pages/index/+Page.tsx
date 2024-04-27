import { removeHTMLTags } from '@/helpers'
import type { GuardianAPIData } from '@/types'
import React from 'react'
import { useData } from 'vike-react/useData'

export default function Page() {
  const {
    response: { results },
  } = useData<GuardianAPIData>()

  return (
    <div className='mx-auto w-full border p-4 xl:w-8/12'>
      <h1 className='pb-4 text-3xl font-bold'>News List</h1>
      {/** @todo Make a tab list with the sections you want to query for */}
      <section className='grid gap-4'>
        {Array.isArray(results) &&
          results.map((result) => {
            const {
              id,
              webPublicationDate,
              webTitle,
              fields: { thumbnail, trailText },
            } = result
            return (
              <div
                key={id}
                className='flex flex-col gap-4 border p-4 md:flex-row'
              >
                <div className='relative aspect-video max-h-[200px] md:h-[100px]'>
                  <img
                    className='absolute h-full w-full object-cover'
                    src={thumbnail}
                    alt=''
                  />
                </div>
                <div>
                  <h2 className='mb-1 text-xl'>{webTitle}</h2>
                  <p className='mb-1 text-sm'>{removeHTMLTags(trailText)}</p>
                  <p className='text-xs'>{webPublicationDate}</p>
                </div>
              </div>
            )
          })}
      </section>
    </div>
  )
}
