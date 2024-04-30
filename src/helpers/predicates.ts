export { isArray, isNumber, isObject, isString }

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isString = (value: unknown): value is string => typeof value === 'string'

const isArray = (value: unknown): value is unknown[] => Array.isArray(value)

const isNumber = (value: unknown): value is number => typeof value === 'number'
