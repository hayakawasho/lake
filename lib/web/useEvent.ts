import { onMounted, onUnmounted } from '../main';

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
  onMounted(() => {
    target.addEventListener(eventType, listener);
  });

  onUnmounted(() => {
    target.removeEventListener(eventType, listener);
  });
};
