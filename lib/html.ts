const rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/

export function parseValue(value: any) {
  switch (value) {
    case 'true':
      return true
    case 'false':
      return false
    case 'null':
      return null
    case  +value + '': // Only convert to a number if it doesn't change the string
      return +value
    default:
      break;
  }

  if (rbrace.test(value)) {
    return JSON.parse(value)
  }

  return value
}

export function getNodeDataType(node: HTMLElement) {
  const data: { [key: string]: any } = {}
  const attrs = node.dataset

  for (const i in attrs) {
    data[i] = parseValue(attrs[i])
  }

  return data
}
