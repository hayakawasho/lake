import { assert } from './util/assert'
import { q } from './util/selector'
import type { DOMNode, FC } from './internal/types'
import { createComponent } from './internal/component'
import type { ComponentContext } from './internal/component'

type ComponentType = ReturnType<typeof createComponent>

const REGISTERED_COMPONENTS_MAP = new Map<string, ComponentType>()

const DOM_COMPONENT_INSTANCE_PROPERTY = new WeakMap<DOMNode, ComponentContext>()

function bindDOMToComponent(el: DOMNode, component: ComponentContext) {
  DOM_COMPONENT_INSTANCE_PROPERTY.set(el, component)
}

export function defineComponent({ setup, components }: FC) {
  return {
    setup,
    components,
  }
}

export function register(name: string, componentWrapper: FC) {
  assert(!REGISTERED_COMPONENTS_MAP.has(name), `${name} was already registered`)
  REGISTERED_COMPONENTS_MAP.set(name, createComponent(componentWrapper))

  return REGISTERED_COMPONENTS_MAP
}

export function unregister(name: string) {
  assert(REGISTERED_COMPONENTS_MAP.has(name), `${name} does not registered`)
  REGISTERED_COMPONENTS_MAP.delete(name)

  return REGISTERED_COMPONENTS_MAP
}

export function mount(el: DOMNode, props: Record<string, any>, name: string) {
  assert(REGISTERED_COMPONENTS_MAP.has(name), `${name} was never registered`)
  const component = REGISTERED_COMPONENTS_MAP.get(name) as ComponentType

  bindDOMToComponent(el, component(el, props))
}

export function unmount(selector: string, scope = document.body) {
  q(selector, scope)
    .filter(el => DOM_COMPONENT_INSTANCE_PROPERTY.has(el))
    .forEach(el => (DOM_COMPONENT_INSTANCE_PROPERTY.get(el) as ComponentContext).unmount())
}
