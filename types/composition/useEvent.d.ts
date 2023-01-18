declare type ElementEventListener<
  K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap
> = (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown;
declare type Options = {
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
};
export declare const useEvent: <
  T extends HTMLElement = HTMLElement,
  K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap
>(
  target: T,
  eventType: K,
  listener: ElementEventListener<K>,
  optionsOrUseCapture?: Options | boolean
) => void;
export {};
//# sourceMappingURL=useEvent.d.ts.map
