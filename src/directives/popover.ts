import type { Directive, DirectiveBinding } from 'vue';
import type PopoverType from 'bootstrap/js/dist/popover';
import type { PopoverOptions } from 'bootstrap/js/dist/popover';

export type PopoverBindingValue =
  | string
  | PopoverOptions
  | false
  | null
  | undefined;

type PopoverInstance = InstanceType<typeof PopoverType>;

let popoverCtorPromise: Promise<typeof PopoverType> | null = null;
const loadPopover = () => {
  if (!popoverCtorPromise) {
    popoverCtorPromise = import('bootstrap/js/dist/popover').then((m) => m.default);
  }
  return popoverCtorPromise;
};

const popoverInstances = new WeakMap<HTMLElement, PopoverInstance>();

const resolveOptions = (
  el: HTMLElement,
  binding: DirectiveBinding<PopoverBindingValue>,
): PopoverOptions | null => {
  const value = binding.value;

  if (value === false || value == null) {
    return null;
  }

  if (typeof value === 'string') {
    return { content: value };
  }

  if (typeof value === 'object') {
    return value;
  }

  const attrContent = el.getAttribute('data-bs-content');
  return attrContent ? { content: attrContent } : null;
};

const disposePopover = (el: HTMLElement): void => {
  const existing = popoverInstances.get(el);
  if (existing) {
    existing.dispose();
    popoverInstances.delete(el);
  }
};

const applyPopover = async (
  el: HTMLElement,
  binding: DirectiveBinding<PopoverBindingValue>,
): Promise<void> => {
  if (typeof window === 'undefined') {
    return;
  }

  const options = resolveOptions(el, binding);
  if (!options) {
    disposePopover(el);
    return;
  }

  disposePopover(el);
  const Popover = await loadPopover();
  const instance = new Popover(el, options);
  popoverInstances.set(el, instance);
};

export const vPopover: Directive<HTMLElement, PopoverBindingValue> = {
  async mounted(el, binding) {
    await applyPopover(el, binding);
  },
  async updated(el, binding) {
    await applyPopover(el, binding);
  },
  unmounted(el) {
    disposePopover(el);
  },
};
