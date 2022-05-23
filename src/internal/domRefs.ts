import { q } from '../util/selector'
import type { DOMNode } from './types'

export function domRefs(ref: Set<string>, scope: DOMNode) {
  const findRef = (query: string) => {
    const nodes = q(`[data-ref="${query}"]`, scope)
    return refOrRefs(nodes, query)
  }

  const refOrRefs = (nodes: DOMNode[], query: string) => {
    switch (nodes.length) {
      case 0:
        throw new Error(`[data-ref="${query}"] does not exist`)
      case 1:
        return nodes[0]
      default:
        return nodes
    }
  }

  const childRef = [...ref].reduce<any>((acc, cur) => {
    acc[cur] = findRef(cur)
    return acc
  }, {})

  return childRef
}
