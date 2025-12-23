import type { Booleanish } from '@/types/common';

export const resolveBooleanish = (value?: Booleanish): boolean => {
  if (value === '') return true;
  return value === true || value === 'true';
};
