import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { vFocus } from '../src/directives/focus';
import { vPopover } from '../src/directives/popover';
import { vScrollspy } from '../src/directives/scrollspy';
import { vTooltip } from '../src/directives/tooltip';
import { vToggle } from '../src/directives/toggle';

vi.mock('bootstrap/js/dist/tooltip', () => {
  const instances = new WeakMap<Element, any>();

  class TooltipMock {
    public disposed = false;
    static instances = instances;

    static getInstance(element: Element): TooltipMock | null {
      return TooltipMock.instances.get(element) ?? null;
    }

    constructor(public element: Element, public options?: any) {
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
  const instances = new WeakMap<Element, any>();

  class PopoverMock {
    public disposed = false;
    static instances = instances;

    static getInstance(element: Element): PopoverMock | null {
      return PopoverMock.instances.get(element) ?? null;
    }

    constructor(public element: Element, public options?: any) {
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
  const instances = new WeakMap<Element, any>();

  class ScrollSpyMock {
    public disposed = false;
    static instances = instances;

    static getInstance(element: Element): ScrollSpyMock | null {
      return ScrollSpyMock.instances.get(element) ?? null;
    }

    constructor(public element: Element, public options?: any) {
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
  const instances = new WeakMap<Element, any>();

  class CollapseMock {
    public disposed = false;
    public toggleCount = 0;
    public showCount = 0;
    public hideCount = 0;
    static instances = instances;

    static getInstance(element: Element): CollapseMock | null {
      return CollapseMock.instances.get(element) ?? null;
    }

    constructor(public element: Element, public options?: any) {
      CollapseMock.instances.set(element, this);
    }

    toggle(): void {
      this.toggleCount += 1;
    }

    show(): void {
      this.showCount += 1;
    }

    hide(): void {
      this.hideCount += 1;
    }

    dispose(): void {
      this.disposed = true;
      CollapseMock.instances.delete(this.element);
    }
  }

  return { default: CollapseMock };
});

const getTooltipInstance = async (el: Element) => {
  const module = await import('bootstrap/js/dist/tooltip');
  const TooltipMock = module.default as any;
  return TooltipMock.getInstance(el);
};

const getPopoverInstance = async (el: Element) => {
  const module = await import('bootstrap/js/dist/popover');
  const PopoverMock = module.default as any;
  return PopoverMock.getInstance(el);
};

const getScrollspyInstance = async (el: Element) => {
  const module = await import('bootstrap/js/dist/scrollspy');
  const ScrollSpyMock = module.default as any;
  return ScrollSpyMock.getInstance(el);
};

const getCollapseInstance = async (el: Element) => {
  const module = await import('bootstrap/js/dist/collapse');
  const CollapseMock = module.default as any;
  return CollapseMock.getInstance(el);
};

describe('v-tooltip', () => {
  it('creates a tooltip from a string binding', async () => {
    const wrapper = mount({
      template: '<button v-tooltip="text">Action</button>',
      data: () => ({ text: 'Save changes' }),
      directives: { tooltip: vTooltip },
    });

    const instance = await getTooltipInstance(wrapper.get('button').element);
    expect(instance?.options.title).toBe('Save changes');
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
    expect((await getTooltipInstance(button))?.options.title).toBe('First');

    label.value = 'Updated';
    await nextTick();

    expect((await getTooltipInstance(button))?.options.title).toBe('Updated');
  });

  it('disposes the tooltip on unmount', async () => {
    const wrapper = mount({
      template: "<button v-tooltip=\"'Bye'\">Action</button>",
      directives: { tooltip: vTooltip },
    });

    const button = wrapper.get('button').element;
    const instance = await getTooltipInstance(button);

    wrapper.unmount();

    expect(instance?.disposed).toBe(true);
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

    const instance = await getPopoverInstance(wrapper.get('button').element);
    expect(instance?.options.content).toBe('Details');
  });

  it('disposes the popover on unmount', async () => {
    const wrapper = mount({
      template: "<button v-popover=\"'Bye'\">Action</button>",
      directives: { popover: vPopover },
    });

    const button = wrapper.get('button').element;
    const instance = await getPopoverInstance(button);

    wrapper.unmount();

    expect(instance?.disposed).toBe(true);
    expect(await getPopoverInstance(button)).toBeNull();
  });
});

describe('v-scrollspy', () => {
  it('initializes scrollspy with provided options', async () => {
    const wrapper = mount({
      template: '<div v-scrollspy="{ target: `#nav`, offset: 10 }"></div>',
      directives: { scrollspy: vScrollspy },
    });

    const el = wrapper.get('div').element;
    const instance = await getScrollspyInstance(el);
    expect(instance?.options.target).toBe('#nav');
    expect(instance?.options.offset).toBe(10);

    wrapper.unmount();
    expect(instance?.disposed).toBe(true);
  });
});

describe('v-toggle', () => {
  it('toggles the target collapse on click', async () => {
    const target = document.createElement('div');
    target.id = 'collapseTarget';
    document.body.appendChild(target);

    const wrapper = mount({
      template: '<button v-toggle="\'#collapseTarget\'">Toggle</button>',
      directives: { toggle: vToggle },
    }, { attachTo: document.body });

    const button = wrapper.get('button');
    await button.trigger('click');

    const instance = await getCollapseInstance(target);
    expect(instance?.toggleCount).toBe(1);

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
        template: '<input v-focus=\"{ delay: 50 }\" />',
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
