import type { DOMNode } from '../internal/types';
declare type Options = boolean | AddEventListenerOptions;
export declare function useEvent<U extends keyof HTMLElementEventMap = keyof HTMLElementEventMap>(targetOrTargets: DOMNode | DOMNode[], eventType: U, handler: EventListenerOrEventListenerObject, options?: Options): void;
export {};
//# sourceMappingURL=useEvent.d.ts.map