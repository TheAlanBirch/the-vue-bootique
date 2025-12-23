import { defineComponent, h } from 'vue';
import { defineNuxtPlugin } from '#app';
import BIcon from '~/components/icon/BIcon.vue';
import BIconStack from '~/components/icon/BIconStack.vue';
import { toPascalCase } from '~/utils/icon';

const iconModules = import.meta.glob('../node_modules/bootstrap-icons/icons/*.svg');

const iconNames = Object.keys(iconModules)
  .map((path) => path.split('/').pop()?.replace('.svg', ''))
  .filter(Boolean) as string[];

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp;

  if (app.config.globalProperties.__bIconPluginLoaded) return;
  app.config.globalProperties.__bIconPluginLoaded = true;

  if (!app.component('BIcon')) app.component('BIcon', BIcon);
  if (!app.component('BIconStack')) app.component('BIconStack', BIconStack);

  iconNames.forEach((icon) => {
    const componentName = `BIcon${toPascalCase(icon)}`;
    if (componentName === 'BIcon' || componentName === 'BIconStack') return;
    app.component(
      componentName,
      defineComponent({
        name: componentName,
        setup(_, { attrs, slots }) {
          return () => h(BIcon, { ...attrs, icon }, slots);
        },
      }),
    );
  });
});
