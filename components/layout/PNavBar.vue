<template>
  <v-app-bar app clipped-left absolute color="primary">
    <div
      class="d-flex justify-space-between align-center flex-row"
      style="width: 100%"
    >
      <Logo />
      <b class="ml-3">
        {{ $config.logo.slogan.toUpperCase() }}
      </b>
      <div class="ml-auto">
        <div>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                index-v-step="5"
                dark
                outlined
                color="black"
                elevation="0"
                v-bind="attrs"
                v-on="on"
              >
                {{ $i18n.locale }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="locale in availableLocales"
                :key="locale.code"
                color="black"
              >
                <nuxt-link
                  style="color: black; text-decoration: none"
                  :to="switchLocalePath(locale.code)"
                >
                  {{ locale.name }}
                </nuxt-link>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
  </v-app-bar>
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
