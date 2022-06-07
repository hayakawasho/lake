// import { noop } from '../util/function';
import type { DOMNode, IComponent } from '../internal/types';
import { q } from '../util/selector';

type LifecycleHandler = () => void;

let Owner: ComponentContext | null = null;

const setOwner = (context: ComponentContext) => (Owner = context);

const unsetOwner = () => (Owner = null);

export const onMounted = (fn: () => void) => Owner?.onMounted.push(fn);

export const onUnmounted = (fn: () => void) => Owner?.onUnmounted.push(fn);

class ComponentContext {
  onMounted: LifecycleHandler[] = [];
  onUnmounted: LifecycleHandler[] = [];

  parent: ComponentContext | null = null;
  readonly uid: string;
  readonly provides: Record<string, any>;

  constructor(create: any, public element: DOMNode, props: Record<string, any>) {
    setOwner(this);

    const created = create(element, props);
    this.provides = created || {};

    unsetOwner();

    this.uid = element.id;
  }

  mount = () => {
    this.onMounted.forEach(fn => fn());
  };

  unmount = () => {
    this.onUnmounted.forEach(fn => fn());
  };

  addChild(child: ComponentContext) {
    this.onMounted.push(child.mount);
    this.onUnmounted.push(child.unmount);

    child.parent = this;
  }
}

export function createComponent(wrap: IComponent) {
  return (root: DOMNode, props: Record<string, any>) => {
    const newProps = {
      ...wrap.props,
      ...props,
    };

    const context = new ComponentContext(wrap.setup, root, newProps);

    if (wrap.components) {
      Object.entries(wrap.components).forEach(([selector, subComponent]) => {
        q(selector, root).forEach(i => {
          const child = createSubComponent(i, subComponent, context);
          context.addChild(child);
        });
      });
    }

    return context;
  };
}

function createSubComponent(el: DOMNode, child: IComponent, parent: ComponentContext) {
  const props = {
    ...child.props,
    ...parent.provides,
    parent,
  };
  return createComponent(child)(el, props);
}

export type { ComponentContext };
