import { SITE_TITLE } from '@/constants'
import type { News } from '@/types'
import type { PageContext } from 'vike/types'

export function title(pageContext: PageContext<News>): string {
  return `${pageContext.data.title} | ${SITE_TITLE}`
}
