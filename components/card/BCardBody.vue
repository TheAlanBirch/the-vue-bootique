<template>
  <div class="card-body">
    <component v-if="title" :is="titleTag" class="card-title">{{
      title
    }}</component>
    <component v-if="subTitle" :is="subTitleTag" class="card-subtitle">{{
      subTitle
    }}</component>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  bodyTag: {
    type: String,
    default: "div",
  },
  subTitle: String,
  subTitleTag: {
    type: String,
    default: "h6",
  },
  title: String,
  titleTag: {
    type: String,
    default: "h4",
  },
});
</script>

<style></style>
