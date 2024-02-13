<template>
  <img :src="src" :class="[cardImageLocation]" :alt="alt" :height="height" :width="width" />
</template>

<script lang="ts" setup>
const props = defineProps({
  src: String,
  alt: String,
  position: String, // left, right, bottom
  width: [Number, String],
  height: [Number, String],
});

const cardImageLocation = computed(() => {
  switch (props.position) {
    case 'bottom':
      return ' card-img-bottom';
    case 'left':
      return 'img-fluid object-fit-cover h-100 rounded-start';
    case 'right':
      return 'img-fluid object-fit-cover h-100 rounded-end';
    default:
      return 'card-img-top';
  }
});
</script>

<style></style>
