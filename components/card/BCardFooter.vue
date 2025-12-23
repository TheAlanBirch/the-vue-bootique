<template>
  <component :is="footerTag" :class="footerClasses">
    <slot></slot>
    <template v-if="showFooterProp">
      {{ footer }}
    </template>
  </component>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue';
import type { ColorVariant } from '@/types/common';

const props = withDefaults(
  defineProps<{
    footer?: string;
    footerTag?: string;
    variant?: ColorVariant;
    footerClass?: string | string[] | Record<string, boolean>;
  }>(),
  {
    footerTag: 'div',
    footerClass: undefined,
  },
);

const slots = useSlots();

const showFooterProp = computed(() => {
  return !slots.default?.().length && !!props.footer;
});

const footerClasses = computed(() => [
  'card-footer',
  props.variant ? `bg-${props.variant}` : null,
  props.footerClass,
]);
</script>

<style></style>
