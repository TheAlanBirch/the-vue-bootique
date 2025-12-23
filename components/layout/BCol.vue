<template>
  <component :is="tag" :class="colClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Breakpoint } from '@/types/common';

defineOptions({ name: 'BCol' });

const breakpoints: Breakpoint[] = ['sm', 'md', 'lg', 'xl', 'xxl'];

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

  const addColClass = (value: number | string | boolean | undefined, breakpoint?: Breakpoint) => {
    if (value === undefined || value === null || value === false) return null;
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
  classes.push(baseCol ?? 'col');

  const colValues: Array<[Breakpoint, number | string | boolean | undefined]> = [
    [breakpoints[0], props.sm],
    [breakpoints[1], props.md],
    [breakpoints[2], props.lg],
    [breakpoints[3], props.xl],
    [breakpoints[4], props.xxl],
  ];

  colValues.forEach(([breakpoint, value]) => {
    const colClass = addColClass(value, breakpoint);
    if (colClass) classes.push(colClass);
  });

  addOffsetClass(props.offset);
  addOffsetClass(props.offsetSm, breakpoints[0]);
  addOffsetClass(props.offsetMd, breakpoints[1]);
  addOffsetClass(props.offsetLg, breakpoints[2]);
  addOffsetClass(props.offsetXl, breakpoints[3]);
  addOffsetClass(props.offsetXxl, breakpoints[4]);

  addOrderClass(props.order);
  addOrderClass(props.orderSm, breakpoints[0]);
  addOrderClass(props.orderMd, breakpoints[1]);
  addOrderClass(props.orderLg, breakpoints[2]);
  addOrderClass(props.orderXl, breakpoints[3]);
  addOrderClass(props.orderXxl, breakpoints[4]);

  if (props.alignSelf) classes.push(`align-self-${props.alignSelf}`);

  return classes;
});
</script>
