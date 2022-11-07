/* eslint-disable eqeqeq */
// eslint-disable-next-line nuxt/no-cjs-in-config
const Design = require('./design.config.json')
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: 'Privacy Dashboard : TRAPEZE',
    title: 'Privacy Dashboard : TRAPEZE',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/main',
    '~/assets/css/variables.scss'
  ],
  serverMiddleware: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: [
    {
      path: '~/components', // will get any components nested in let's say /components/test too
      pathPrefix: false
    }
  ],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth-next',
    ['@nuxtjs/i18n',
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
          alwaysRedirect: true,
          onlyOnRoot: true
        }
      }
    ]
  ],
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.BASE_URL,
    proxyHeaders: false,
    credentials: false
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    },
    strategies: {
      cookie: {
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: process.env.AUTH_URL + '/auth/login/', method: 'post', withCredentials: true },
          logout: { url: process.env.AUTH_URL + '/auth/logout/', method: 'get', withCredentials: true },
          user: { url: process.env.AUTH_URL + '/users/me/', method: 'get', withCredentials: true }
        }
      }
    }
  },
  publicRuntimeConfig: {
    logo: Design.logo,
    background: Design.background,
    authApiUrl: process.env.AUTH_URL,
    baseURL: process.env.BASE_URL
  },
  vuetify: {
    // customVariables: ['~/assets'],
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
    extractCSS: true
  },
  watch: ['design'],
  server: {
    host: process.env.HOST,
    port: process.env.PORT
  }
}
