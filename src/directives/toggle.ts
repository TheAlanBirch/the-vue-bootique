import type { Directive, DirectiveBinding } from 'vue';
import Collapse from 'bootstrap/js/dist/collapse';

export type ToggleTarget = string | HTMLElement | null | undefined;

type CollapseInstance = InstanceType<typeof Collapse>;

const collapseInstances = new WeakMap<HTMLElement, CollapseInstance>();
const triggerHandlers = new WeakMap<HTMLElement, (event: Event) => void>();

const resolveTarget = (binding: DirectiveBinding<ToggleTarget>): HTMLElement | null => {
  const value = binding.value;
  if (!value) {
    return null;
  }

  if (value instanceof HTMLElement) {
    return value;
  }

  if (typeof value === 'string') {
    return document.querySelector<HTMLElement>(value);
  }

  return null;
};

const getCollapse = (target: HTMLElement): CollapseInstance => {
  const existing = collapseInstances.get(target);
  if (existing) {
    return existing;
  }

  const instance = new Collapse(target, { toggle: false });
  collapseInstances.set(target, instance);
  return instance;
};

const cleanupTrigger = (el: HTMLElement): void => {
  const handler = triggerHandlers.get(el);
  if (handler) {
    el.removeEventListener('click', handler);
    triggerHandlers.delete(el);
  }
};

const applyToggle = (el: HTMLElement, binding: DirectiveBinding<ToggleTarget>): void => {
  if (typeof window === 'undefined') {
    return;
  }

  cleanupTrigger(el);

  const target = resolveTarget(binding);
  if (!target) {
    return;
  }

  const handler = (event: Event) => {
    event.preventDefault();
    const collapse = getCollapse(target);
    collapse.toggle();
  };

  el.addEventListener('click', handler);
  triggerHandlers.set(el, handler);
};

export const vToggle: Directive<HTMLElement, ToggleTarget> = {
  mounted(el, binding) {
    applyToggle(el, binding);
  },
  updated(el, binding) {
    applyToggle(el, binding);
  },
  unmounted(el) {
    cleanupTrigger(el);
  },
};
