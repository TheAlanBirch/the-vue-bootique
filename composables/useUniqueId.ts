import { useId } from 'vue';

let uniqueIdCounter = 0;

export const useUniqueId = (prefix = 'uid'): string => {
  const vueId = typeof useId === 'function' ? useId() : null;
  if (vueId) return vueId;
  uniqueIdCounter += 1;
  return `${prefix}-${uniqueIdCounter}`;
};
