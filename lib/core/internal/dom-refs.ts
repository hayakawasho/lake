import { $$ } from '../../util/selector';
import type { RefElement } from '../types';

export function domRefs(ref: Set<string>, scope: RefElement) {
  const findRef = (q: string) => {
    const nodes = $$(`[data-ref="${q}"]`, scope);
    return reducer(nodes);
  };

  const reducer = (nodes: RefElement[]) => {
    return (
      {
        0: null,
        1: nodes[0],
      }[nodes.length] ?? nodes
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childRef = [...ref].reduce<any>((acc, cur) => {
    acc[cur] = findRef(cur);
    return acc;
  }, {});

  return childRef;
}
