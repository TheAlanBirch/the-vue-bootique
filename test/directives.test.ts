/// <reference types="vitest/globals" />

import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { vi } from 'vitest';
import { vFocus } from '../src/directives/focus';
import { vPopover } from '../src/directives/popover';
import { vScrollspy } from '../src/directives/scrollspy';
import { vTooltip } from '../src/directives/tooltip';
import { vToggle } from '../src/directives/toggle';

// Define types for Bootstrap options
interface TooltipOptions {
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

interface PopoverOptions extends TooltipOptions {
  content?: string | Element | (() => string | Element);
}

interface ScrollSpyOptions {
  offset?: number;
  method?: string;
  target?: string | Element;
}

interface CollapseOptions {
  toggle?: boolean;
  parent?: string | Element;
}

vi.mock('bootstrap/js/dist/tooltip', () => {
  // Define mock classes with proper typing
  class TooltipMock {
    public disposed = false;
    static instances = new WeakMap<Element, TooltipMock>();

    static getInstance(element: Element): TooltipMock | null {
      return TooltipMock.instances.get(element) ?? null;
    }

    constructor(
      public element: Element,
      public options?: TooltipOptions,
    ) {
      TooltipMock.instances.set(element, this);
    }

    dispose(): void {
      this.disposed = true;
      TooltipMock.instances.delete(this.element);
    }
  }

  return { default: TooltipMock };
});

vi.mock('bootstrap/js/dist/popover', () => {
  // Define mock classes with proper typing
  class PopoverMock {
    public disposed = false;
    static instances = new WeakMap<Element, PopoverMock>();

    static getInstance(element: Element): PopoverMock | null {
      return PopoverMock.instances.get(element) ?? null;
    }

    constructor(
      public element: Element,
      public options?: PopoverOptions,
    ) {
      PopoverMock.instances.set(element, this);
    }

    dispose(): void {
      this.disposed = true;
      PopoverMock.instances.delete(this.element);
    }
  }

  return { default: PopoverMock };
});

vi.mock('bootstrap/js/dist/scrollspy', () => {
  // Define mock classes with proper typing
  class ScrollSpyMock {
    public disposed = false;
    static instances = new WeakMap<Element, ScrollSpyMock>();

    static getInstance(element: Element): ScrollSpyMock | null {
      return ScrollSpyMock.instances.get(element) ?? null;
    }

    constructor(
      public element: Element,
      public options?: ScrollSpyOptions,
    ) {
      ScrollSpyMock.instances.set(element, this);
    }

    dispose(): void {
      this.disposed = true;
      ScrollSpyMock.instances.delete(this.element);
    }

    refresh(): void {}
  }

  return { default: ScrollSpyMock };
});

vi.mock('bootstrap/js/dist/collapse', () => {
  // Define mock classes with proper typing
  class CollapseMock {
    public disposed = false;
    public toggleCount = 0;
    public showCount = 0;
    public hideCount = 0;
    static instances = new WeakMap<Element, CollapseMock>();

    static getInstance(element: Element): CollapseMock | null {
      return CollapseMock.instances.get(element) ?? null;
    }

    constructor(
      public element: Element,
      public options?: CollapseOptions,
    ) {
      CollapseMock.instances.set(element, this);
    }

    dispose(): void {
      this.disposed = true;
      CollapseMock.instances.delete(this.element);
    }

    toggle(): void {
      this.toggleCount++;
    }

    show(): void {
      this.showCount++;
    }

    hide(): void {
      this.hideCount++;
    }
  }

  return { default: CollapseMock };
});

const getTooltipInstance = async (el: Element) => {
  const module = await import('bootstrap/js/dist/tooltip');
  return module.default.getInstance(el);
};

const getPopoverInstance = async (el: Element) => {
  const module = await import('bootstrap/js/dist/popover');
  return module.default.getInstance(el);
};

const getScrollspyInstance = async (el: Element) => {
  const module = await import('bootstrap/js/dist/scrollspy');
  return module.default.getInstance(el);
};

const getCollapseInstance = async (el: Element) => {
  const module = await import('bootstrap/js/dist/collapse');
  return module.default.getInstance(el);
};

/** Microtask helper to let async directive mounts settle before assertions. */
const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('v-tooltip', () => {
  it('creates a tooltip from a string binding', async () => {
    const wrapper = mount({
      template: '<button v-tooltip="text">Action</button>',
      data: () => ({ text: 'Save changes' }),
      directives: { tooltip: vTooltip },
    });

    await nextTick();
    await flush();

    const instance = await getTooltipInstance(wrapper.get('button').element);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((instance as any)?.options?.title).toBe('Save changes');
  });

  it('updates tooltip options on binding change', async () => {
    const label = ref('First');
    const wrapper = mount({
      setup() {
        return { label };
      },
      template: '<button v-tooltip="label">Action</button>',
      directives: { tooltip: vTooltip },
    });

    const button = wrapper.get('button').element;
    await nextTick();
    await flush();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(((await getTooltipInstance(button)) as any)?.options.title).toBe('First');

    label.value = 'Updated';
    await nextTick();
    await flush();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(((await getTooltipInstance(button)) as any)?.options.title).toBe('Updated');
  });

  it('disposes the tooltip on unmount', async () => {
    const wrapper = mount({
      template: '<button v-tooltip="\'Bye\'">Action</button>',
      directives: { tooltip: vTooltip },
    });

    const button = wrapper.get('button').element;
    await nextTick();
    await flush();
    const instance = await getTooltipInstance(button);

    wrapper.unmount();
    await flush();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((instance as any)?.disposed).toBe(true);
    expect(await getTooltipInstance(button)).toBeNull();
  });
});

describe('v-popover', () => {
  it('creates a popover from a string binding', async () => {
    const wrapper = mount({
      template: '<button v-popover="text">Info</button>',
      data: () => ({ text: 'Details' }),
      directives: { popover: vPopover },
    });

    await nextTick();
    await flush();

    const instance = await getPopoverInstance(wrapper.get('button').element);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((instance as any)?.options.content).toBe('Details');
  });

  it('disposes the popover on unmount', async () => {
    const wrapper = mount({
      template: '<button v-popover="\'Bye\'">Action</button>',
      directives: { popover: vPopover },
    });

    const button = wrapper.get('button').element;
    await nextTick();
    await flush();
    const instance = await getPopoverInstance(button);

    wrapper.unmount();
    await flush();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((instance as any)?.disposed).toBe(true);
    expect(await getPopoverInstance(button)).toBeNull();
  });
});

describe('v-scrollspy', () => {
  it('initializes scrollspy with provided options', async () => {
    const wrapper = mount({
      template: '<div v-scrollspy="{ target: \'#nav\', offset: 10 }"></div>',
      directives: { scrollspy: vScrollspy },
    });

    const el = wrapper.get('div').element;
    await nextTick();
    await flush();
    const instance = await getScrollspyInstance(el);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((instance as any)?.options.target).toBe('#nav');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((instance as any)?.options.offset).toBe(10);

    wrapper.unmount();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((instance as any)?.disposed).toBe(true);
  });
});

describe('v-toggle', () => {
  it('toggles the target collapse on click', async () => {
    const target = document.createElement('div');
    target.id = 'collapseTarget';
    document.body.appendChild(target);

    const wrapper = mount(
      {
        template: '<button v-toggle="\'#collapseTarget\'">Toggle</button>',
        directives: { toggle: vToggle },
      },
      { attachTo: document.body },
    );

    const button = wrapper.get('button');
    await nextTick();
    await flush();
    await button.trigger('click');

    const instance = await getCollapseInstance(target);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((instance as any)?.toggleCount).toBe(1);

    wrapper.unmount();
    target.remove();
  });
});

describe('v-focus', () => {
  it('focuses immediately by default', async () => {
    const wrapper = mount(
      {
        template: '<input v-focus />',
        directives: { focus: vFocus },
      },
      { attachTo: document.body },
    );

    await nextTick();

    expect(document.activeElement).toBe(wrapper.get('input').element);
    wrapper.unmount();
  });

  it('respects delay option', async () => {
    vi.useFakeTimers();

    const wrapper = mount(
      {
        template: '<input v-focus="{ delay: 50 }" />',
        directives: { focus: vFocus },
      },
      { attachTo: document.body },
    );

    const input = wrapper.get('input').element;
    expect(document.activeElement).not.toBe(input);

    vi.advanceTimersByTime(50);
    await nextTick();

    expect(document.activeElement).toBe(input);

    vi.useRealTimers();
    wrapper.unmount();
  });
});
