import type { Directive, DirectiveBinding } from 'vue';
import type ScrollSpyType from 'bootstrap/js/dist/scrollspy';
import type { ScrollSpyOptions } from 'bootstrap/js/dist/scrollspy';

export type ScrollSpyBindingValue = ScrollSpyOptions | false | null | undefined;

type ScrollSpyInstance = InstanceType<typeof ScrollSpyType>;

let scrollSpyCtorPromise: Promise<typeof ScrollSpyType> | null = null;
const loadScrollSpy = () => {
  if (!scrollSpyCtorPromise) {
    scrollSpyCtorPromise = import('bootstrap/js/dist/scrollspy').then((m) => m.default);
  }
  return scrollSpyCtorPromise;
};

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

const applyScrollSpy = async (
  el: HTMLElement,
  binding: DirectiveBinding<ScrollSpyBindingValue>,
): Promise<void> => {
  if (typeof window === 'undefined') {
    return;
  }

  const options = resolveOptions(binding);
  if (!options) {
    disposeScrollSpy(el);
    return;
  }

  disposeScrollSpy(el);
  const ScrollSpy = await loadScrollSpy();
  const instance = new ScrollSpy(el, options);
  scrollSpyInstances.set(el, instance);
};

export const vScrollspy: Directive<HTMLElement, ScrollSpyBindingValue> = {
  async mounted(el, binding) {
    await applyScrollSpy(el, binding);
  },
  async updated(el, binding) {
    await applyScrollSpy(el, binding);
  },
  unmounted(el) {
    disposeScrollSpy(el);
  },
};
