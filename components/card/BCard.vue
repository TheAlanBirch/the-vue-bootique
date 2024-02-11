<template>
  <!-- TODO: Replace all component tags with the appropriate BCard component -->
  <div class="card">
    <img v-if="imgSrc" :src="imgSrc" :alt="imgAlt" class="card-img-top" />

    <b-card-header v-if="header" :header="header" :header-tag="headerTag" />
    <b-card-header v-else-if="$slots.header">
      <slot name="header"></slot>
    </b-card-header>

    <slot v-if="noBody"></slot>
    <component v-else :is="bodyTag" class="card-body">
      <component v-if="title" :is="titleTag" class="card-title">{{
        title
      }}</component>
      <component v-if="subTitle" :is="subTitleTag" class="card-subtitle">{{
        subTitle
      }}</component>
      <slot></slot>
    </component>

    <component v-if="footer" :is="footerTag" class="card-footer">{{
      footer
    }}</component>
    <div v-else-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  header: String,
  headerTag: {
    type: String,
    default: "div",
  },
  bodyTag: {
    type: String,
    default: "div",
  },
  footer: String,
  footerTag: {
    type: String,
    default: "div",
  },
  title: String,
  titleTag: {
    type: String,
    default: "h4",
  },
  subTitle: String,
  subTitleTag: {
    type: String,
    default: "h6",
  },
  imgSrc: String,
  imgAlt: String,
  noBody: Boolean,
});
</script>

<style></style>
