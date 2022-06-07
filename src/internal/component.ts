import { setOwner, unsetOwner } from '../core/lifecycle';
import { q } from '../util/selector';
import type { DOMNode, IComponent } from './types';

type LifecycleHandler = () => void;

class ComponentContext {
  onMounted: LifecycleHandler[] = [];
  onUnmounted: LifecycleHandler[] = [];

  parent: ComponentContext | null = null;
  readonly uid: string;
  readonly provides: Record<string, any>;

  constructor(create: IComponent['setup'], public element: DOMNode, props: Record<string, any>) {
    setOwner(this);
    this.provides = create(element, props) || {};
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
    this.onMounted.push(...child.onMounted);
    this.onUnmounted.push(...child.onUnmounted);

    child.parent = this;
  }
}

export function createComponent(wrap: IComponent) {
  return (root: DOMNode, props: Record<string, any>) => {
    const newProps = { ...wrap.props, ...props };
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
  const props = { ...child.props, ...parent.provides };
  return createComponent(child)(el, props);
}

export type { ComponentContext };
