<template>
  <component
    :is="tag"
    :class="wrapperClasses"
    :style="wrapperStyle"
    role="img"
    :aria-label="ariaLabel || iconName || undefined"
  >
    <i :class="iconClasses" aria-hidden="true"></i>
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { computed, getCurrentInstance } from 'vue';

defineOptions({ name: 'VBIcon' });

const parseNumber = (value?: string | number) => {
  const numeric = Number(value);
  return Number.isNaN(numeric) ? null : numeric;
};

const props = withDefaults(
  defineProps<{
    icon?: string;
    variant?: string;
    size?: string | number;
    fontScale?: string | number;
    animation?: string | string[];
    rotate?: string | number;
    scale?: string | number;
    flipH?: boolean;
    flipV?: boolean;
    stacked?: boolean;
    stackedOrder?: string | number;
    shiftH?: string | number;
    shiftV?: string | number;
    transform?: string;
    ariaLabel?: string;
    tag?: string;
  }>(),
  {
    stacked: false,
    tag: 'span',
  },
);

const instance = getCurrentInstance();

const iconName = computed(() => {
  if (props.icon) return props.icon;
  const rawName = instance?.type?.name?.replace(/^VBIcon/, '') ?? '';
  if (!rawName) return '';
  return rawName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .replace(/^-/, '')
    .toLowerCase();
});

const variantClass = computed(() => (props.variant ? `text-${props.variant}` : null));

const animationClasses = computed(() => {
  const animations = Array.isArray(props.animation) ? props.animation : props.animation ? [props.animation] : [];
  return animations.map((value) => `b-icon-animate-${value}`);
});

const iconClasses = computed(() => [
  'bi',
  iconName.value ? `bi-${iconName.value}` : null,
  ...animationClasses.value,
]);

const wrapperClasses = computed(() => [
  'b-icon',
  variantClass.value,
  props.stacked ? 'b-icon-stacked' : null,
]);

const fontSize = computed(() => {
  const sizeMap: Record<string, string> = {
    sm: '0.875em',
    md: '1em',
    lg: '1.25em',
    xl: '1.5em',
    xxl: '2em',
  };

  const fontScale = parseNumber(props.fontScale);
  if (fontScale !== null) return `${fontScale}em`;

  if (props.size !== undefined) {
    if (typeof props.size === 'number') return `${props.size}px`;
    if (sizeMap[props.size]) return sizeMap[props.size];
    if (/[\d.](px|rem|em|%)$/i.test(props.size)) return props.size;
    const numeric = parseNumber(props.size);
    if (numeric !== null) return `${numeric}px`;
  }

  return undefined;
});

const transformValue = computed(() => {
  const transforms: string[] = [];

  if (props.stacked) transforms.push('translate(-50%, -50%)');
  const shiftH = parseNumber(props.shiftH);
  const shiftV = parseNumber(props.shiftV);
  const rotation = parseNumber(props.rotate);
  const scale = parseNumber(props.scale);
  const zIndex = parseNumber(props.stackedOrder);

  if (shiftH !== null) transforms.push(`translateX(${shiftH}em)`);
  if (shiftV !== null) transforms.push(`translateY(${shiftV}em)`);
  if (rotation !== null) transforms.push(`rotate(${rotation}deg)`);
  if (props.flipH) transforms.push('scaleX(-1)');
  if (props.flipV) transforms.push('scaleY(-1)');
  if (scale !== null) transforms.push(`scale(${scale})`);
  if (props.transform) transforms.push(props.transform);

  return { transform: transforms.length ? transforms.join(' ') : undefined, zIndex };
});

const wrapperStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  if (fontSize.value) style.fontSize = fontSize.value;
  if (transformValue.value.transform) style.transform = transformValue.value.transform;
  if (props.stacked && transformValue.value.zIndex !== null) style.zIndex = transformValue.value.zIndex ?? undefined;
  return style;
});
</script>
