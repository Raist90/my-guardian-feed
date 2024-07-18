import React from 'react'
import { usePageContext } from 'vike-react/usePageContext'

export function Link({
  href,
  children,
  intercept,
}: {
  href: string
  children: React.ReactNode
  intercept?: boolean
}) {
  const pageContext = usePageContext()
  const { urlPathname } = pageContext
  const isActive =
    href === '/' ? urlPathname === href : urlPathname.startsWith(href)
  const rel = (intercept && 'external') || undefined
  return (
    <a href={href} rel={rel} className={isActive ? 'is-active' : undefined}>
      {children}
    </a>
  )
}
