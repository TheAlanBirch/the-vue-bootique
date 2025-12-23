<template>
  <article class="card">
    <VBCardImg
      v-if="imgSrc && imagePosition === 'top'"
      :src="imgSrc"
      :alt="imgAlt"
      :height="imgHeight"
      :width="imgWidth"
      position="top"
    />
    <div :class="cardClasses">
      <div v-if="isHorizontalCard" class="col-md-4">
        <VBCardImg
          v-if="imgSrc"
          :position="imagePosition"
          :src="imgSrc"
          :alt="imgAlt"
          :height="imgHeight"
          :width="imgWidth"
        ></VBCardImg>
      </div>
      <div class="col">
        <VBCardHeader v-if="header" :header="header" :header-tag="headerTag" />
        <VBCardHeader v-else-if="$slots.header" :header-tag="headerTag">
          <slot name="header"></slot>
        </VBCardHeader>

        <slot v-if="noBody"></slot>
        <VBCardBody
          v-else
          :body-tag="bodyTag"
          :sub-title="subTitle"
          :sub-title-tag="subTitleTag"
          :title="title"
          :title-tag="titleTag"
        >
          <slot></slot>
        </VBCardBody>

        <VBCardFooter v-if="footer" :footer="footer" :footer-tag="footerTag"></VBCardFooter>
        <VBCardFooter v-else-if="$slots.footer" :footer-tag="footerTag">
          <slot name="footer"></slot>
        </VBCardFooter>
      </div>
    </div>
    <VBCardImg
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
import VBCardBody from './VBCardBody.vue';
import VBCardFooter from './VBCardFooter.vue';
import VBCardHeader from './VBCardHeader.vue';
import VBCardImg from './VBCardImg.vue';
import { resolveBooleanish } from '@/composables/useBooleanish';

defineOptions({ name: 'VBCard' });

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
