<template>
  <!-- TODO: Add remaining props -->
  <div class="card">
    <div :class="cardClasses">
      <div :class="{ 'col-md-4 ': isHorizontalCard, col: !isHorizontalCard }">
        <b-card-img
          v-if="imgSrc"
          :position="imagePosition"
          :src="imgSrc"
          :alt="imgAlt"
          :height="imgHeight"
          :width="imgWidth"
        ></b-card-img>
      </div>
      <div class="col">
        <b-card-header v-if="header" :header="header" :header-tag="headerTag" />
        <b-card-header v-else-if="$slots.header" :header-tag="headerTag">
          <slot name="header"></slot>
        </b-card-header>

        <slot v-if="noBody"></slot>
        <b-card-body
          v-else
          :body-tag="bodyTag"
          :sub-title="subTitle"
          :sub-title-tag="subTitleTag"
          :title="title"
          :title-tag="titleTag"
        >
          <slot></slot>
        </b-card-body>

        <b-card-footer v-if="footer" :footer="footer" :footer-tag="footerTag"></b-card-footer>
        <b-card-footer v-else-if="$slots.footer" :footer-tag="footerTag">
          <slot name="footer"></slot>
        </b-card-footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  header: String,
  headerTag: {
    type: String,
    default: 'div',
  },
  bodyTag: {
    type: String,
    default: 'div',
  },
  footer: String,
  footerTag: {
    type: String,
    default: 'div',
  },
  title: String,
  titleTag: {
    type: String,
    default: 'h4',
  },
  subTitle: String,
  subTitleTag: {
    type: String,
    default: 'h6',
  },
  imgSrc: String,
  imgAlt: String,
  imgTop: {
    type: Boolean,
    default: false,
  },
  imgBottom: {
    type: Boolean,
    default: false,
  },
  imgLeft: {
    type: Boolean,
    default: false,
  },
  imgRight: {
    type: Boolean,
    default: false,
  },
  imgWidth: [Number, String],
  imgHeight: [Number, String],
  noBody: Boolean,
});

const isHorizontalCard = computed(() => {
  return !!props.imgLeft || !!props.imgRight;
});

const imagePosition = computed(() => {
  if (props.imgBottom) return 'bottom';
  if (props.imgLeft) return 'left';
  if (props.imgRight) return 'right';
  return 'top';
});

const cardClasses = computed(() => ({
  'row g-0': true,
  'flex-column': !isHorizontalCard.value,
  'flex-row-reverse': props.imgRight,
  'flex-column-reverse': props.imgBottom,
}));
</script>

<style></style>
