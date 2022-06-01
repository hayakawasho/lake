<script lang="ts">
  import { getContext$, useEvent } from '../src/main'

  type Refs = {
    increment: HTMLButtonElement
    decrement: HTMLButtonElement
    count: HTMLDivElement
  }

  const { useDOMRef } = getContext$()
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
