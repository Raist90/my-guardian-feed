import { ONE_HOUR } from '@/constants'
import { expect, test } from 'vitest'
import { assert } from './assert'
import { capitalize } from './capitalize'
import { fetchWithCache } from './fetchWithCache'
import { isBrowser } from './isBrowser'
import { isDevelopment } from './isDevelopment'
import { isArray, isNumber, isObject, isString } from './predicates'
import { removeHTMLTags } from './removeHTMLTags'

test('assert', () => {
  function useAssert(condition: unknown): void {
    assert(condition)
  }
  const str = 'hello'
  const condition = str.length === 5
  const wrongCondition = str.length === 4
  expect(assert(condition)).toBeUndefined() // assert() returns undefined if condition is true
  expect(() => useAssert(wrongCondition)).toThrowError('AbortRender')
})

test('isBrowser', () => {
  expect(isBrowser).toBe(false)
})

test('capitalize', () => {
  const str = 'hello'
  const emptyStr = ''
  expect(capitalize(str)).toBe('Hello')
  expect(capitalize(emptyStr)).toBe('')
})

/** @todo Not sure how to test this. Check it later */
test('fetchWithCache', async () => {
  const endpoint = 'https://jsonplaceholder.typicode.com/todos/1'
  const ttl = ONE_HOUR

  const res = await fetchWithCache(endpoint, ttl)
  expect(res).toBeTruthy()
})

test('isDevelopment', () => {
  if (import.meta.env.DEV) {
    expect(isDevelopment).toBe(true)
  } else {
    expect(isDevelopment).toBe(false)
  }
})

test('predicates', () => {
  const str = 'hello'
  const arr = ['hello']
  const obj = {}
  const num = 0

  expect(isString(str)).toBe(true)
  expect(isArray(arr)).toBe(true)
  expect(isObject(obj)).toBe(true)
  expect(isNumber(num)).toBe(true)

  expect(isString(arr)).toBe(false)
  expect(isArray(num)).toBe(false)
  expect(isObject(str)).toBe(false)
  expect(isNumber(obj)).toBe(false)
})

test('removeHTMLTags', () => {
  const html = '<p>Hello</p>'
  const nullStr = null
  const emptyStr = ''
  expect(removeHTMLTags(html)).toBe('Hello')
  expect(removeHTMLTags(nullStr)).toBe(false)
  expect(removeHTMLTags(emptyStr)).toBe(false)
})
