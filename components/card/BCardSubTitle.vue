<template>
  <component :is="subTitleTag" :class="subTitleClasses">
    <slot></slot>
    <template v-if="showSubTitleProp">
      {{ subTitle }}
    </template>
  </component>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue';
import type { ColorVariant } from '@/types/common';

const props = withDefaults(
  defineProps<{
    subTitle?: string;
    subTitleTag?: string;
    subTitleTextVariant?: ColorVariant | 'muted';
  }>(),
  {
    subTitleTag: 'h4',
  },
);

const slots = useSlots();

const showSubTitleProp = computed(() => {
  return !slots.default?.().length && !!props.subTitle;
});

const subTitleClasses = computed(() => [
  'card-subtitle',
  props.subTitleTextVariant ? `text-${props.subTitleTextVariant}` : null,
]);
</script>

<style></style>
