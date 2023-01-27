import { useUnmount } from '../core/lifecycle';

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
  optionsOrUseCapture?: Options | boolean
) => {
  target.addEventListener(eventType, listener, optionsOrUseCapture);

  useUnmount(() => {
    target.removeEventListener(eventType, listener, optionsOrUseCapture);
  });
};
