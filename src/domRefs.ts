import { q } from './selector'
import type { RefValue, DOMNode } from './types'

export function domRefs(ref: RefValue, scope: DOMNode) {
  const reducer = (nodes: DOMNode[], query: string) => {
    switch (nodes.length) {
      case 0:
        throw new Error(`data-ref="${query}" does not exist`)
      case 1:
        return nodes[0]
      default:
        return nodes
    }
  }

  const $$ = (query: string) => {
    const nodes = q(`[data-ref="${query}"]`, scope)
    return reducer(nodes, query)
  }

  const childRef = [...ref].reduce<any>((acc, cur) => {
    acc[cur] = $$(cur)
    return acc
  }, {})

  return childRef
}
