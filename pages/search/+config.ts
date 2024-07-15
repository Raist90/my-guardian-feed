import { SITE_TITLE } from '@/constants'
import Head from '@/layouts/HeadDefault.jsx'
import vikeReact from 'vike-react/config'
import type { Config } from 'vike/types'

export default {
  Head,
  title: `Search | ${SITE_TITLE}`,
  extends: vikeReact,
} satisfies Config
