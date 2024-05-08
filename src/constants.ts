export {
  FEED_KEY,
  HOMEPAGE_ROUTE,
  INITIAL_SECTIONS,
  ONE_HOUR,
  PAGE_ROUTE_PREFIX,
  SEARCHPAGE_ROUTE,
  SECTION_ROUTE_PREFIX,
  TEN_MINUTES,
}

// routes and route prefixes
const HOMEPAGE_ROUTE = '/'
const PAGE_ROUTE_PREFIX = 'search?page='
/**
 * @todo This is not in use right now. Figure out what to do with it and delete
 *   it eventually
 */
const SEARCHPAGE_ROUTE = 'search'
const SECTION_ROUTE_PREFIX = 'search?section='

// fallback values
const INITIAL_SECTIONS = 'world|culture'

// TTLs in milliseconds
const TEN_MINUTES = 600000
const ONE_HOUR = 3600000

// localStorage keys
const FEED_KEY = 'feedURL'
