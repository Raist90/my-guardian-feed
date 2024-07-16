/* eslint-disable no-console */
export { assert }

import { render } from 'vike/abort'
import { isBrowser } from './isBrowser'
import { isDevelopment } from './isDevelopment'

function assert(condition: unknown, msg?: unknown): asserts condition {
  if (condition) return

  const typeOfLog = isBrowser() ? 'console' : 'server'
  const defaultErrMsg = `Something went wrong. Check the ${typeOfLog} log for more information.`

  if (isDevelopment) {
    if (msg) {
      console.error(msg)
    }
    throw render(500, defaultErrMsg)
  }

  throw render(500)
}
