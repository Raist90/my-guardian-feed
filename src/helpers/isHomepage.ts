export { isHomepage }

import { HOMEPAGE_ROUTE, NO_SERVERSIDE, SEARCH_ROUTE } from '@/constants'
import { assert } from './assert'
import { isBrowser } from './isBrowser'

function isHomepage(currentUrl: string): boolean {
  const msg = NO_SERVERSIDE(isHomepage.name)
  assert(isBrowser(), msg)

  return currentUrl === HOMEPAGE_ROUTE || currentUrl === SEARCH_ROUTE
}
