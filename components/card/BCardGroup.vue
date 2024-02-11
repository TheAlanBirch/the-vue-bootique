<template>
  <component :is="tag" class="card-group">
    <slot></slot>
  </component>
</template>
<!-- TODO: Add grid view as an option, will need to add num-max-columns and num-max-rows -->
<script lang="ts" setup>
defineProps({
  tag: {
    type: String,
    default: 'div',
  },
});
</script>

<style></style>
