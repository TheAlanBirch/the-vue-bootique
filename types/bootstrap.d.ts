declare module 'bootstrap/js/dist/tooltip' {
  export interface TooltipOptions {
    title?: string | Element | (() => string | Element);
    placement?:
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
    trigger?: string;
    delay?: number | { show: number; hide: number };
    html?: boolean;
    container?: string | false | Element;
    boundary?: 'clippingParents' | 'viewport' | 'window' | Element;
    customClass?: string | ((...args: unknown[]) => string);
    offset?: [number, number] | string;
  }

  export default class Tooltip {
    constructor(element: Element, options?: TooltipOptions);
    dispose(): void;
    static getInstance(element: Element): Tooltip | null;
  }
}

declare module 'bootstrap/js/dist/popover' {
  import type { TooltipOptions } from 'bootstrap/js/dist/tooltip';

  export interface PopoverOptions extends TooltipOptions {
    content?: string | Element | (() => string | Element);
  }

  export default class Popover {
    constructor(element: Element, options?: PopoverOptions);
    dispose(): void;
    static getInstance(element: Element): Popover | null;
  }
}

declare module 'bootstrap/js/dist/scrollspy' {
  export interface ScrollSpyOptions {
    offset?: number;
    method?: string;
    target?: string | Element;
  }

  export default class ScrollSpy {
    constructor(element: Element, options?: ScrollSpyOptions);
    dispose(): void;
    refresh(): void;
    static getInstance(element: Element): ScrollSpy | null;
  }
}

declare module 'bootstrap/js/dist/collapse' {
  export interface CollapseOptions {
    toggle?: boolean;
    parent?: string | Element;
  }

  export default class Collapse {
    constructor(element: Element, options?: CollapseOptions);
    toggle(): void;
    show(): void;
    hide(): void;
    dispose(): void;
    static getInstance(element: Element): Collapse | null;
  }
}
