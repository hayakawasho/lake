import type { DOMNode } from './types'

export const q = <T extends DOMNode>(query: string, scope?: DOMNode): T[] => {
  return Array.from((scope ?? document).querySelectorAll(query))
}
