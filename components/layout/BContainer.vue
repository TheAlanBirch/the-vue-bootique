<template>
  <component :is="tag" :class="containerClass">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Breakpoint } from '@/types/common';

defineOptions({ name: 'BContainer' });

const props = withDefaults(
  defineProps<{
    fluid?: boolean | Breakpoint;
    tag?: string;
  }>(),
  {
    fluid: false,
    tag: 'div',
  },
);

const containerClass = computed(() => {
  if (props.fluid === true) return 'container-fluid';
  if (typeof props.fluid === 'string' && props.fluid) return `container-${props.fluid}`;
  return 'container';
});
</script>
