import './style.css'

import { Navigation } from '@/components/Navigation'
import React from 'react'
import './tailwind.css'

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <Navigation />
      {children}
    </main>
  )
}
