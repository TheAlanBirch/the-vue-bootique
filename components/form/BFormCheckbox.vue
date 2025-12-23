<template>
  <div class="form-check mb-3">
    <input
      :id="uid"
      class="form-check-input"
      type="checkbox"
      :checked="modelValue"
      :disabled="isDisabled"
      :required="isRequired"
      :name="name"
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
import { computed } from 'vue';
import { resolveBooleanish } from '@/composables/useBooleanish';
import { useUniqueId } from '@/composables/useUniqueId';
import { ariaInvalid } from '@/composables/useValidation';
import type { Booleanish, FormState } from '@/types/common';

defineOptions({ name: 'BFormCheckbox' });

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
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
  (e: 'update:modelValue', value: boolean): void;
}>();

const uid = computed(() => props.id || useUniqueId('checkbox'));
const isDisabled = computed(() => resolveBooleanish(props.disabled));
const isRequired = computed(() => resolveBooleanish(props.required));

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
};
</script>
