<template>
  <v-app>
    <v-app-bar clipped-left app color="coporate">
      <div class="company-wrapper">
        <Logo />
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
