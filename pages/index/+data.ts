export { data }

import { INITIAL_SECTIONS } from '@/constants'
import { getGuardianData } from '@/helpers/getGuardianData'
import { newsCardListTransformer } from '@/helpers/newsCardListTransformer'
import type { NewsCardWithPages } from '@/types'

async function data(): Promise<NewsCardWithPages> {
  const guardianData = await getGuardianData({
    page: 1,
    /** @todo Delete this when not needed anymore */
    // query: 'europe AND italy',
    query: '',
    section: INITIAL_SECTIONS,
  })

  return newsCardListTransformer(guardianData)
}
