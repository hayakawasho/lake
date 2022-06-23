import { LifecycleHooks } from '../lifecycle';
import type { LifecycleHandler } from '../lifecycle';
import type { RefElement, IComponent } from '../types';
import { q } from '../util/selector';

export let Owner: ComponentContext | null = null;

const setOwner = (context: ComponentContext) => (Owner = context);
const unsetOwner = () => (Owner = null);

let uid = 0;

class ComponentContext {
  [LifecycleHooks.MOUNTED]: LifecycleHandler[] = [];
  [LifecycleHooks.UNMOUNTED]: LifecycleHandler[] = [];

  readonly uid: string | number;

  parent: ComponentContext | null = null;

  constructor(public element: RefElement) {
    this.uid = element.id || uid++;
  }

  mount() {
    this.onMounted.forEach(fn => fn());
  }

  unmount() {
    this.onUnmounted.forEach(fn => fn());
  }

  addChild(child: ComponentContext) {
    this.onMounted.push(...child.onMounted);
    this.onUnmounted.push(...child.onUnmounted);

    child.parent = this;
  }
}

export function createComponent(wrap: IComponent) {
  return (root: RefElement, props: Record<string, any>) => {
    const context = new ComponentContext(root);

    setOwner(context);

    const created = wrap.setup(root, {
      ...wrap.props,
      ...props,
    });

    const provides = created || {};

    if (wrap.components) {
      Object.entries(wrap.components).forEach(([selector, sub]) => {
        q(selector, root).forEach(el => {
          const child = createSubComponent(el, sub, provides);
          context.addChild(child);
        });
      });
    }

    unsetOwner();

    return context;
  };
}

function createSubComponent(
  el: RefElement,
  child: IComponent,
  provides: Readonly<Record<string, unknown>>
) {
  const props = {
    ...child.props,
    ...provides,
  };
  return createComponent(child)(el, props);
}

export type { ComponentContext };
