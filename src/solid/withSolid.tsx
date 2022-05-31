import type { Component } from 'solid-js'
import { render } from 'solid-js/web'
import { defineComponent } from '../core'

export function withSolid(App: Component<any>) {
  return defineComponent({
    setup(el, props) {
      const unsubscribe = render(() => <App {...props} />, el)

      return () => {
        unsubscribe()
      }
    },
  })
}
