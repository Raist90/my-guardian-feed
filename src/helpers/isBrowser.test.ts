import { expect, test } from 'vitest'
import { isBrowser } from './isBrowser'

test('isBrowser', () => {
  expect(isBrowser).toBe(false)
})
