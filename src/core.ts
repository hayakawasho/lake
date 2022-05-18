import { assert } from './main'
import type { DOMNode, FC, Props } from './internal/types'
import {
  createComponent,
  DOM_COMPONENT_INSTANCE_PROPERTY,
} from './internal/component'
import type { ComponentContext } from './internal/component'

type ComponentType = ReturnType<typeof createComponent>

const REGISTERED_COMPONENTS_MAP = new Map<string, ComponentType>()

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

export function mount(node: DOMNode, props: Props<any>, name: string) {
  assert(REGISTERED_COMPONENTS_MAP.has(name), `${name} was never registered`)
  const component = REGISTERED_COMPONENTS_MAP.get(name) as ComponentType

  return component(node, props)
}

export function unmount(nodes: DOMNode[]) {
  return nodes
    .filter(v => DOM_COMPONENT_INSTANCE_PROPERTY.has(v))
    .forEach(el =>
      (DOM_COMPONENT_INSTANCE_PROPERTY.get(el) as ComponentContext).unmount()
    )
}

export function component(componentWrapper: FC) {
  return (el: DOMNode, props = {}) =>
    createComponent(componentWrapper)(el, props)
}
