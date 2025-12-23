export type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

export type Size = 'sm' | 'md' | 'lg';

export type Booleanish = boolean | 'true' | 'false' | '';

export type FormState = 'valid' | 'invalid' | null;

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface OptionItem {
  label: string;
  value: string | number | boolean;
  disabled?: boolean;
}
