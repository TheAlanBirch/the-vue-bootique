import { mount } from '@vue/test-utils';
import VBModal from '../components/overlay/VBModal.vue';

describe('VBModal', () => {
  it('renders when open and emits close on button click', async () => {
    const wrapper = mount(VBModal, {
      props: { modelValue: true, title: 'Hello' },
      slots: { default: 'Content' },
    });

    expect(wrapper.find('.modal').exists()).toBe(true);
    await wrapper.get('button.btn-close').trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
  });

  it('closes when clicking backdrop', async () => {
    const wrapper = mount(VBModal, {
      props: { modelValue: true },
      slots: { default: 'Content' },
    });

    await wrapper.get('.modal').trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
  });
});
