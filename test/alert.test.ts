import { mount } from '@vue/test-utils';
import BAlert from '../components/feedback/BAlert.vue';

describe('BAlert', () => {
  it('renders variant class', () => {
    const wrapper = mount(BAlert, {
      props: { variant: 'danger' },
      slots: { default: 'Alert message' },
    });

    expect(wrapper.classes()).toContain('alert');
    expect(wrapper.classes()).toContain('alert-danger');
  });

  it('dismisses when close button clicked', async () => {
    const wrapper = mount(BAlert, {
      props: { dismissible: true, modelValue: true },
      slots: { default: 'Dismiss me' },
    });

    await wrapper.get('button.btn-close').trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
