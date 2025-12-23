import { defineComponent, h } from 'vue';
import { defineNuxtPlugin } from '#app';
import BIcon from '~/components/icon/BIcon.vue';

const iconModules = import.meta.glob('../node_modules/bootstrap-icons/icons/*.svg');

const iconNames = Object.keys(iconModules)
  .map((path) => path.split('/').pop()?.replace('.svg', ''))
  .filter(Boolean) as string[];

const toPascalCase = (value: string) =>
  value
    .split(/[-_]/)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp;

  iconNames.forEach((icon) => {
    const componentName = `BIcon${toPascalCase(icon)}`;
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
