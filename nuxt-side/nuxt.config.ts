// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  ssr: false,
  app: {
    // pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: "blog.feproldo.ru",
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      meta: [
        {
          name: "description",
          content: "Мой веб-лог"
        },
        {
          name: "keywords",
          content: "feproldo, fepr"
        },
        { name: 'og:title', property: "og:title", content: 'Мой веблог (feproldo)' },
        { name: 'og:description', property: "og:description", content: 'Я начинающий разработчик сайтов и других приколюх' },
        { name: 'og:url', property: "og:url", content: 'https://blog.feproldo.ru' },
        { name: 'og:image', property: "og:image", content: '/public/feproldo.png' },
        { name: 'og:image:width', property: "og:image:width", content: '600' },
        { name: 'og:image:height', property: "og:image:height", content: '600' },
        { name: 'og:type', property: "og:type", content: 'website' },
        { name: 'theme-color', property: "theme-color", content: '#313636' },
      ],
      script: [
        {
          src: "/particles/particles.js",
          type: "text/javascript"
        }
      ]
    }
  },

})
