<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="isDisabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { resolveBooleanish } from '@/composables/useBooleanish';
import type { Booleanish, ColorVariant, Size } from '@/types/common';

defineOptions({ name: 'BButton' });

const props = withDefaults(
  defineProps<{
    variant?: ColorVariant;
    size?: Size;
    outline?: boolean;
    disabled?: Booleanish;
    block?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }>(),
  {
    variant: 'primary',
    size: 'md',
    outline: false,
    disabled: false,
    block: false,
    type: 'button',
  },
);

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const isDisabled = computed(() => resolveBooleanish(props.disabled));

const buttonClasses = computed(() => [
  'btn',
  props.outline ? `btn-outline-${props.variant}` : `btn-${props.variant}`,
  props.size !== 'md' ? `btn-${props.size}` : null,
  props.block ? 'w-100' : null,
]);

const onClick = (event: MouseEvent) => {
  if (isDisabled.value) {
    event.preventDefault();
    return;
  }
  emit('click', event);
};
</script>
