export { assert }

import { render } from 'vike/abort'
import { isBrowser } from './isBrowser'

function assert(condition: unknown, msg?: unknown): asserts condition {
  if (condition) return

  const typeOfLog = isBrowser() ? 'console' : 'server'
  const defaultErrMsg = `Something went wrong. Check the ${typeOfLog} log for more information.`

  if (import.meta.env.DEV) {
    if (msg) {
      console.error(msg)
      throw render(500, defaultErrMsg)
    } else throw render(500, defaultErrMsg)
  }

  throw render(500)
}
