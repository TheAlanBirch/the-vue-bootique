<template>
  <div class="form-check mb-3">
    <input
      :id="uid"
      class="form-check-input"
      type="radio"
      :name="name"
      :checked="modelValue === value"
      :value="value"
      :disabled="isDisabled"
      :required="isRequired"
      :aria-invalid="ariaInvalid(state) || undefined"
      @change="onChange"
    />
    <label v-if="label" class="form-check-label" :for="uid">
      {{ label }}
    </label>
    <div v-if="state === 'invalid' && invalidFeedback" class="invalid-feedback d-block">
      {{ invalidFeedback }}
    </div>
    <div v-if="state === 'valid' && validFeedback" class="valid-feedback d-block">
      {{ validFeedback }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue';
import { resolveBooleanish } from '@/composables/useBooleanish';
import { ariaInvalid } from '@/composables/useValidation';
import type { Booleanish, FormState } from '@/types/common';

defineOptions({ name: 'BFormRadio' });

const props = withDefaults(
  defineProps<{
    modelValue: string | number | boolean;
    value: string | number | boolean;
    label?: string;
    name?: string;
    state?: FormState;
    invalidFeedback?: string;
    validFeedback?: string;
    disabled?: Booleanish;
    required?: Booleanish;
    id?: string;
  }>(),
  {
    label: '',
    name: '',
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

const uid = computed(() => props.id || (useId ? useId() : `radio-${Math.random().toString(36).slice(2, 9)}`));
const isDisabled = computed(() => resolveBooleanish(props.disabled));
const isRequired = computed(() => resolveBooleanish(props.required));

const onChange = () => {
  emit('update:modelValue', props.value);
};
</script>
