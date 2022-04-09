import { onDestroy } from 'svelte'

export function refKeySet(...key: string[]) {
  const keyValue = new Set<string>(key)

  onDestroy(() => {
    keyValue.clear()
  })

  return keyValue
}
