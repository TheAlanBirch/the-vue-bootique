import { mount } from '@vue/test-utils';
import BCard from '../components/card/BCard.vue';

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
});
