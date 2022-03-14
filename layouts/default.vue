/* eslint-disable */
<template>
  <v-app>
    <v-app-bar clipped-left app color="primary">
      <Logo />
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
      { to: '/revokation', label: 'consent_revokation' },
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
