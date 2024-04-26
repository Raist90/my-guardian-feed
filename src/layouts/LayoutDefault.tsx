import './style.css'

import { Link } from '@/components/Link'
import React from 'react'
import './tailwind.css'

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='p-4'>
      <Navigation />
      {children}
    </main>
  )
}

function Navigation() {
  return (
    <nav className='mb-4 inline-flex gap-2 border p-4'>
      <Link href='/'>Feed</Link>
    </nav>
  )
}
