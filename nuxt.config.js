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
          },
          {
            code: 'de',
            name: 'German',
            file: 'de-DE.json'
          },
          {
            code: 'it',
            name: 'Italian',
            file: 'it-IT.json'
          },
          {
            code: 'fr',
            name: 'French',
            file: 'fr-FR.json'
          }
        ],
        detectBrowserLanguage: {
          useCookie: true,
          alwaysRedirect: true
        }
      }
    ]
  ],
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'http://localhost:3000'
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    },
    logo: Design.logo,
    background: Design.background
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: Design.theme.light
      }
    }
  },
  loading: {
    color: Design.theme.light.primary,
    height: '3px'
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
  watch: ['design'],
  server: {
    host: '0.0.0.0'
  }
}
