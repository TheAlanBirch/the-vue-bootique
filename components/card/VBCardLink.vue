<template>
  <a class="card-link" :href="href">
    <slot></slot>
  </a>
</template>

<script lang="ts" setup>
defineOptions({ name: 'VBCardLink' });

defineProps({
  href: String,
});
</script>

<style></style>
