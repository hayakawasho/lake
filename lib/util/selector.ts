import type { RefElement } from "../core/types";

export const qsa = <T extends RefElement>(q: string, scope?: RefElement): T[] =>
  Array.from((scope ?? document).querySelectorAll(q));
