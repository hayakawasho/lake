import { defineComponent, onSetup, withSvelte } from '../dist/main.es.js'
import Counter from './Counter.svelte'

document.addEventListener('DOMContentLoaded', () => {
  defineComponent('Counter', withSvelte(Counter))

  onSetup()
})
