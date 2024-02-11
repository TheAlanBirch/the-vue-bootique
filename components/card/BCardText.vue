<template>
  <component :is="textTag" class="card-text">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
defineProps({
  textTag: {
    type: String,
    default: "p",
  },
});
</script>

<style></style>
