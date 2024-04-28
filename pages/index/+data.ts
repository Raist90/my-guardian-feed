import { getGuardianData } from '@/helpers/getGuardianData'

/**
 * @todo All options params will be passed from clientside. We maybe need to
 *   inject some initial state because of index page
 */
export async function data() {
  return await getGuardianData({
    page: 1,
    query: 'europe AND italy',
    section: 'world|politic|economic|culture',
  })
}
