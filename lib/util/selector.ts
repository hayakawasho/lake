import type { RefElement } from '../core/types';

export const q = <T extends RefElement>(
  query: string,
  scope?: RefElement
): T[] => Array.from((scope ?? document).querySelectorAll(query));
