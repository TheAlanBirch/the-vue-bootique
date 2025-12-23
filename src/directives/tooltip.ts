import type { Directive, DirectiveBinding } from 'vue';
import type TooltipType from 'bootstrap/js/dist/tooltip';
import type { TooltipOptions } from 'bootstrap/js/dist/tooltip';

export type TooltipPlacement = TooltipOptions['placement'];
export type TooltipDirectiveOptions = TooltipOptions;

export type TooltipBindingValue =
  | string
  | TooltipDirectiveOptions
  | false
  | null
  | undefined;

type TooltipInstance = InstanceType<typeof TooltipType>;

/** Cache of the Tooltip constructor to avoid multiple dynamic imports. */
let tooltipCtorPromise: Promise<typeof TooltipType> | null = null;

/**
 * Lazily import Bootstrap Tooltip at runtime for SSR safety while reusing a single promise.
 */
const loadTooltip = () => {
  if (!tooltipCtorPromise) {
    tooltipCtorPromise = import('bootstrap/js/dist/tooltip').then((m) => m.default);
  }
  return tooltipCtorPromise;
};

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

const applyTooltip = async (
  el: HTMLElement,
  binding: DirectiveBinding<TooltipBindingValue>,
): Promise<void> => {
  if (typeof window === 'undefined') {
    return;
  }

  const options = resolveOptions(el, binding);
  if (!options) {
    disposeTooltip(el);
    return;
  }

  disposeTooltip(el);

  const Tooltip = await loadTooltip();
  const instance = new Tooltip(el, options);
  tooltipInstances.set(el, instance);
};

export const vTooltip: Directive<HTMLElement, TooltipBindingValue> = {
  async mounted(el, binding) {
    await applyTooltip(el, binding);
  },
  async updated(el, binding) {
    await applyTooltip(el, binding);
  },
  unmounted(el) {
    disposeTooltip(el);
  },
};
