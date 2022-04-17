import { onDestroy } from 'svelte'
import type { DOMNode } from './types'

type Options = boolean | AddEventListenerOptions

export function useEvent<
  U extends keyof HTMLElementEventMap = keyof HTMLElementEventMap
>(
  target: DOMNode,
  eventType: U,
  handler: EventListenerOrEventListenerObject,
  options?: Options
) {
  target.addEventListener(eventType, handler, options)

  onDestroy(() => {
    target.removeEventListener(eventType, handler, options)
  })
}
