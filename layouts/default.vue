/* eslint-disable */
<template>
  <v-app>
    <v-app-bar clipped-left app color="primary">
      <div class="d-flex justify-space-between align-center flex-row" style="width: 100%">
        <Logo />
        <div class="d-flex flex-row align-center justify-center">
          <div>
            <b class="secondary--text d-none d-sm-inline d-md-inline d-lg-inline" style="margin-right: 10px;"> {{ $config.logo.slogan.toUpperCase() }} </b>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  index-v-step="5"
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
          <!--
          <v-btn color="secondary" class="ml-2" outlined @click="logout">
            Logout
          </v-btn>
          -->
        </div>
      </div>
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <PNavigation :links="links" :links-update="linksUpdate" />
          </v-col>
          <v-col cols="8">
            <nuxt />
          </v-col>
          <v-col cols="2">
            <PCompanyView />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    links: [
      { to: '/', label: 'home' },
      { to: '/consent', label: 'consent_menu' },
      { to: '/helper', label: 'consent_helper' },
      { to: '/faq', label: 'faq' }
    ],
    linksUpdate: [
      { to: '/update', label: 'policy_update' },
      { to: '/revocation', label: 'consent_revocation' },
      { to: '/request', label: 'consent_request' }
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
  }
}
</script>
<style>
.v-application {
  font-family: 'Comfortaa', sans-serif;
}
#app {
  background: var(--url) no-repeat center center fixed !important;
  background-size: cover;
}
</style>
