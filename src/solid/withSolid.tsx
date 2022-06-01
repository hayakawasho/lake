import type { JSX } from 'solid-js'
import { render } from 'solid-js/web'
import { defineComponent } from '../core'

export function withSolid(App: () => JSX.Element) {
  return defineComponent({
    setup(el, props) {
      const dispose = render(() => <App {...props} />, el)

      return () => {
        dispose()
      }
    },
  })
}
