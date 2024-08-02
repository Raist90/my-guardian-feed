export {
  DASHBOARD_ROUTE,
  FEED_KEY,
  HARDCODED_SECTION_LIST,
  HOMEPAGE_ROUTE,
  IMAGE_PLACEHOLDER,
  NO_CLIENTSIDE,
  NO_SERVERSIDE,
  ONE_HOUR,
  PAGE_ROUTE_PREFIX,
  SEARCH_ROUTE,
  SECTION_ROUTE_PREFIX,
  SITE_TITLE,
  TEN_MINUTES,
  TOAST_MESSAGES,
  TOAST_TYPES,
}

// routes and route prefixes
const HOMEPAGE_ROUTE = '/'
const SEARCH_ROUTE = '/search'
const PAGE_ROUTE_PREFIX = 'search?page='
const SECTION_ROUTE_PREFIX = 'search?section='
const DASHBOARD_ROUTE = '/user/dashboard'

// TTLs in milliseconds
const TEN_MINUTES = 600000
const ONE_HOUR = 3600000

// localStorage keys
const FEED_KEY = 'feedURL'

// toasts
/** @todo Eventually toast related stuff will be moved elsewhere */
const TOAST_MESSAGES = {
  SAVE_FILTERS: 'Your filters were correctly saved!',
}

const TOAST_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const

// fallback values
const IMAGE_PLACEHOLDER = 'https://placehold.co/600x400'

// hardcoded values
const HARDCODED_SECTION_LIST = [
  'world',
  'sport',
  'culture',
  'books',
  'artanddesign',
  'environment',
  'technology',
]

// error messages
function NO_SERVERSIDE(funcName: string): string {
  return `You are using ${funcName} on server while it is meant to be used only clientside`
}

function NO_CLIENTSIDE(funcName: string): string {
  return `You are using ${funcName} on client while it is meant to be used only serverside`
}

// misc
const SITE_TITLE = 'My Guardian Feed'
