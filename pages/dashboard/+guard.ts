export { guard }

import { redirect } from 'vike/abort'
import type { PageContext } from 'vike/types'

async function guard(pageContext: PageContext) {
  const {
    token: { session },
  } = pageContext

  if (!session) throw redirect('/login')
}
