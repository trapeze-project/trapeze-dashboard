/* eslint-disable eqeqeq */
// eslint-disable-next-line nuxt/no-cjs-in-config
const Design = require('./design.config.json')

export default {
  ssr: false,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: 'Privacy Dashboard | TRAPEZE',
    title: 'Privacy Dashboard | TRAPEZE',
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
    {src:'~/plugins/global.js',srr: false},
    {src:'~/store/index.js',srr: false}
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
    credentials: false,
  },
  
  auth: {
    strategies: {
      local: false,
      keycloak: {
        scheme: "oauth2",
        endpoints: {
          authorization:
            "https://trapeze.imp.bg.ac.rs/auth/realms/trapeze/protocol/openid-connect/auth",
          token:
            "https://trapeze.imp.bg.ac.rs/auth/realms/trapeze/protocol/openid-connect/token",
          userInfo:
            "https://trapeze.imp.bg.ac.rs/auth/realms/trapeze/protocol/openid-connect/userinfo",
          logout:
            "https://trapeze.imp.bg.ac.rs/auth/realms/trapeze/protocol/openid-connect/logout" +
            "?redirect_uri=" + encodeURIComponent("http://localhost:3000/"), // TODO: redirect URL needs to be updated
        },
        token: {
          property: "access_token",
          type: "Bearer",
          name: "Authorization",
          maxAge: 300,
        },
        refreshToken: {
          property: "refresh_token",
          maxAge: 60 * 60 * 24 * 30,
        },
        responseType: "code",
        grantType: "password",
        clientId: "trapeze-dashboard",
        scope: ["openid"],
        codeChallengeMethod: "S256",
      },
    },
    redirect: {
      login: "/home",
      logout: "/home",
      home: "/home",
    },
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
  },
  env:{
    READ_POLICY: process.env.READ_POLICY,
    CREAETE_POLICY: process.env.CREAETE_POLICY,
    UPDATE_POLICY: process.env.UPDATE_POLICY,
    KNOWLEDGE_BASE: process.env.KNOWLEDGE_BASE
  }
  
}
