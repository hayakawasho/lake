import type { RefElement } from '../core/types';

export const $$ = <T extends RefElement>(q: string, scope?: RefElement): T[] =>
  Array.from((scope ?? document).querySelectorAll(q));
