<template>
  <component :is="bodyTag" :class="bodyClasses">
    <b-card-title
      v-if="title"
      :title="title"
      :title-tag="titleTag"
    ></b-card-title>
    <b-card-sub-title
      v-if="subTitle"
      :sub-title="subTitle"
      :sub-title-tag="subTitleTag"
      :sub-title-text-variant="subTitleTextVariant"
    ></b-card-sub-title>
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { ColorVariant } from '@/types/common';
import BCardSubTitle from './BCardSubTitle.vue';
import BCardTitle from './BCardTitle.vue';

const props = withDefaults(
  defineProps<{
    bodyTag?: string;
    bodyClass?: string | string[] | Record<string, boolean>;
    subTitle?: string;
    subTitleTag?: string;
    subTitleTextVariant?: ColorVariant | 'muted';
    title?: string;
    titleTag?: string;
  }>(),
  {
    bodyTag: 'div',
    subTitleTag: 'h6',
    titleTag: 'h4',
  },
);

const bodyClasses = computed(() => ['card-body', props.bodyClass]);
</script>

<style></style>
