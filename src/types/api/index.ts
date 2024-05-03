/**
 * This file only contains raw data types. If you need frontend types check
 * `types/index.ts` file
 */
export type { GuardianAPIData, GuardianAPIDataByID }

import { GuardianAPIDataByIDSchema, GuardianAPIDataSchema } from '@/zod/schemas'
import z from 'zod'

type GuardianAPIData = z.infer<typeof GuardianAPIDataSchema>
type GuardianAPIDataByID = z.infer<typeof GuardianAPIDataByIDSchema>
