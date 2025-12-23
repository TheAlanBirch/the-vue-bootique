<template>
  <nav :class="navbarClasses" role="navigation">
    <div class="container-fluid">
      <slot name="brand">
        <a v-if="brand" class="navbar-brand" href="#">{{ brand }}</a>
      </slot>
      <button
        class="navbar-toggler"
        type="button"
        :aria-expanded="isOpen"
        aria-label="Toggle navigation"
        @click="toggle"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div :class="['collapse navbar-collapse', { show: isOpen }]">
        <slot />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ColorVariant } from '@/types/common';

defineOptions({ name: 'BNavbar' });

const props = withDefaults(
  defineProps<{
    brand?: string;
    background?: ColorVariant | 'transparent';
    variant?: 'light' | 'dark';
    expand?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | boolean;
  }>(),
  {
    brand: '',
    background: 'light',
    variant: 'light',
    expand: 'lg',
  },
);

const emit = defineEmits<{
  (e: 'toggle', value: boolean): void;
}>();

const isOpen = ref(false);

const navbarClasses = computed(() => [
  'navbar',
  `navbar-${props.variant}`,
  props.background !== 'transparent' ? `bg-${props.background}` : null,
  props.expand === true ? 'navbar-expand' : props.expand ? `navbar-expand-${props.expand}` : null,
]);

const toggle = () => {
  isOpen.value = !isOpen.value;
  emit('toggle', isOpen.value);
};
</script>
