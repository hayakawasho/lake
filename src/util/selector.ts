import type { DOMNode } from '../internal/types'

export function q<T extends DOMNode>(query: string, scope?: DOMNode): T[] {
  return Array.from((scope ?? document).querySelectorAll(query))
}
