export { data }

import { INITIAL_SECTIONS } from '@/constants'
import { getGuardianData } from '@/helpers/getGuardianData'
import { newsCardListTransformer } from '@/helpers/newsCardListTransformer'

async function data() {
  const guardianData = await getGuardianData({
    page: 1,
    /** @todo Delete this when not needed anymore */
    // query: 'europe AND italy',
    query: '',
    section: INITIAL_SECTIONS,
  })

  return newsCardListTransformer(guardianData)
}
