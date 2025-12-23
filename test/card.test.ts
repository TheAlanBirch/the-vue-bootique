import { mount } from '@vue/test-utils';
import BCard from '../components/card/BCard.vue';
import BCardGroup from '../components/card/BCardGroup.vue';

describe('BCard', () => {
  it('renders header, body, and footer content', () => {
    const wrapper = mount(BCard, {
      props: {
        header: 'Card Header',
        title: 'Card Title',
        subTitle: 'Subtitle',
        footer: 'Card Footer',
      },
      slots: {
        default: 'Body content',
      },
    });

    expect(wrapper.text()).toContain('Card Header');
    expect(wrapper.text()).toContain('Card Title');
    expect(wrapper.text()).toContain('Subtitle');
    expect(wrapper.text()).toContain('Body content');
    expect(wrapper.text()).toContain('Card Footer');
  });

  it('applies header and footer variants and classes', () => {
    const wrapper = mount(BCard, {
      props: {
        header: 'Card Header',
        headerVariant: 'secondary',
        headerClass: 'fw-bold',
        footer: 'Card Footer',
        footerVariant: 'primary',
        footerClass: ['text-white'],
        title: 'Card Title',
      },
      slots: {
        default: 'Body content',
      },
    });

    const header = wrapper.find('.card-header');
    expect(header.classes()).toContain('bg-secondary');
    expect(header.classes()).toContain('fw-bold');

    const footer = wrapper.find('.card-footer');
    expect(footer.classes()).toContain('bg-primary');
    expect(footer.classes()).toContain('text-white');
  });

  it('renders custom body tag and subtitle text variant', () => {
    const wrapper = mount(BCard, {
      props: {
        title: 'Card Title',
        subTitle: 'Subtitle',
        subTitleTextVariant: 'info',
        bodyTag: 'section',
        bodyClass: 'p-4',
      },
      slots: {
        default: 'Body content',
      },
    });

    const body = wrapper.find('section.card-body');
    expect(body.exists()).toBe(true);
    expect(body.classes()).toContain('p-4');

    const subtitle = wrapper.find('.card-subtitle');
    expect(subtitle.classes()).toContain('text-info');
  });

  it('supports grid layout in card group', () => {
    const wrapper = mount(BCardGroup, {
      props: {
        grid: true,
        maxColumns: 2,
        maxRows: 1,
        gap: 2,
      },
      slots: {
        default: '<div class="card">Item A</div><div class="card">Item B</div>',
      },
    });

    const group = wrapper.find('.card-group');
    expect(group.classes()).toContain('d-grid');
    expect(group.classes()).toContain('gap-2');
    expect(group.element.style.gridTemplateColumns).toContain('repeat(2');
    expect(group.element.style.gridTemplateRows).toContain('repeat(1');
  });
});
