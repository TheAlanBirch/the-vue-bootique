<template>
  <component :is="headerTag" :class="headerClasses">
    <slot></slot>
    <template v-if="showHeaderProp">
      {{ header }}
    </template>
  </component>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue';
import type { ColorVariant } from '@/types/common';

const props = withDefaults(
  defineProps<{
    header?: string;
    headerTag?: string;
    variant?: ColorVariant;
    headerClass?: string | string[] | Record<string, boolean>;
  }>(),
  {
    headerTag: 'div',
    headerClass: undefined,
  },
);

const slots = useSlots();

const showHeaderProp = computed(() => {
  return !slots.default?.().length && !!props.header;
});

const headerClasses = computed(() => [
  'card-header',
  props.variant ? `bg-${props.variant}` : null,
  props.headerClass,
]);
</script>

<style></style>
