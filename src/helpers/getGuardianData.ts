export { getGuardianData, getGuardianDataById }

import { ONE_HOUR, TEN_MINUTES } from '@/constants'
import type { GuardianAPIData, GuardianAPIDataByID } from '@/types'
import { GuardianAPIDataByIDSchema, GuardianAPIDataSchema } from '@/zod/schemas'
import { assert } from './assert'
import { fetchWithCache } from './fetchWithCache'

type Options = {
  page: number
  query: string
  section: string
}

// use this only serverside in order to not expose the api key
async function getGuardianData(options: Options): Promise<GuardianAPIData> {
  const { page, query, section } = options

  const guardianData = await fetchWithCache<GuardianAPIData>(
    `${import.meta.env.GUARDIAN_API}/search?q=${query}&show-fields=trailText,thumbnail&show-tags=all&section=${section}&order-by=newest&page=${page}&api-key=${import.meta.env.GUARDIAN_API_KEY}`,
    TEN_MINUTES,
  )

  const { data, success, error } = GuardianAPIDataSchema.safeParse(guardianData)
  assert(success, error)

  return data
}

async function getGuardianDataById(id: string): Promise<GuardianAPIDataByID> {
  const guardianDataById = await fetchWithCache<GuardianAPIDataByID>(
    `${import.meta.env.GUARDIAN_API}/${id}?api-key=${import.meta.env.GUARDIAN_API_KEY}&show-fields=all&show-elements=all&show-tags=all`,
    ONE_HOUR,
  )

  const { data, success, error } =
    GuardianAPIDataByIDSchema.safeParse(guardianDataById)
  assert(success, error)

  return data
}
