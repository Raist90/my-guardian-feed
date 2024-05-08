export { data }

import { getGuardianData } from '@/helpers/getGuardianData'
import { newsCardListTransformer } from '@/helpers/newsCardListTransformer'
import type { NewsCardWithPages } from '@/types'

async function data(): Promise<NewsCardWithPages> {
  const guardianData = await getGuardianData({
    page: 1,
    /** @todo Delete this when not needed anymore */
    // query: 'europe AND italy',
    query: '',
    section: undefined,
  })

  return newsCardListTransformer(guardianData)
}
