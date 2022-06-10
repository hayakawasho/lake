<script lang="ts">
  import { useEvent, useDOMRef } from '../lib/main'

  type Refs = {
    increment: HTMLButtonElement
    decrement: HTMLButtonElement
    count: HTMLDivElement
  }

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
