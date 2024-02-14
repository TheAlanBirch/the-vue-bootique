<template>
  <component :is="tag" class="list-group" :class="componentClasses">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
const props = defineProps({
  flush: {
    type: Boolean,
    default: false,
  },
  horizontal: {
    type: [Boolean, String],
    default: false,
  },
  numbered: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String,
    default: 'div',
  },
});

const componentClasses = listGroupClasses(props);
</script>

<style></style>
