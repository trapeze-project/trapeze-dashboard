/* eslint-disable */
<template>
  <v-app>
    <v-row>
      <v-col cols="12">
        <v-app-bar clipped-left app color="primary">
          <v-app-bar-nav-icon color="secondary" @click.stop="drawer = !drawer" />
          <v-spacer />
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
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-row>
          <v-col>
            <v-navigation-drawer
              v-model="drawer"
              clipped
              app
              mobile-breakpoint="0"
              :mini-variant="$vuetify.breakpoint.mobile"
            >
              <v-list nav dense style="margin-top: 15%">
                <v-list-item-title class="title">
                  {{ $t('sidebar-title.navigation') }}
                </v-list-item-title>
                <v-card>
                  <v-list-item-group v-model="group" color="primary">
                    <v-list-item v-for="(link, index) in links" :key="index" :index-v-step="index" :to="localePath(link.to)" exact>
                      <!--            <v-list-item-icon>
                      <v-icon>
                        {{ link.icon }}
                      </v-icon>
                    </v-list-item-icon>-->
                      <v-list-item-title>
                        {{ $t('links.'+link.label) }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list-item-group>
                </v-card>
              </v-list>
              <!--            </v-navigation-drawer>-->
              <!--          </v-col>-->
              <!--        </v-row>-->
              <!--        <v-row>-->
              <!--          <v-col>-->
              <!--            <v-navigation-drawer>-->
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
            </v-navigation-drawer>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="8">
        <v-row>
          <v-col>
            <v-card style="margin-top: 5%">
              <v-card-title>
                {{ $t('home.title') }}
              </v-card-title>
              <v-card-text>
                {{ $t('home.welcome-msg') }} <br><br>
                {{ $t('home.welcome-msg2') }} <br>
                <ul>
                  <li
                    v-for="(item, idx) in Object.values($t('home.purpose'))"
                    :key="idx"
                  >
                    {{ item.name }}
                  </li>
                </ul>
                <v-divider />
                <br>
                {{ $t('home.welcome-msg4') }}
                <v-btn
                  style="float: right"
                  color="primary"
                  depressed
                  :to="localePath()"
                >
                  {{ $t('links.consent_helper') }}
                </v-btn>
                <v-spacer />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col
            v-for="(item, idx) in Object.values($t('home.items'))"
            :key="idx"
            sm="12"
            md="4"
            lg="4"
          >
            <PExplainCard :title="item.title" :content="item.content" :filename="item.filename" :href="item.link" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2">
        <v-card style="margin-top: 25%">
          <v-img
            height="250"
            src="/company.png"
          />
          <v-card-text>
            {{ $t('company.name') }}<br>
            {{ $t('company.add1') }}<br>
            {{ $t('company.add2') }}<br>
            {{ $t('company.website') }}<br> <br>
            {{ $t('company.position') }}<br>
            {{ $t('company.email') }}<br>
            {{ $t('company.pos-name') }}<br>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-main class="main">
      <v-container fluid>
        <nuxt />
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
      { to: '/profile', label: 'consent_menu' },
      { to: '/about', label: 'consent_helper' },
      { to: '/data', label: 'faq' }
      // disables activities route in navigation only for user test { to: '/activities', label: 'log', icon: 'toc' },
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
