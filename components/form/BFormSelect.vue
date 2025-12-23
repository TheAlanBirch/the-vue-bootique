<template>
  <div class="mb-3">
    <label v-if="label" class="form-label" :for="uid">{{ label }}</label>
    <select
      :id="uid"
      class="form-select"
      :class="stateClass"
      :value="modelValue"
      :disabled="isDisabled"
      :required="isRequired"
      :aria-invalid="ariaInvalid(state) || undefined"
      @change="onChange"
    >
      <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
    <div v-if="state === 'invalid' && invalidFeedback" class="invalid-feedback d-block">
      {{ invalidFeedback }}
    </div>
    <div v-if="state === 'valid' && validFeedback" class="valid-feedback d-block">
      {{ validFeedback }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { resolveBooleanish } from '@/composables/useBooleanish';
import { useUniqueId } from '@/composables/useUniqueId';
import { ariaInvalid, validationClass } from '@/composables/useValidation';
import type { Booleanish, FormState, OptionItem } from '@/types/common';

defineOptions({ name: 'BFormSelect' });

const props = withDefaults(
  defineProps<{
    modelValue: string | number | boolean;
    options: OptionItem[];
    label?: string;
    placeholder?: string;
    state?: FormState;
    invalidFeedback?: string;
    validFeedback?: string;
    disabled?: Booleanish;
    required?: Booleanish;
    id?: string;
  }>(),
  {
    label: '',
    placeholder: '',
    state: null,
    invalidFeedback: '',
    validFeedback: '',
    disabled: false,
    required: false,
    id: '',
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | boolean): void;
}>();

const uid = computed(() => props.id || useUniqueId('select'));
const stateClass = computed(() => validationClass(props.state));
const isDisabled = computed(() => resolveBooleanish(props.disabled));
const isRequired = computed(() => resolveBooleanish(props.required));

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const rawValue = target.value;
  const matched = props.options.find((option) => String(option.value) === rawValue);
  emit('update:modelValue', matched ? matched.value : rawValue);
};
</script>
