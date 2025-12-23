<template>
  <component :is="titleTag" class="card-title">
    <slot></slot>
    <template v-if="showTitleProp">
      {{ title }}
    </template>
  </component>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue';

const props = defineProps({
  title: String,
  titleTag: {
    type: String,
    default: 'h4',
  },
});

const slots = useSlots();

const showTitleProp = computed(() => {
  return !slots.default?.().length && !!props.title;
});
</script>

<style></style>
