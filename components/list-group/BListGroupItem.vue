<template>
  <component :is="listGroupItemTag" v-bind="listGroupItemProps" class="list-group-item" :class="listGroupItemClasses">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
// TODO: Make variant prop work
const props = defineProps({
  action: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  button: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  href: String,
  tag: {
    type: String,
    default: 'div',
  },
  target: {
    type: String,
    default: '_self',
  },
  variant: String,
});

const { listGroupItemClasses, listGroupItemTag, listGroupItemProps } = listGroupItemComputeds(props);
</script>

<style></style>
