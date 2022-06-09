import type { DOMNode } from '../internal/types';

export const q = <T extends DOMNode>(query: string, scope?: DOMNode): T[] =>
  Array.from((scope ?? document).querySelectorAll(query));
