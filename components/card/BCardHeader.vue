<template>
  <!-- TODO: Add variant and class props -->
  <component :is="headerTag" class="card-header">
    <slot></slot>
    <template v-if="showHeaderProp">
      {{ header }}
    </template>
  </component>
</template>

<script lang="ts" setup>
const props = defineProps({
  header: String,
  headerTag: {
    type: String,
    default: 'div',
  },
});

const slots = useSlots();

const showHeaderProp = computed(() => {
  return !slots.default?.().length && !!props.header;
});
</script>

<style></style>
