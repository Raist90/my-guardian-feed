export { fetchWithCache }

import { assert } from './assert'
import { isDevelopment } from './isDevelopment'

const cache = new Map<string, any & { timer: number }>()

async function fetchWithCache<R extends unknown>(
  url: string,
  ttl: number,
): Promise<R> {
  const currentTime = Date.now()

  if (cache.has(url)) {
    const timer = cache.get(url)?.timer
    const errMsg = `${url} has no timer`
    assert(timer, errMsg)

    if (timer > currentTime) {
      if (isDevelopment) console.log('Returning cached Data')
      return cache.get(url)
    } else {
      if (isDevelopment) console.log('Timer expired, deleting cached Data')
      cache.delete(url)
    }
  }

  const response = await fetch(url)
  const data = await response.json()
  if (isDevelopment) console.log('Returning fresh Data')

  cache.set(url, { ...data, timer: currentTime + ttl })

  return data
}
