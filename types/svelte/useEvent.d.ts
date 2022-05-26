declare type ElementEventListener<K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap> =
  (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown
declare const useEvent: <
  T extends HTMLElement = HTMLElement,
  K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap
>(
  target: T,
  eventType: K,
  listener: ElementEventListener<K>
) => void
export { useEvent }
//# sourceMappingURL=useEvent.d.ts.map
