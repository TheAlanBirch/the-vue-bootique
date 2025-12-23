import type { Directive, DirectiveBinding } from 'vue';
import Popover from 'bootstrap/js/dist/popover';
import type { PopoverOptions } from 'bootstrap/js/dist/popover';

export type PopoverBindingValue =
  | string
  | PopoverOptions
  | false
  | null
  | undefined;

type PopoverInstance = InstanceType<typeof Popover>;

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

  const attrContent = el.getAttribute('title');
  return attrContent ? { content: attrContent } : null;
};

const disposePopover = (el: HTMLElement): void => {
  const existing = popoverInstances.get(el);
  if (existing) {
    existing.dispose();
    popoverInstances.delete(el);
  }
};

const applyPopover = (
  el: HTMLElement,
  binding: DirectiveBinding<PopoverBindingValue>,
): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const options = resolveOptions(el, binding);
  if (!options) {
    disposePopover(el);
    return;
  }

  disposePopover(el);
  const instance = new Popover(el, options);
  popoverInstances.set(el, instance);
};

export const vPopover: Directive<HTMLElement, PopoverBindingValue> = {
  mounted(el, binding) {
    applyPopover(el, binding);
  },
  updated(el, binding) {
    applyPopover(el, binding);
  },
  unmounted(el) {
    disposePopover(el);
  },
};
