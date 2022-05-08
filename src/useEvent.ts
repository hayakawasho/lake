import { onDestroy } from 'svelte'
import type { DOMNode } from './internal/types'

type Options = boolean | AddEventListenerOptions

export function useEvent<
  U extends keyof HTMLElementEventMap = keyof HTMLElementEventMap
>(
  targetOrTargets: DOMNode | DOMNode[],
  eventType: U,
  handler: EventListenerOrEventListenerObject,
  options?: Options
) {
  const isArray = Array.isArray(targetOrTargets)

  isArray
    ? targetOrTargets.forEach(el =>
        el.addEventListener(eventType, handler, options)
      )
    : targetOrTargets.addEventListener(eventType, handler, options)

  onDestroy(() => {
    isArray
      ? targetOrTargets.forEach(el =>
          el.removeEventListener(eventType, handler, options)
        )
      : targetOrTargets.removeEventListener(eventType, handler, options)
  })
}
