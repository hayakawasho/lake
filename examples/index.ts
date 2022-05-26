import { mount, register, q } from '../src/main'
import Index from './IndexPage'

const initApp = () => {
  register('Index', Index)

  q('[data-component]').forEach(el => {
    const componentName = el.dataset.component as string
    mount(el, {}, componentName)
  })
}

document.addEventListener('DOMContentLoaded', initApp)
