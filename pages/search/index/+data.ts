export { data }

import { getGuardianData } from '@/helpers/getGuardianData'
import { newsCardListTransformer } from '@/helpers/newsCardListTransformer'
import type { GuardianAPIData, NewsCard } from '@/types'
import type { PageContext } from 'vike/types'

async function data(pageContext: PageContext) {
  const guardianData = await getGuardianData({
    page: 1,
    query: pageContext.urlParsed.search.q || '',
    section: 'world|politic|economic|culture',
  })

  return newsCardListTransformer(guardianData)
}
