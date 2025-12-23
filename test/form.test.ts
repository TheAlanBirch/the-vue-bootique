import { mount } from '@vue/test-utils';
import VBFormCheckbox from '../components/form/VBFormCheckbox.vue';
import VBFormInput from '../components/form/VBFormInput.vue';
import VBFormRadio from '../components/form/VBFormRadio.vue';
import VBFormSelect from '../components/form/VBFormSelect.vue';
import VBFormTextarea from '../components/form/VBFormTextarea.vue';

describe('Form components', () => {
  it('updates model on input', async () => {
    const wrapper = mount(VBFormInput, {
      props: { modelValue: '', label: 'Name' },
    });

    await wrapper.get('input').setValue('John');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['John']);
  });

  it('applies validation class', () => {
    const wrapper = mount(VBFormInput, {
      props: { modelValue: '', state: 'invalid' },
    });

    expect(wrapper.get('input').classes()).toContain('is-invalid');
  });

  it('select emits update on change', async () => {
    const wrapper = mount(VBFormSelect, {
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
    const wrapper = mount(VBFormCheckbox, {
      props: { modelValue: false, label: 'Accept' },
    });

    await wrapper.get('input[type="checkbox"]').setValue(true);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
  });

  it('radio sets selected value', async () => {
    const wrapper = mount(VBFormRadio, {
      props: { modelValue: 'a', value: 'b', label: 'Option B', name: 'group' },
    });

    await wrapper.get('input[type="radio"]').setValue(true);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b']);
  });

  it('textarea emits input', async () => {
    const wrapper = mount(VBFormTextarea, {
      props: { modelValue: '', label: 'Description' },
    });

    await wrapper.get('textarea').setValue('Hello');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Hello']);
  });
});
