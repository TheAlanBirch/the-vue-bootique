<template>
  <component :is="tag" :class="stackClasses" :style="stackStyle" role="img">
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    size?: string | number;
    fontScale?: string | number;
    animation?: string | string[];
    variant?: string;
    gap?: string | number;
    tag?: string;
  }>(),
  {
    tag: 'span',
  },
);

const animationClasses = computed(() => {
  const animations = Array.isArray(props.animation) ? props.animation : props.animation ? [props.animation] : [];
  return animations.map((value) => `b-icon-animate-${value}`);
});

const stackClasses = computed(() => ['b-iconstack', props.variant ? `text-${props.variant}` : null, ...animationClasses.value]);

const stackStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};

  if (props.fontScale !== undefined) {
    const numeric = Number(props.fontScale);
    if (!Number.isNaN(numeric)) style.fontSize = `${numeric}em`;
  } else if (props.size !== undefined) {
    style.fontSize = typeof props.size === 'number' ? `${props.size}px` : props.size;
  }

  if (props.gap !== undefined) style.gap = typeof props.gap === 'number' ? `${props.gap}px` : props.gap;

  return style;
});
</script>
