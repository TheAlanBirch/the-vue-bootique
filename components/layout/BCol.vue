<template>
  <component :is="tag" class="col">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
defineProps(useBColProps());
</script>

<style></style>
