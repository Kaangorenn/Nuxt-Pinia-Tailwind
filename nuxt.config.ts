// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: {
    enabled: true
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/fonts',
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss(),],
  },
  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm',
      include: undefined,
      exclude: ['*'],
      saveRedirectToCookie: false,
    }
  }
})