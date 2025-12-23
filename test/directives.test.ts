/// <reference types="vitest/globals" />

import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { vi } from 'vitest';
import { vFocus } from '../src/directives/focus';
import { vPopover } from '../src/directives/popover';
import { vScrollspy } from '../src/directives/scrollspy';
import { vTooltip } from '../src/directives/tooltip';
import { vToggle } from '../src/directives/toggle';

// Import the mocked modules
import Tooltip from 'bootstrap/js/dist/tooltip';
import Popover from 'bootstrap/js/dist/popover';
import ScrollSpy from 'bootstrap/js/dist/scrollspy';
import Collapse from 'bootstrap/js/dist/collapse';

// Mock Bootstrap modules
vi.mock('bootstrap/js/dist/tooltip', () => ({
  default: vi.fn().mockImplementation((element: Element, options?: Record<string, unknown>) => ({
    element,
    options,
    dispose: vi.fn(),
  })),
}));

vi.mock('bootstrap/js/dist/popover', () => ({
  default: vi.fn().mockImplementation((element: Element, options?: Record<string, unknown>) => ({
    element,
    options,
    dispose: vi.fn(),
  })),
}));

vi.mock('bootstrap/js/dist/scrollspy', () => ({
  default: vi.fn().mockImplementation((element: Element, options?: Record<string, unknown>) => ({
    element,
    options,
    dispose: vi.fn(),
    refresh: vi.fn(),
  })),
}));

vi.mock('bootstrap/js/dist/collapse', () => ({
  default: vi.fn().mockImplementation((element: Element, options?: Record<string, unknown>) => ({
    element,
    options,
    dispose: vi.fn(),
    toggle: vi.fn(),
    show: vi.fn(),
    hide: vi.fn(),
  })),
}));

const getTooltipInstance = (el: Element) => {
  return (Tooltip as unknown as ReturnType<typeof vi.fn>).mock.results.find((result) => result.value.element === el)
    ?.value;
};

const getPopoverInstance = (el: Element) => {
  return (Popover as unknown as ReturnType<typeof vi.fn>).mock.results.find((result) => result.value.element === el)
    ?.value;
};

const getScrollspyInstance = (el: Element) => {
  return (ScrollSpy as unknown as ReturnType<typeof vi.fn>).mock.results.find((result) => result.value.element === el)
    ?.value;
};

const getCollapseInstance = (el: Element) => {
  return (Collapse as unknown as ReturnType<typeof vi.fn>).mock.results.find((result) => result.value.element === el)
    ?.value;
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
      template: '<button v-tooltip="\'Bye\'">Action</button>',
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
      template: '<button v-popover="\'Bye\'">Action</button>',
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
      template: '<div v-scrollspy="{ target: \'#nav\', offset: 10 }"></div>',
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

    const wrapper = mount(
      {
        template: '<button v-toggle="\'#collapseTarget\'">Toggle</button>',
        directives: { toggle: vToggle },
      },
      { attachTo: document.body },
    );

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
