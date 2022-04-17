import type { DOMNode } from './types';
declare type Options = boolean | AddEventListenerOptions;
export declare function useEvent<U extends keyof HTMLElementEventMap = keyof HTMLElementEventMap>(target: DOMNode, eventType: U, handler: EventListenerOrEventListenerObject, options?: Options): void;
export {};
//# sourceMappingURL=useEvent.d.ts.map