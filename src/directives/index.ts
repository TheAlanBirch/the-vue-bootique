import type { App } from 'vue';
import { vFocus } from './focus';
import { vTooltip } from './tooltip';

export { vFocus, vTooltip };

export const registerDirectives = (app: App): void => {
  app.directive('focus', vFocus);
  app.directive('tooltip', vTooltip);
};
