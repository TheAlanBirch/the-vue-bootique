import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import BIcon from '~/components/icon/BIcon.vue';
import BIconStack from '~/components/icon/BIconStack.vue';

describe('BIcon', () => {
  it('renders icon with variant and animation classes', async () => {
    const wrapper = mount(BIcon, {
      props: { icon: 'arrow-up', variant: 'primary', animation: 'spin' },
    });

    expect(wrapper.classes()).toContain('b-icon');
    expect(wrapper.classes()).toContain('text-primary');
    expect(wrapper.find('i').classes()).toContain('bi-arrow-up');
    expect(wrapper.find('i').classes()).toContain('b-icon-animate-spin');
  });

  it('applies font scaling to the rendered icon', async () => {
    const wrapper = mount(BIcon, { props: { icon: 'alarm', fontScale: 1.25 } });

    expect(wrapper.attributes('style')).toContain('font-size: 1.25em;');
  });

  it('derives the icon name from component aliases', async () => {
    const TestComponent = defineComponent({
      template: '<b-icon-arrow-up data-test="alias" />',
    });

    const wrapper = mount(TestComponent, {
      global: {
        components: {
          BIcon,
          BIconArrowUp: defineComponent({
            name: 'BIconArrowUp',
            setup(_, { slots, attrs }) {
              return () => h(BIcon, { ...attrs, icon: 'arrow-up' }, slots);
            },
          }),
        },
      },
    });
    const icon = wrapper.find('[data-test="alias"] i');

    expect(icon.classes()).toContain('bi-arrow-up');
  });
});

describe('BIconStack', () => {
  it('stacks icons and forwards animation classes', async () => {
    const wrapper = mount(BIconStack, {
      props: { animation: 'pulse' },
      slots: {
        default: () => [
          h(BIcon, { icon: 'circle-fill', variant: 'primary', stacked: true }),
          h(BIcon, { icon: 'arrow-up', stacked: true, stackedOrder: 2, animation: 'spin' }),
        ],
      },
    });
    const stack = wrapper.find('.b-iconstack');

    expect(stack.exists()).toBe(true);

    const icons = wrapper.findAll('.b-icon');
    expect(icons[0].classes()).toContain('b-icon-stacked');
    expect(icons[1].attributes('style')).toContain('z-index: 2');
    expect(stack.classes()).toContain('b-icon-animate-pulse');
  });
});
