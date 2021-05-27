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
    '@nuxtjs/proxy',
    '@nuxtjs/auth-next',
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
    baseURL: 'https://test.backend.trapeze.raschke.cc',
    proxyHeaders: false,
    credentials: false
    // proxy: true
  },
  /* proxy: {
    '/api/': {
      target: process.env.BASE_URL,
      pathRewrite: {
        '^/api/': '/api/'
      }
    }
  }, */
  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    },
    strategies: {
      local: {
        token: {
          property: 'token'
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'user'
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login/', method: 'post' },
          logout: { url: '/auth/logout/', method: 'get' },
          user: { url: '/users/', method: 'get' }
        }
      }
    }
    // plugins: ['@/plugins/config-url-auth.js']
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: 'https://test.backend.trapeze.raschke.cc',
      proxyHeaders: false,
      credentials: false,
      proxy: true
    },
    logo: Design.logo,
    background: Design.background,
    authApiUrl: process.env.BASE_AUTH_URL
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: 'https://test.backend.trapeze.raschke.cc',
      proxyHeaders: false,
      credentials: false,
      proxy: true
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
