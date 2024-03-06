<template>
  <component :is="tag" class="row">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
defineProps(useBRowProps());
</script>

<style></style>
