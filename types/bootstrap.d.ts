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
    customClass?: string | ((...args: any[]) => string);
    offset?: [number, number] | string;
  }

  export default class Tooltip {
    constructor(element: Element, options?: TooltipOptions);
    dispose(): void;
    static getInstance(element: Element): Tooltip | null;
  }
}
