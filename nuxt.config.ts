import { defineNuxtConfig } from 'nuxt/config';
import { fileURLToPath } from 'node:url';

const eslintConfigFile = fileURLToPath(new URL('./eslint.config.mjs', import.meta.url));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  components: [
    { path: '~/components', pathPrefix: false, ignore: ['**/icon/**/*'] },
    '~/components/card',
    '~/components/base',
    '~/components/feedback',
    '~/components/form',
    '~/components/navigation',
    '~/components/overlay',
    '~/components/layout',
  ],
  modules: ['@nuxt/content', '@pinia/nuxt', '@nuxtjs/color-mode', '@nuxt/test-utils/module', '@nuxtjs/eslint-module'],
  eslint: {
    overrideConfigFile: eslintConfigFile,
  },
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },
});
