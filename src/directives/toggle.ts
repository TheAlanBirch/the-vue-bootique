import type { Directive, DirectiveBinding } from 'vue';
import Collapse from 'bootstrap/js/dist/collapse';

export type ToggleTarget = string | HTMLElement | null | undefined;

type CollapseInstance = InstanceType<typeof Collapse>;

const collapseInstances = new WeakMap<HTMLElement, CollapseInstance>();
const triggerHandlers = new WeakMap<HTMLElement, (event: Event) => void>();
const triggerTargets = new WeakMap<HTMLElement, HTMLElement>();
const collapseRefCounts = new WeakMap<HTMLElement, number>();

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
  let instance = collapseInstances.get(target);
  if (!instance) {
    instance = new Collapse(target, { toggle: false });
    collapseInstances.set(target, instance);
    collapseRefCounts.set(target, 0);
  }

  const count = collapseRefCounts.get(target) ?? 0;
  collapseRefCounts.set(target, count + 1);
  return instance;
};

const releaseCollapse = (target: HTMLElement | null): void => {
  if (!target) return;

  const instance = collapseInstances.get(target);
  if (!instance) return;

  const count = collapseRefCounts.get(target) ?? 0;
  if (count <= 1) {
    instance.dispose();
    collapseInstances.delete(target);
    collapseRefCounts.delete(target);
  } else {
    collapseRefCounts.set(target, count - 1);
  }
};

const cleanupTrigger = (el: HTMLElement): void => {
  const handler = triggerHandlers.get(el);
  if (handler) {
    el.removeEventListener('click', handler);
    triggerHandlers.delete(el);
  }

  const target = triggerTargets.get(el) ?? null;
  if (target) {
    releaseCollapse(target);
    triggerTargets.delete(el);
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

  const collapse = getCollapse(target);

  const handler = (event: Event) => {
    event.preventDefault();
    collapse.toggle();
  };

  el.addEventListener('click', handler);
  triggerHandlers.set(el, handler);
  triggerTargets.set(el, target);
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
