<template>
  <div class="mb-3">
    <label v-if="label" class="form-label" :for="uid">{{ label }}</label>
    <input
      :id="uid"
      :type="type"
      class="form-control"
      :class="stateClass"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="isDisabled"
      :readonly="isReadonly"
      :required="isRequired"
      :aria-invalid="ariaInvalid(state) || undefined"
      :aria-describedby="description ? `${uid}-desc` : undefined"
      @input="onInput"
      @blur="onBlur"
    />
    <small v-if="description" :id="`${uid}-desc`" class="form-text text-muted">{{ description }}</small>
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

defineOptions({ name: 'BFormInput' });

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    type?: string;
    label?: string;
    placeholder?: string;
    description?: string;
    state?: FormState;
    invalidFeedback?: string;
    validFeedback?: string;
    disabled?: Booleanish;
    readonly?: Booleanish;
    required?: Booleanish;
    id?: string;
  }>(),
  {
    type: 'text',
    label: '',
    placeholder: '',
    description: '',
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
  (e: 'update:modelValue', value: string | number): void;
  (e: 'blur', event: FocusEvent): void;
}>();

const uid = computed(() => props.id || (useId ? useId() : `input-${Math.random().toString(36).slice(2, 9)}`));
const stateClass = computed(() => validationClass(props.state));
const isDisabled = computed(() => resolveBooleanish(props.disabled));
const isReadonly = computed(() => resolveBooleanish(props.readonly));
const isRequired = computed(() => resolveBooleanish(props.required));

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (props.type === 'number') {
    const numeric = Number(target.value);
    emit('update:modelValue', Number.isNaN(numeric) ? target.value : numeric);
  } else {
    emit('update:modelValue', target.value);
  }
};

const onBlur = (event: FocusEvent) => emit('blur', event);
</script>
