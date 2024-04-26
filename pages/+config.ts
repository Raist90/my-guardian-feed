import Head from '@/layouts/HeadDefault.jsx'
import Layout from '@/layouts/LayoutDefault'
import vikeReact from 'vike-react/config'
import type { Config } from 'vike/types'

// Default config (can be overridden by pages)
export default {
  Layout,
  Head,
  // <title>
  title: 'My Vike App',
  extends: vikeReact,
} satisfies Config
