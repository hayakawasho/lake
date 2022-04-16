import { q } from './selector'
import type { RefValue } from './types'

export function domRefs(ref: RefValue, scope: HTMLElement) {
  const parent = scope

  const reducer = (nodes: HTMLElement[], query: string) => {
    switch (nodes.length) {
      case 1:
        return nodes[0]
      case 0:
        throw new Error(`data-ref=${query} does not exist`)
      default:
        return nodes
    }
  }

  const $$ = (query: string) => {
    const nodes = q(`[data-ref="${query}"]`, parent)
    return reducer(nodes, query)
  }

  const childRef = [...ref].reduce<any>((acc, cur) => {
    acc[cur] = $$(cur)
    return acc
  }, {})

  return childRef
}
