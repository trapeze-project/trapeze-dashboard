<template>
  <v-app>
    <v-app-bar app clipped-left color="primary">
      <div
        class="d-flex justify-space-between align-center flex-row"
        style="width: 100%"
      >
        <Logo />
        <div class="d-flex flex-row align-center justify-center">
          <div>
            <b
              class="secondary--text d-none d-sm-inline d-md-inline d-lg-inline"
              style="margin-right: 10px"
            >
              {{ $config.logo.slogan.toUpperCase() }}
            </b>
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
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <PNavigation />
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
  }),
  computed: {
    cssVars() {
      return {
        "--url": "url(" + this.$config.background.url + ")",
      };
    },
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
  },
};
</script>
