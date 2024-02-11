<template>
  <!-- TODO: Add sub-title-text-variant prop -->
  <component :is="subTitleTag" class="card-subtitle">
    <slot></slot>
    <template v-if="showSubTitleProp">
      {{ subTitle }}
    </template>
  </component>
</template>

<script lang="ts" setup>
const props = defineProps({
  subTitle: String,
  subTitleTag: {
    type: String,
    default: "h4",
  },
});

const slots = ref(useSlots());

const showSubTitleProp = computed(() => {
  return !slots.value.default?.().length && !!props.subTitle;
});
</script>

<style></style>
