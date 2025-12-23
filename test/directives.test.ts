import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { vFocus } from '../src/directives/focus';
import { vTooltip } from '../src/directives/tooltip';

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

const getTooltipInstance = async (el: Element) => {
  const module = await import('bootstrap/js/dist/tooltip');
  const TooltipMock = module.default as any;
  return TooltipMock.getInstance(el);
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
