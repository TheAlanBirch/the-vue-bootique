<template>
  <!-- TODO: Add remaining props -->
  <div class="card-body">
    <b-card-title
      v-if="title"
      :title="title"
      :title-tag="titleTag"
    ></b-card-title>
    <b-card-sub-title
      v-if="subTitle"
      :sub-title="subTitle"
      :sub-title-tag="subTitleTag"
    ></b-card-sub-title>
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
