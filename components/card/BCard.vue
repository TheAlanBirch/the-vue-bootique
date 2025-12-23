<template>
  <article class="card">
    <b-card-img
      v-if="imgSrc && imagePosition === 'top'"
      :src="imgSrc"
      :alt="imgAlt"
      :height="imgHeight"
      :width="imgWidth"
      position="top"
    />
    <div :class="cardClasses">
      <div v-if="isHorizontalCard" class="col-md-4">
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
    <b-card-img
      v-if="imgSrc && imagePosition === 'bottom'"
      :src="imgSrc"
      :alt="imgAlt"
      :height="imgHeight"
      :width="imgWidth"
      position="bottom"
    />
  </article>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import BCardBody from './BCardBody.vue';
import BCardFooter from './BCardFooter.vue';
import BCardHeader from './BCardHeader.vue';
import BCardImg from './BCardImg.vue';
import { resolveBooleanish } from '@/composables/useBooleanish';

defineOptions({ name: 'BCard' });

const props = withDefaults(
  defineProps<{
    header?: string;
    headerTag?: string;
    bodyTag?: string;
    footer?: string;
    footerTag?: string;
    title?: string;
    titleTag?: string;
    subTitle?: string;
    subTitleTag?: string;
    imgSrc?: string;
    imgAlt?: string;
    imgTop?: boolean;
    imgBottom?: boolean;
    imgLeft?: boolean;
    imgRight?: boolean;
    imgWidth?: number | string;
    imgHeight?: number | string;
    noBody?: boolean;
  }>(),
  {
    headerTag: 'div',
    bodyTag: 'div',
    footerTag: 'div',
    titleTag: 'h4',
    subTitleTag: 'h6',
    imgTop: false,
    imgBottom: false,
    imgLeft: false,
    imgRight: false,
    noBody: false,
  },
);

const isHorizontalCard = computed(() => {
  return !!props.imgLeft || !!props.imgRight;
});

const imagePosition = computed<'top' | 'bottom' | 'left' | 'right'>(() => {
  const flags = [props.imgTop, props.imgBottom, props.imgLeft, props.imgRight].filter(Boolean).length;
  if (flags > 1) {
    // Prefer a deterministic priority when multiple positions are set
  }
  if (props.imgBottom) return 'bottom';
  if (props.imgLeft) return 'left';
  if (props.imgRight) return 'right';
  if (props.imgTop) return 'top';
  return 'top';
});

const cardClasses = computed(() => ({
  row: isHorizontalCard.value,
  'g-0': isHorizontalCard.value,
  'flex-row-reverse': props.imgRight,
  'align-items-center': isHorizontalCard.value,
}));

const noBody = computed(() => resolveBooleanish(props.noBody));
</script>
