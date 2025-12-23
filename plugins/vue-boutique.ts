import { defineNuxtPlugin } from '#app';
import VueBoutique from '../index';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueBoutique);
});
