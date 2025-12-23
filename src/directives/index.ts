import type { App } from 'vue';
import { vFocus } from './focus';
import { vPopover } from './popover';
import { vScrollspy } from './scrollspy';
import { vToggle } from './toggle';
import { vTooltip } from './tooltip';

export { vFocus, vPopover, vScrollspy, vToggle, vTooltip };

export const registerDirectives = (app: App): void => {
  app.directive('focus', vFocus);
  app.directive('popover', vPopover);
  app.directive('scrollspy', vScrollspy);
  app.directive('toggle', vToggle);
  app.directive('tooltip', vTooltip);
};
