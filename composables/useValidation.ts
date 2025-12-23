import type { FormState } from '@/types/common';

export const validationClass = (state?: FormState): string => {
  if (state === 'valid') return 'is-valid';
  if (state === 'invalid') return 'is-invalid';
  return '';
};

export const ariaInvalid = (state?: FormState): boolean | undefined => {
  if (state === 'invalid') return true;
  return undefined;
};
