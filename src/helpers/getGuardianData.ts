export { getGuardianData, getGuardianDataById }

import type { GuardianAPIData, GuardianAPIDataByID } from '@/types'
import { GuardianAPIDataByIDSchema, GuardianAPIDataSchema } from '@/zod/schemas'
import fetch from 'cross-fetch'
import { assert } from './assert'

type Options = {
  page: number
  query: string
  section: string
}

/**
 * Use this only serverside in order to not expose your api key
 *
 * @todo Make sure to complete this one. Maybe could be worth to change this
 *   file name by adding server.ts at the end so that it will be only called
 *   serverside (check vike docs)
 */
async function getGuardianData(options: Options): Promise<GuardianAPIData> {
  const { page, query, section } = options

  const response = await fetch(
    `${import.meta.env.GUARDIAN_API}/search?q=${query}&show-fields=trailText,thumbnail&show-tags=all&section=${section}&order-by=newest&page=${page}&api-key=${import.meta.env.GUARDIAN_API_KEY}`,
  )

  const guardianData: Awaited<GuardianAPIData> = await response.json()

  const { data, success, error } = GuardianAPIDataSchema.safeParse(guardianData)
  assert(success, error)

  return data
}

async function getGuardianDataById(id: string): Promise<GuardianAPIDataByID> {
  const response = await fetch(
    `${import.meta.env.GUARDIAN_API}/${id}?api-key=${import.meta.env.GUARDIAN_API_KEY}&show-fields=all&show-elements=all&show-tags=all`,
  )

  const guardianDataById: Awaited<GuardianAPIDataByID> = await response.json()

  const { data, success, error } =
    GuardianAPIDataByIDSchema.safeParse(guardianDataById)
  assert(success, error)

  return data
}
