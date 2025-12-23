import { mount } from '@vue/test-utils';
import BButton from '../components/base/BButton.vue';

describe('BButton', () => {
  it('applies variant and size classes', () => {
    const wrapper = mount(BButton, {
      props: { variant: 'secondary', size: 'lg' },
      slots: { default: 'Action' },
    });

    const button = wrapper.get('button');
    expect(button.classes()).toContain('btn');
    expect(button.classes()).toContain('btn-secondary');
    expect(button.classes()).toContain('btn-lg');
  });

  it('emits click when enabled', async () => {
    const wrapper = mount(BButton, {
      slots: { default: 'Action' },
    });

    await wrapper.get('button').trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('prevents click when disabled', async () => {
    const wrapper = mount(BButton, {
      props: { disabled: true },
      slots: { default: 'Disabled' },
    });

    await wrapper.get('button').trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });
});
