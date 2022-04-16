import type { IComponent } from './types';
declare function defineComponent({ setup, cleanup }: IComponent): {
    setup: (element: HTMLElement, props?: object | undefined) => void;
    cleanup: () => void;
};
declare function mountComponent<T extends HTMLElement>(el: T, props: object, componentName: string): IComponent | undefined;
declare function unmount(targets: HTMLElement[]): (HTMLElement | undefined)[];
declare function register(name: string, Component: IComponent): void;
export { defineComponent, mountComponent, unmount, register };
//# sourceMappingURL=core.d.ts.map