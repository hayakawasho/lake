import { onCleanup, onMount } from 'solid-js'

export default function () {
  onMount(() => {
    console.log('onMount')
  })

  onCleanup(() => {
    console.log('onCleanup')
  })

  return (
    <form>
      <button type="submit">POST</button>
    </form>
  )
}
