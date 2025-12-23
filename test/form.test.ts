import { mount } from '@vue/test-utils';
import BFormCheckbox from '../components/form/BFormCheckbox.vue';
import BFormInput from '../components/form/BFormInput.vue';
import BFormRadio from '../components/form/BFormRadio.vue';
import BFormSelect from '../components/form/BFormSelect.vue';
import BFormTextarea from '../components/form/BFormTextarea.vue';

describe('Form components', () => {
  it('updates model on input', async () => {
    const wrapper = mount(BFormInput, {
      props: { modelValue: '', label: 'Name' },
    });

    await wrapper.get('input').setValue('John');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['John']);
  });

  it('applies validation class', () => {
    const wrapper = mount(BFormInput, {
      props: { modelValue: '', state: 'invalid' },
    });

    expect(wrapper.get('input').classes()).toContain('is-invalid');
  });

  it('select emits update on change', async () => {
    const wrapper = mount(BFormSelect, {
      props: {
        modelValue: '',
        options: [
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
        ],
      },
    });

    await wrapper.get('select').setValue('2');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2']);
  });

  it('checkbox toggles value', async () => {
    const wrapper = mount(BFormCheckbox, {
      props: { modelValue: false, label: 'Accept' },
    });

    await wrapper.get('input[type="checkbox"]').setValue(true);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
  });

  it('radio sets selected value', async () => {
    const wrapper = mount(BFormRadio, {
      props: { modelValue: 'a', value: 'b', label: 'Option B', name: 'group' },
    });

    await wrapper.get('input[type="radio"]').setValue(true);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b']);
  });

  it('textarea emits input', async () => {
    const wrapper = mount(BFormTextarea, {
      props: { modelValue: '', label: 'Description' },
    });

    await wrapper.get('textarea').setValue('Hello');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Hello']);
  });
});
