<template>
  <component :is="tag" :class="containerClasses">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useContainerProps } from '~/composables/layout/bContainerProps';

const props = defineProps(useContainerProps());

const containerClasses = computed(() => {
  if (props.fluid) return typeof props.fluid === 'boolean' ? 'container-fluid' : `container-${props.fluid}`;
  return 'container';
});
</script>

<style></style>
