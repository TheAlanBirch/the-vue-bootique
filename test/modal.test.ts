import { mount } from '@vue/test-utils';
import BModal from '../components/overlay/BModal.vue';

describe('BModal', () => {
  it('renders when open and emits close on button click', async () => {
    const wrapper = mount(BModal, {
      props: { modelValue: true, title: 'Hello' },
      slots: { default: 'Content' },
    });

    expect(wrapper.find('.modal').exists()).toBe(true);
    await wrapper.get('button.btn-close').trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
  });

  it('closes when clicking backdrop', async () => {
    const wrapper = mount(BModal, {
      props: { modelValue: true },
      slots: { default: 'Content' },
    });

    await wrapper.get('.modal').trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
  });
});
