/* eslint-disable */
<template>
  <v-app>
    <v-row>
      <v-app-bar clipped-left app color="primary">
        <Logo />
      </v-app-bar>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-row>
          <v-col>
            <v-list nav dense style="margin-top: 15%">
              <v-list-item-title class="title">
                {{ $t('sidebar-title.navigation') }}
              </v-list-item-title>
              <v-card>
                <v-list-item-group v-model="group" color="primary">
                  <v-list-item v-for="(link, index) in links" :key="index" :index-v-step="index" :to="localePath(link.to)" exact>
                    <v-list-item-title>
                      {{ $t('links.'+link.label) }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-card>
            </v-list>
            <v-list nav dense style="margin-top: 50%">
              <v-list-item-title class="title">
                {{ $t('sidebar-title.update') }}
              </v-list-item-title>
              <v-card>
                <v-list-item-group v-model="group" color="primary">
                  <v-list-item v-for="(link, index) in links_update" :key="index" :index-v-step="index" :to="localePath(link.to)" exact>
                    <v-list-item-title>
                      {{ $t('links-update.'+link.label) }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-card>
            </v-list>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="8">
        <v-main>
          <nuxt />
        </v-main>
      </v-col>
      <v-col cols="2">
        <PCompanyView />
      </v-col>
    </v-row>
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
    links_update: [
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
  },
  async mounted () {
    await this.$auth.fetchUser()
  },
  methods: {
    async logout () {
      await this.$auth.logout()
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
