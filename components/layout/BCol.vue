<template>
  <component :is="tag" :class="componentClasses">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
const props = defineProps(useBColProps());

const componentClasses = computed(() => {
  if (props.col) return 'col';
});
</script>

<style></style>
