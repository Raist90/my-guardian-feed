import { getGuardianDataById } from '@/helpers/getGuardianData'
import { newsCardTransformer } from '@/helpers/newsCardTransformer'
import type { News } from '@/types'
import type { PageContextServer } from 'vike/types'

export async function data(pageContext: PageContextServer): Promise<News> {
  const guardianDataById = await getGuardianDataById(
    pageContext.routeParams['*'],
  )

  return newsCardTransformer(guardianDataById)
}
