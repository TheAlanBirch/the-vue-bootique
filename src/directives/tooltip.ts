import type { Directive, DirectiveBinding } from 'vue';
import Tooltip from 'bootstrap/js/dist/tooltip';

export type TooltipPlacement =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';

export interface TooltipDirectiveOptions {
  title?: string | Element | (() => string | Element);
  placement?: TooltipPlacement;
  trigger?: string;
  delay?: number | { show: number; hide: number };
  html?: boolean;
  container?: string | false | Element;
  boundary?: 'clippingParents' | 'viewport' | 'window' | Element;
  customClass?: string | ((...args: any[]) => string);
  offset?: [number, number] | string;
}

export type TooltipBindingValue =
  | string
  | TooltipDirectiveOptions
  | false
  | null
  | undefined;

type TooltipInstance = InstanceType<typeof Tooltip>;

const tooltipInstances = new WeakMap<HTMLElement, TooltipInstance>();

const resolveOptions = (
  el: HTMLElement,
  binding: DirectiveBinding<TooltipBindingValue>,
): TooltipDirectiveOptions | null => {
  const value = binding.value;

  if (value === false || value == null) {
    return null;
  }

  if (typeof value === 'string') {
    return { title: value };
  }

  if (typeof value === 'object') {
    return value;
  }

  const attrTitle = el.getAttribute('title');
  return attrTitle ? { title: attrTitle } : null;
};

const disposeTooltip = (el: HTMLElement): void => {
  const existing = tooltipInstances.get(el);
  if (existing) {
    existing.dispose();
    tooltipInstances.delete(el);
  }
};

const applyTooltip = (
  el: HTMLElement,
  binding: DirectiveBinding<TooltipBindingValue>,
): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const options = resolveOptions(el, binding);
  if (!options) {
    disposeTooltip(el);
    return;
  }

  disposeTooltip(el);

  // Assumes Bootstrap's Tooltip module (and Popper) are available to the consumer bundle; this directive only wires DOM behavior.
  const instance = new Tooltip(el, options);
  tooltipInstances.set(el, instance);
};

export const vTooltip: Directive<HTMLElement, TooltipBindingValue> = {
  mounted(el, binding) {
    applyTooltip(el, binding);
  },
  updated(el, binding) {
    applyTooltip(el, binding);
  },
  unmounted(el) {
    disposeTooltip(el);
  },
};
