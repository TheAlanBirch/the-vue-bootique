<template>
  <div class="mb-3">
    <label v-if="label" class="form-label" :for="uid">{{ label }}</label>
    <textarea
      :id="uid"
      class="form-control"
      :class="stateClass"
      :rows="rows"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="isDisabled"
      :readonly="isReadonly"
      :required="isRequired"
      :aria-invalid="ariaInvalid(state) || undefined"
      @input="onInput"
    ></textarea>
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
import { ariaInvalid, validationClass } from '@/composables/useValidation';
import type { Booleanish, FormState } from '@/types/common';

defineOptions({ name: 'BFormTextarea' });

const props = withDefaults(
  defineProps<{
    modelValue: string;
    rows?: number | string;
    label?: string;
    placeholder?: string;
    state?: FormState;
    invalidFeedback?: string;
    validFeedback?: string;
    disabled?: Booleanish;
    readonly?: Booleanish;
    required?: Booleanish;
    id?: string;
  }>(),
  {
    rows: 3,
    label: '',
    placeholder: '',
    state: null,
    invalidFeedback: '',
    validFeedback: '',
    disabled: false,
    readonly: false,
    required: false,
    id: '',
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const uid = computed(() => props.id || (useId ? useId() : `textarea-${Math.random().toString(36).slice(2, 9)}`));
const stateClass = computed(() => validationClass(props.state));
const isDisabled = computed(() => resolveBooleanish(props.disabled));
const isReadonly = computed(() => resolveBooleanish(props.readonly));
const isRequired = computed(() => resolveBooleanish(props.required));

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};
</script>
