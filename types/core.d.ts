import type { IComponent, DOMNode } from './types';
declare function defineComponent(options: IComponent): IComponent;
declare function registerComponent(name: string, component: IComponent): void;
declare function mountComponent(node: DOMNode, props: object, componentName: string): void;
declare function unmount(nodes: DOMNode[]): void;
export { defineComponent, registerComponent, mountComponent, unmount };
//# sourceMappingURL=core.d.ts.map