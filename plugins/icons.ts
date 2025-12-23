import type { App, Component } from 'vue';
import { defineComponent, h } from 'vue';
import { defineNuxtPlugin } from '#app';
import VBIcon from '~/components/icon/VBIcon.vue';
import VBIconStack from '~/components/icon/VBIconStack.vue';
import { toPascalCase } from '~/utils/icon';

const iconModules = import.meta.glob('../node_modules/bootstrap-icons/icons/*.svg');

const iconNames = Object.keys(iconModules)
  .map((path) => path.split('/').pop()?.replace('.svg', ''))
  .filter(Boolean) as string[];

const toKebabCase = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

const registerComponent = (app: App, component: Component, explicitName?: string) => {
  const name = explicitName ?? (component as { name?: string }).name;
  if (!name) return;

  app.component(name, component);

  if (name.startsWith('VB')) {
    const publicName = name.slice(1);
    app.component(publicName, component);
    app.component(toKebabCase(publicName), component);
  }
};

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp;

  if (app.config.globalProperties.__vbIconPluginLoaded) return;
  app.config.globalProperties.__vbIconPluginLoaded = true;

  registerComponent(app, VBIcon);
  registerComponent(app, VBIconStack);

  iconNames.forEach((icon) => {
    const componentName = `VBIcon${toPascalCase(icon)}`;
    if (componentName === 'VBIcon' || componentName === 'VBIconStack') return;
    registerComponent(
      app,
      defineComponent({
        name: componentName,
        setup(_, { attrs, slots }) {
          return () => h(VBIcon, { ...attrs, icon }, slots);
        },
      }),
      componentName,
    );
  });
});
