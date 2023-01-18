import { onUnmounted } from '../core/lifecycle';

type ElementEventListener<
  K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap
> = (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown;

type Options = {
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
};

export const useEvent = <
  T extends HTMLElement = HTMLElement,
  K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap
>(
  target: T,
  eventType: K,
  listener: ElementEventListener<K>,
  options?: Options
) => {
  target.addEventListener(eventType, listener, options);

  onUnmounted(() => {
    target.removeEventListener(eventType, listener);
  });
};
