export const noop = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function

export const allRun = (fns: (() => void)[]) => fns.forEach(fn => fn());
