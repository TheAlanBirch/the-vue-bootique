// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/main.css"],
  components: ["~/components", "~/components/card"],
  modules: [
    "@nuxt/content",
    "@pinia/nuxt",
    ["@nuxtjs/color-mode", { colorMode: { classSuffix: "" } }],
  ],
});
