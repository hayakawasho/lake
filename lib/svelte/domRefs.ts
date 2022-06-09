import type { RefElement } from '../app/types';
import { q } from '../main';

export function domRefs(ref: Set<string>, scope: RefElement) {
  const findRef = (query: string) => {
    const nodes = q(`[data-ref="${query}"]`, scope);
    return reducer(nodes, query);
  };

  const reducer = (nodes: RefElement[], query: string) => {
    switch (nodes.length) {
      case 0:
        throw new Error(`[data-ref="${query}"] does not exist`);
      case 1:
        return nodes[0];
      default:
        return nodes;
    }
  };

  const childRef = [...ref].reduce<any>((acc, cur) => {
    acc[cur] = findRef(cur);
    return acc;
  }, {});

  return childRef;
}
