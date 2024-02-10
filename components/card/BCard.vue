<script lang="ts" setup>
defineProps({
  header: String,
  footer: String,
  title: String,
  imgSrc: String,
  imgAlt: String,
  noBody: Boolean,
});
</script>

<template>
  <div class="card">
    <img v-if="imgSrc" :src="imgSrc" :alt="imgAlt" class="card-img-top" />

    <div v-if="header" class="card-header">{{ header }}</div>
    <div v-else-if="$slots.header">
      <slot name="header"></slot>
    </div>

    <slot v-if="noBody"></slot>
    <div v-else class="card-body">
      <h5 v-if="title" class="card-title">{{ title }}</h5>
      <slot></slot>
    </div>

    <div v-if="footer" class="card-footer">{{ footer }}</div>
    <div v-else-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style></style>
