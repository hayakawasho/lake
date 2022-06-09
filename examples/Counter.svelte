<script lang="ts">
  import { useEvent } from '../lib/main'
  import type { Context$ } from '../lib/main'
  import { getContext } from 'svelte'

  type Refs = {
    increment: HTMLButtonElement
    decrement: HTMLButtonElement
    count: HTMLDivElement
  }

  const { useDOMRef } = getContext<Context$>('$')
  const { refs } = useDOMRef<Refs>('increment', 'decrement', 'count')

  let count = 0

  $: refs.count.textContent = count + ''

  useEvent(refs.increment, 'click', evt => {
    evt.preventDefault()
    count++
  })

  useEvent(refs.decrement, 'click', evt => {
    evt.preventDefault()
    count--
  })
</script>
