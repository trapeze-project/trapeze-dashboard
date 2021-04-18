// eslint-disable-next-line nuxt/no-cjs-in-config
const Design = require('./design/design.config.json')
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - dashboardvuetfy',
    title: 'dashboardvuetfy',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],
  serverMiddleware: [
    '~/api/index.js'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/materialicons.js',
    '~/plugins/company-view.js',
    '~/plugins/link-preview.client.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-leaflet',
    ['nuxt-i18n',
      {
        lazy: true,
        langDir: 'lang/',
        locales: [
          {
            code: 'en',
            name: 'English',
            file: 'en-US.json'
          }
        ]
      }
    ]
  ],
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: Design.theme.light
      }
    }
  },
  publicRuntimeConfig: {
    logo: Design.logo
  },
  loading: {
    color: Design.theme.light.primary,
    height: '3px'
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
