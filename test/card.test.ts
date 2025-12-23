import { mount } from '@vue/test-utils';
import VBCard from '../components/card/VBCard.vue';

describe('VBCard', () => {
  it('renders header, body, and footer content', () => {
    const wrapper = mount(VBCard, {
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
