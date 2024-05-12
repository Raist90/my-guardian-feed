import React from 'react'
import appleTouchIcon from '../assets/apple-touch-icon.png'
import favicon16 from '../assets/favicon-16x16.png'
import favicon32 from '../assets/favicon-32x32.png'
import manifest from '../assets/site.webmanifest'

// Default <head> (can be overridden by pages)

export default function HeadDefault() {
  return (
    <>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      {/** @todo Make sure to change this one */}
      <meta name='description' content='My Guardian Feed' />
      <link rel='apple-touch-icon' sizes='180x180' href={appleTouchIcon} />
      <link rel='icon' type='image/png' sizes='32x32' href={favicon32} />
      <link rel='icon' type='image/png' sizes='16x16' href={favicon16} />
      <link rel='manifest' href={manifest} />
    </>
  )
}
