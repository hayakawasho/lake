<script lang="ts">
  import { getContext$, refKeySet, useEvent } from '../dist/main.es.js'

  type Refs = {
    inc: HTMLButtonElement
    dec: HTMLButtonElement
    reset: HTMLButtonElement
    stop: HTMLButtonElement
  }

  const { useDOMRef, rootRef } = getContext$()
  const { refs } = useDOMRef<Refs>(refKeySet('inc', 'dec', 'reset', 'stop'))

  let count: number = 0
  let isDisable: boolean | undefined

  $: console.log(count)
  $: isDisable && rootRef.classList.add('is-disable')

  useEvent(refs.inc, 'click', () => {
    count++
  })

  useEvent(refs.dec, 'click', () => {
    count--
  })

  useEvent(refs.reset, 'click', () => {
    count = 0
  })

  useEvent(refs.stop, 'click', () => {
    isDisable = true
  })
</script>
