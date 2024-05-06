export { data }

import { getGuardianData } from '@/helpers/getGuardianData'
import { newsCardListTransformer } from '@/helpers/newsCardListTransformer'

async function data() {
  const guardianData = await getGuardianData({
    page: 1,
    // query: 'europe AND italy',
    query: '',
    section: 'world|politic|economic|culture',
  })

  return newsCardListTransformer(guardianData)
}
