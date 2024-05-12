import { isDevelopment } from '@/helpers/isDevelopment'
import React from 'react'
import { usePageContext } from 'vike-react/usePageContext'

export default function Page() {
  const { abortReason, is404 } = usePageContext()
  if (is404) {
    return (
      <div className='p-4'>
        <h1>404 Page Not Found</h1>
        <p>This page could not be found.</p>
      </div>
    )
  } else {
    return (
      <div className='p-4'>
        <h1>500 Internal Server Error</h1>
        {isDevelopment && abortReason ? (
          <p>{String(abortReason)}</p>
        ) : (
          <p>Something went wrong.</p>
        )}
      </div>
    )
  }
}
