<template>
  <div
    v-if="visible"
    :class="alertClasses"
    role="alert"
  >
    <div class="d-flex align-items-start gap-2">
      <div class="flex-grow-1">
        <slot />
      </div>
      <button
        v-if="isDismissible"
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="close"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { resolveBooleanish } from '@/composables/useBooleanish';
import type { Booleanish, ColorVariant } from '@/types/common';

defineOptions({ name: 'BAlert' });

const props = withDefaults(
  defineProps<{
    variant?: ColorVariant;
    dismissible?: Booleanish;
    modelValue?: boolean;
  }>(),
  {
    variant: 'primary',
    dismissible: false,
    modelValue: true,
  },
);

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'update:modelValue', value: boolean): void;
}>();

const visible = computed(() => props.modelValue);
const isDismissible = computed(() => resolveBooleanish(props.dismissible));

const alertClasses = computed(() => ({
  alert: true,
  [`alert-${props.variant}`]: true,
  'alert-dismissible': isDismissible.value,
  fade: isDismissible.value,
  show: isDismissible.value,
}));

const close = () => {
  emit('update:modelValue', false);
  emit('close');
};
</script>
