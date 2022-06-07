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

  constructor(
    create: IComponent['setup'],
    public element: DOMNode,
    context: {
      props: Record<string, any>;
    }
  ) {
    setOwner(this);
    const created = create(element, context.props);
    unsetOwner();

    this.provides = created || {};
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

    const context = new ComponentContext(wrap.setup, root, {
      props: newProps,
    });

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
