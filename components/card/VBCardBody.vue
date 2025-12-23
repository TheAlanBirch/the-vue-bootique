<template>
  <!-- TODO: Add remaining props -->
  <div class="card-body">
    <VBCardTitle
      v-if="title"
      :title="title"
      :title-tag="titleTag"
    ></VBCardTitle>
    <VBCardSubTitle
      v-if="subTitle"
      :sub-title="subTitle"
      :sub-title-tag="subTitleTag"
    ></VBCardSubTitle>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import VBCardSubTitle from './VBCardSubTitle.vue';
import VBCardTitle from './VBCardTitle.vue';

defineOptions({ name: 'VBCardBody' });

defineProps({
  bodyTag: {
    type: String,
    default: 'div',
  },
  subTitle: String,
  subTitleTag: {
    type: String,
    default: 'h6',
  },
  title: String,
  titleTag: {
    type: String,
    default: 'h4',
  },
});
</script>

<style></style>
