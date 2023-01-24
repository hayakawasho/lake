import { assert } from '../../util/assert';
import { allRun } from '../../util/function';
import { LifecycleHooks } from '../lifecycle';
import type { LifecycleHandler } from '../lifecycle';
import type { RefElement, IComponent } from '../types';

let currentComponent: ComponentContext | null = null;

const setCurrentComponent = (context: ComponentContext | null) =>
  (currentComponent = context);

export const getCurrentComponent = (hookName: string) => {
  assert(
    currentComponent,
    `"${hookName}" called outside setup() will never be run.`
  );

  return currentComponent;
};

let uid = 0;

class ComponentContext {
  [LifecycleHooks.MOUNTED]: LifecycleHandler[] = [];
  [LifecycleHooks.UNMOUNTED]: LifecycleHandler[] = [];

  readonly uid: string | number;

  parent: ComponentContext | null = null;
  children: ComponentContext[] = [];

  constructor(public element: RefElement) {
    this.uid = element.id || uid++;
  }

  mount = () => {
    allRun([
      ...this[LifecycleHooks.MOUNTED],
      ...this.children.flatMap(child => child.mount),
    ]);
  };

  unmount = () => {
    allRun([
      ...this[LifecycleHooks.UNMOUNTED],
      ...this.children.flatMap(child => child.unmount),
    ]);
  };

  addChild = (child: ComponentContext) => {
    this.children.push(child);
    child.parent = this;
  };

  removeChild = (child: ComponentContext) => {
    const index = this.children.findIndex(context => context === child);

    if (index === -1) {
      return;
    }

    this.children.splice(index, 1);
    child.parent = null;
  };
}

export function createComponent(wrap: IComponent) {
  const parentContext = currentComponent;

  return (root: RefElement, props: Record<string, any>) => {
    const context = setCurrentComponent(new ComponentContext(root))!;

    wrap.setup(root, {
      ...wrap.props,
      ...props,
    });

    setCurrentComponent(parentContext);

    return context;
  };
}

export type { ComponentContext };
