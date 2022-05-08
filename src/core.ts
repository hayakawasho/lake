import { assert } from './main'
import type { DOMNode, FC } from './internal/types'
import {
  createComponent,
  DOM_COMPONENT_INSTANCE_PROPERTY,
} from './internal/component'

const REGISTERED_COMPONENTS_MAP = new Map<string, any>()

export function defineComponent(options: FC) {
  return options
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

export function mount(node: DOMNode, props = {}, componentName: string) {
  const mountComponent = REGISTERED_COMPONENTS_MAP.get(componentName)
  return mountComponent && mountComponent({ el: node, ...props })
}

export function unmount(nodes: DOMNode[]) {
  return nodes
    .filter(node => DOM_COMPONENT_INSTANCE_PROPERTY.has(node))
    .map(node => {
      DOM_COMPONENT_INSTANCE_PROPERTY.get(node).unmount()
      return node
    })
}
