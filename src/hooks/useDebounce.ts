import { useMemo } from "react";

export const debounce = (fn: Function, duration: number = 500) => {
  let timeoutId: number | null = null;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, duration);
  };
};

export default (
  fn: Function,
  duration: number = 500,
  dependencies: any[] = []
) => {
  const memoizedDebounce = useMemo(() => {
    return debounce(fn, duration);
  }, dependencies);
  return memoizedDebounce;
};
