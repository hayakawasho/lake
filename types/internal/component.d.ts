import type { DOMNode, FC } from './types';
export declare const DOM_COMPONENT_INSTANCE_PROPERTY: WeakMap<DOMNode, any>;
export declare function createComponent(componentWrapper: FC): ({ el, ...props }: {
    el: DOMNode;
}) => void;
//# sourceMappingURL=component.d.ts.map