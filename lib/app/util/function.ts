export const noop = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function

export const warn = (message: string) => console.warn(message);

export const allRun = (fns: (() => void)[]) => fns.forEach(fn => fn());
