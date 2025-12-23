<template>
  <component :is="tag" :class="rowClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { resolveBooleanish } from '@/composables/useBooleanish';
import type { Booleanish, Breakpoint } from '@/types/common';

defineOptions({ name: 'BRow' });

const breakpoints: Breakpoint[] = ['sm', 'md', 'lg', 'xl', 'xxl'];

const props = withDefaults(
  defineProps<{
    tag?: string;
    cols?: number | string;
    colsSm?: number | string;
    colsMd?: number | string;
    colsLg?: number | string;
    colsXl?: number | string;
    colsXxl?: number | string;
    gutters?: number | string;
    noGutters?: Booleanish;
    align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  }>(),
  {
    tag: 'div',
    noGutters: false,
  },
);

const rowClasses = computed(() => {
  const classes = ['row'];

  const addColsClass = (value?: number | string, breakpoint?: Breakpoint) => {
    if (value === undefined || value === null || value === '') return;
    const infix = breakpoint ? `${breakpoint}-` : '';
    classes.push(`row-cols-${infix}${value}`);
  };

  addColsClass(props.cols);
  addColsClass(props.colsSm, breakpoints[0]);
  addColsClass(props.colsMd, breakpoints[1]);
  addColsClass(props.colsLg, breakpoints[2]);
  addColsClass(props.colsXl, breakpoints[3]);
  addColsClass(props.colsXxl, breakpoints[4]);

  if (resolveBooleanish(props.noGutters)) {
    classes.push('g-0');
  } else if (props.gutters !== undefined && props.gutters !== null && props.gutters !== '') {
    classes.push(`g-${props.gutters}`);
  }

  if (props.align) classes.push(`align-items-${props.align}`);
  if (props.justify) classes.push(`justify-content-${props.justify}`);

  return classes;
});
</script>
