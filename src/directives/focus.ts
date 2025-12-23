import type { Directive } from 'vue';

export interface FocusDirectiveOptions {
  delay?: number;
  preventScroll?: boolean;
  enabled?: boolean;
}

export type FocusBindingValue = boolean | number | FocusDirectiveOptions | undefined;

const focusTimers = new WeakMap<HTMLElement, number>();

const clearFocusTimer = (el: HTMLElement): void => {
  const timer = focusTimers.get(el);
  if (timer) {
    clearTimeout(timer);
    focusTimers.delete(el);
  }
};

const normalizeOptions = (
  value: FocusBindingValue,
): { delay: number; preventScroll?: boolean; enabled: boolean } => {
  if (value === false) {
    return { delay: 0, preventScroll: false, enabled: false };
  }

  if (typeof value === 'number') {
    return { delay: value, preventScroll: false, enabled: true };
  }

  if (typeof value === 'object' && value !== null) {
    return {
      delay: value.delay ?? 0,
      preventScroll: value.preventScroll,
      enabled: value.enabled ?? true,
    };
  }

  return { delay: 0, preventScroll: false, enabled: true };
};

const focusElement = (el: HTMLElement, value: FocusBindingValue): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const { delay, preventScroll, enabled } = normalizeOptions(value);
  clearFocusTimer(el);

  if (!enabled) {
    return;
  }

  const runFocus = () => {
    if (typeof el.focus === 'function') {
      el.focus({ preventScroll });
    }
  };

  if (delay > 0) {
    const timer = window.setTimeout(runFocus, delay);
    focusTimers.set(el, timer);
  } else {
    runFocus();
  }
};

export const vFocus: Directive<HTMLElement, FocusBindingValue> = {
  mounted(el, binding) {
    focusElement(el, binding.value);
  },
  updated(el, binding) {
    focusElement(el, binding.value);
  },
  unmounted(el) {
    clearFocusTimer(el);
  },
};
