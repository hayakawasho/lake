declare type Options = boolean | AddEventListenerOptions;
export declare function useEvent<T extends HTMLElement = HTMLElement, U extends keyof HTMLElementEventMap = keyof HTMLElementEventMap>(target: T, eventType: U, handler: EventListenerOrEventListenerObject, options?: Options): void;
export {};
//# sourceMappingURL=useEvent.d.ts.map