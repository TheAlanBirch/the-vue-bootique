<template>
  <!-- TODO: Add variant and class props -->
  <component :is="footerTag" class="card-footer">
    <slot></slot>
    <template v-if="showFooterProp">
      {{ footer }}
    </template>
  </component>
</template>

<script lang="ts" setup>
const props = defineProps({
  footer: String,
  footerTag: {
    type: String,
    default: 'div',
  },
});

const slots = useSlots();

const showFooterProp = computed(() => {
  return !slots.default?.().length && !!props.footer;
});
</script>

<style></style>
