<script lang="ts">
  // import { getContext$, useEvent } from '../src/main'
  import { onMount } from 'svelte'

  onMount(() => {
    console.log("mount")
  })
</script>

<form action="">
  <input type="text" />
  <input type="mail" />
  <button type="submit"></button>
</form>
