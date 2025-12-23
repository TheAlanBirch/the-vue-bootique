import type { Directive, DirectiveBinding } from 'vue';
import ScrollSpy from 'bootstrap/js/dist/scrollspy';
import type { ScrollSpyOptions } from 'bootstrap/js/dist/scrollspy';

export type ScrollSpyBindingValue = ScrollSpyOptions | false | null | undefined;

type ScrollSpyInstance = InstanceType<typeof ScrollSpy>;

const scrollSpyInstances = new WeakMap<HTMLElement, ScrollSpyInstance>();

const resolveOptions = (
  binding: DirectiveBinding<ScrollSpyBindingValue>,
): ScrollSpyOptions | null => {
  const value = binding.value;

  if (value === false || value == null) {
    return null;
  }

  if (typeof value === 'object') {
    return value;
  }

  return {};
};

const disposeScrollSpy = (el: HTMLElement): void => {
  const existing = scrollSpyInstances.get(el);
  if (existing) {
    existing.dispose();
    scrollSpyInstances.delete(el);
  }
};

const applyScrollSpy = (
  el: HTMLElement,
  binding: DirectiveBinding<ScrollSpyBindingValue>,
): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const options = resolveOptions(binding);
  if (!options) {
    disposeScrollSpy(el);
    return;
  }

  disposeScrollSpy(el);
  const instance = new ScrollSpy(el, options);
  scrollSpyInstances.set(el, instance);
};

export const vScrollspy: Directive<HTMLElement, ScrollSpyBindingValue> = {
  mounted(el, binding) {
    applyScrollSpy(el, binding);
  },
  updated(el, binding) {
    applyScrollSpy(el, binding);
  },
  unmounted(el) {
    disposeScrollSpy(el);
  },
};
