<script lang="ts">
  import { useEvent, useDOMRef } from '../lib/main'
  import { getContext } from 'svelte'
  import type { Context$ } from '../lib/main'

  type Refs = {
    increment: HTMLButtonElement
    decrement: HTMLButtonElement
    count: HTMLDivElement
  }

  const { test: __ } = getContext<Context$<{ test: string }>>('$')

  const { refs } = useDOMRef<Refs>('increment', 'decrement', 'count')

  let count = 0

  $: refs.count.textContent = count + ''

  useEvent(refs.increment, 'click', e => {
    e.preventDefault()
    count++
  })

  useEvent(refs.decrement, 'click', e => {
    e.preventDefault()
    count--
  })
</script>
