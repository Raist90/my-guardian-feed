import type { GuardianAPIData } from '@/types/index.js'
import React from 'react'
import { useData } from 'vike-react/useData'

export default function Page() {
  const {
    response: { results },
  } = useData<GuardianAPIData>()
  console.log('data', results)
  return (
    <div className='mx-auto w-full border p-4 xl:w-8/12'>
      <h1 className='pb-4 text-3xl font-bold'>News List</h1>
      <section className='grid gap-4'>
        {Array.isArray(results) &&
          results.map((result) => {
            const {
              id,
              webTitle,
              fields: { trailText },
            } = result
            return (
              <div key={id} className='border p-4'>
                <h2 className='pb-1 text-xl'>{webTitle}</h2>
                {/** @todo I need to strip html tags from this because editors are dumb as f**k */}
                <p>{trailText}</p>
              </div>
            )
          })}
      </section>
    </div>
  )
}
