import { SITE_TITLE } from '@/constants'
import Head from '@/layouts/HeadDefault.jsx'
import Layout from '@/layouts/LayoutDefault'
import vikeReact from 'vike-react/config'
import type { Config } from 'vike/types'

export default {
  Layout,
  Head,
  title: `Search | ${SITE_TITLE}`,
  extends: vikeReact,
} satisfies Config
