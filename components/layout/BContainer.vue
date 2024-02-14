<template>
  <component :is="tag" :class="containerClasses">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  fluid: {
    type: [Boolean, String],
    default: false,
  },
  tag: {
    type: String,
    default: 'div',
  },
});

const containerClasses = computed(() => {
  if (props.fluid) return typeof props.fluid === 'boolean' ? 'container-fluid' : `container-${props.fluid}`;
  return 'container';
});
</script>

<style></style>
