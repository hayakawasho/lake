<script lang="ts">
  import { getContext$, useEvent } from '../src/main'

  type Refs = {
    increment: HTMLButtonElement
    decrement: HTMLButtonElement
  }

  const { useDOMRef } = getContext$()
  const { refs } = useDOMRef<Refs>('increment', 'decrement')

  let count = 0

  useEvent(refs.increment, 'click', evt => {
    evt.preventDefault()
    count++
  })

  useEvent(refs.decrement, 'click', evt => {
    evt.preventDefault()
    count--
  })
</script>

<div>{count}</div>
