<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" clipped app color="accent">
      <v-list nav dense>
        <v-list-item-group v-model="group" color="primary">
          <v-list-item v-for="(link, index) in links" :key="index" :to="localePath(link.to)" exact>
            <v-list-item-icon>
              <v-icon>
                {{ link.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('links.'+link.label) }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left app color="coporate">
      <v-app-bar-nav-icon color="secondary" @click.stop="drawer = !drawer" />
      <v-spacer />
      <div class="company-wrapper">
        <Logo />
        <div class="d-flex flex-row align-center justify-center">
          <div>
            <b class="secondary--text d-none d-sm-inline d-md-inline d-lg-inline" style="margin-right: 10px;"> {{ $config.logo.slogan.toUpperCase() }} </b>

            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  outlined
                  elevation="0"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ $i18n.locale }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(locale) in availableLocales"
                  :key="locale.code"
                >
                  <nuxt-link style="text-decoration: none;" :to="switchLocalePath(locale.code)">
                    {{ locale.name }}
                  </nuxt-link>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <v-btn color="primary" class="ml-2" @click="logout">
            Logout
          </v-btn>
        </div>
      </div>
      <v-spacer />
    </v-app-bar>
    <v-main class="main">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    links: [
      { to: '/', label: 'home', icon: 'home' },
      { to: '/profile', label: 'profile', icon: 'account_circle' },
      { to: '/about', label: 'about', icon: 'business' },
      { to: '/data', label: 'data', icon: 'folder' },
      { to: '/activities', label: 'log', icon: 'toc' },
      { to: '/permissions', label: 'permissions', icon: 'gavel' }
    ],
    group: null
  }),
  computed: {
    cssVars () {
      return {
        '--url': 'url(' + this.$config.background.url + ')'
      }
    },
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>
<style>
.company-wrapper {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-flow: row nowrap;
}
#app {
  background: var(--url) no-repeat center center fixed !important;
  background-size: cover;
}
</style>
