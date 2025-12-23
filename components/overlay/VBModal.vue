<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="modal fade show d-block"
      tabindex="-1"
      role="dialog"
      :aria-modal="true"
      :aria-labelledby="labelId"
      @click="onBackdrop"
    >
      <div class="modal-dialog" :class="dialogClasses" @click.stop>
        <div class="modal-content">
          <header class="modal-header">
            <slot name="header">
              <h5 :id="labelId" class="modal-title">{{ title }}</h5>
            </slot>
            <button type="button" class="btn-close" aria-label="Close" @click="close" />
          </header>
          <section class="modal-body">
            <slot />
          </section>
          <footer class="modal-footer">
            <slot name="footer">
              <button type="button" class="btn btn-secondary" @click="close">Close</button>
            </slot>
          </footer>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue';
import type { Size } from '@/types/common';
import { useUniqueId } from '@/composables/useUniqueId';

defineOptions({ name: 'VBModal' });

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title?: string;
    size?: Size | 'xl';
    centered?: boolean;
    scrollable?: boolean;
  }>(),
  {
    title: '',
    size: 'md',
    centered: false,
    scrollable: false,
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'open' | 'close'): void;
}>();

const id = useUniqueId('b-modal');
const labelId = `${id}-label`;

const isOpen = computed(() => props.modelValue);

const dialogClasses = computed(() => ({
  [`modal-${props.size}`]: props.size && props.size !== 'md',
  'modal-dialog-centered': props.centered,
  'modal-dialog-scrollable': props.scrollable,
}));

const close = () => emit('update:modelValue', false);

const onBackdrop = (event: MouseEvent) => {
  if (event.target === event.currentTarget) close();
};

const onEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpen.value) {
    close();
  }
};

watch(
  () => props.modelValue,
  (value, oldValue) => {
    if (value && !oldValue) emit('open');
    if (!value && oldValue) emit('close');
  },
);

onMounted(() => {
  window.addEventListener('keydown', onEscape);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onEscape);
});
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
