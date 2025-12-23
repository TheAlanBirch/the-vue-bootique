import { mount } from '@vue/test-utils';
import BCol from '../components/layout/BCol.vue';
import BContainer from '../components/layout/BContainer.vue';
import BRow from '../components/layout/BRow.vue';

describe('Layout components', () => {
  it('renders container variants', () => {
    const base = mount(BContainer);
    expect(base.classes()).toContain('container');

    const fluid = mount(BContainer, { props: { fluid: true } });
    expect(fluid.classes()).toContain('container-fluid');

    const breakpoint = mount(BContainer, { props: { fluid: 'lg' } });
    expect(breakpoint.classes()).toContain('container-lg');
  });

  it('applies responsive column and gutter classes on row', () => {
    const wrapper = mount(BRow, {
      props: { cols: 2, colsMd: 3, gutters: 2, align: 'center', justify: 'between' },
    });

    expect(wrapper.classes()).toContain('row');
    expect(wrapper.classes()).toContain('row-cols-2');
    expect(wrapper.classes()).toContain('row-cols-md-3');
    expect(wrapper.classes()).toContain('g-2');
    expect(wrapper.classes()).toContain('align-items-center');
    expect(wrapper.classes()).toContain('justify-content-between');
  });

  it('honors no-gutters on row', () => {
    const wrapper = mount(BRow, { props: { gutters: 3, noGutters: true } });

    expect(wrapper.classes()).toContain('g-0');
    expect(wrapper.classes()).not.toContain('g-3');
  });

  it('renders column sizes, offsets, and orders responsively', () => {
    const wrapper = mount(BCol, {
      props: {
        cols: 6,
        sm: 4,
        md: 'auto',
        offset: 1,
        offsetMd: 2,
        order: 'first',
        orderLg: 2,
        alignSelf: 'center',
      },
    });

    expect(wrapper.classes()).toContain('col-6');
    expect(wrapper.classes()).toContain('col-sm-4');
    expect(wrapper.classes()).toContain('col-md-auto');
    expect(wrapper.classes()).toContain('offset-1');
    expect(wrapper.classes()).toContain('offset-md-2');
    expect(wrapper.classes()).toContain('order-first');
    expect(wrapper.classes()).toContain('order-lg-2');
    expect(wrapper.classes()).toContain('align-self-center');
  });
});
