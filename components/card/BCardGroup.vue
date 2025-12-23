<template>
  <component :is="tag" :class="groupClasses" :style="gridStyles">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { resolveBooleanish } from '@/composables/useBooleanish';
import type { Booleanish } from '@/types/common';

const props = withDefaults(
  defineProps<{
    tag?: string;
    grid?: Booleanish;
    maxColumns?: number;
    maxRows?: number;
    gap?: number;
  }>(),
  {
    tag: 'div',
    grid: false,
    gap: 3,
  },
);

const groupClasses = computed(() => [
  'card-group',
  resolveBooleanish(props.grid) ? 'd-grid' : null,
  resolveBooleanish(props.grid) && props.gap !== undefined ? `gap-${props.gap}` : null,
]);

const gridStyles = computed(() => {
  if (!resolveBooleanish(props.grid)) return undefined;
  const styles: Record<string, string> = {};
  if (props.maxColumns) {
    styles.gridTemplateColumns = `repeat(${props.maxColumns}, minmax(0, 1fr))`;
  }
  if (props.maxRows) {
    styles.gridTemplateRows = `repeat(${props.maxRows}, minmax(0, 1fr))`;
  }
  return styles;
});
</script>

<style></style>
