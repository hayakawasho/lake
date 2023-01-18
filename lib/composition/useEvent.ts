import { onUnmounted } from '../core/lifecycle';

type ElementEventListener<
  K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap
> = (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown;

export const useEvent = <
  T extends HTMLElement = HTMLElement,
  K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap
>(
  target: T,
  eventType: K,
  listener: ElementEventListener<K>
) => {
  target.addEventListener(eventType, listener);

  onUnmounted(() => {
    target.removeEventListener(eventType, listener);
  });
};
