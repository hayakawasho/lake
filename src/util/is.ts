const isFunction = (value: unknown): value is Function =>
  typeof value === 'function'

const isObject = (value: unknown): value is Record<any, any> =>
  value !== null && typeof value === 'object'

export { isFunction, isObject }
