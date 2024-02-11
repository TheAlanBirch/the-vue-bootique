import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  components: ['~/components'],
  modules: [
    '@nuxt/content',
    '@pinia/nuxt',
    ['@nuxtjs/color-mode', { colorMode: { classSuffix: '' } }],
    '@nuxt/test-utils/module',
    '@nuxtjs/eslint-module',
  ],
});
