export { data }

import { getGuardianData } from '@/helpers/getGuardianData'
import { newsCardListTransformer } from '@/helpers/newsCardListTransformer'
import type { PageContext } from 'vike/types'

async function data(pageContext: PageContext) {
  const guardianData = await getGuardianData({
    page: Number(pageContext.urlParsed.search.page) || 1,
    query: pageContext.urlParsed.search.q || '',
    section: pageContext.urlParsed.search.section,
  })

  return newsCardListTransformer(guardianData)
}
