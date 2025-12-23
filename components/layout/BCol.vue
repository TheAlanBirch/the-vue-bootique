<template>
  <component :is="tag" :class="colClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Breakpoint } from '@/types/common';

defineOptions({ name: 'BCol' });

const props = withDefaults(
  defineProps<{
    tag?: string;
    cols?: number | string | boolean;
    sm?: number | string | boolean;
    md?: number | string | boolean;
    lg?: number | string | boolean;
    xl?: number | string | boolean;
    xxl?: number | string | boolean;
    offset?: number | string;
    offsetSm?: number | string;
    offsetMd?: number | string;
    offsetLg?: number | string;
    offsetXl?: number | string;
    offsetXxl?: number | string;
    order?: number | string | 'first' | 'last';
    orderSm?: number | string | 'first' | 'last';
    orderMd?: number | string | 'first' | 'last';
    orderLg?: number | string | 'first' | 'last';
    orderXl?: number | string | 'first' | 'last';
    orderXxl?: number | string | 'first' | 'last';
    alignSelf?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  }>(),
  {
    tag: 'div',
  },
);

const colClasses = computed(() => {
  const classes: string[] = [];

  const addColClass = (
    value: number | string | boolean | undefined,
    breakpoint?: Breakpoint,
  ): string | null => {
    if (value === undefined || value === null || value === false || value === '') return null;
    const prefix = breakpoint ? `col-${breakpoint}` : 'col';
    if (value === true) return prefix;
    if (value === 'auto') return `${prefix}-auto`;
    return `${prefix}-${value}`;
  };

  const addOffsetClass = (value: number | string | undefined, breakpoint?: Breakpoint) => {
    if (value === undefined || value === null || value === '') return;
    const infix = breakpoint ? `${breakpoint}-` : '';
    classes.push(`offset-${infix}${value}`);
  };

  const addOrderClass = (
    value: number | string | 'first' | 'last' | undefined,
    breakpoint?: Breakpoint,
  ) => {
    if (value === undefined || value === null || value === '') return;
    const infix = breakpoint ? `${breakpoint}-` : '';
    classes.push(`order-${infix}${value}`);
  };

  const baseCol = addColClass(props.cols);
  if (baseCol) {
    classes.push(baseCol);
  } else if (props.cols === undefined || props.cols === null) {
    classes.push('col');
  }

  const colSm = addColClass(props.sm, 'sm');
  const colMd = addColClass(props.md, 'md');
  const colLg = addColClass(props.lg, 'lg');
  const colXl = addColClass(props.xl, 'xl');
  const colXxl = addColClass(props.xxl, 'xxl');

  [colSm, colMd, colLg, colXl, colXxl].forEach((colClass) => {
    if (colClass) classes.push(colClass);
  });

  addOffsetClass(props.offset);
  addOffsetClass(props.offsetSm, 'sm');
  addOffsetClass(props.offsetMd, 'md');
  addOffsetClass(props.offsetLg, 'lg');
  addOffsetClass(props.offsetXl, 'xl');
  addOffsetClass(props.offsetXxl, 'xxl');

  addOrderClass(props.order);
  addOrderClass(props.orderSm, 'sm');
  addOrderClass(props.orderMd, 'md');
  addOrderClass(props.orderLg, 'lg');
  addOrderClass(props.orderXl, 'xl');
  addOrderClass(props.orderXxl, 'xxl');

  if (props.alignSelf) classes.push(`align-self-${props.alignSelf}`);

  return classes;
});
</script>
