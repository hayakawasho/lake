import { qsa } from "../../util/selector";
import type { RefElement } from "../types";

export function domRefs(ref: Set<string>, scope: RefElement) {
  const findRef = (q: string) => {
    const nodes = qsa(`[data-ref="${q}"]`, scope);
    const { length } = nodes;

    return length === 0
      ? null
      : ({
          1: nodes[0],
        }[length] ?? nodes);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childRef = [...ref].reduce<any>((acc, cur) => {
    acc[cur] = findRef(cur);
    return acc;
  }, {});

  return childRef;
}
