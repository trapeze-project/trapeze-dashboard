<template>
  <v-app-bar app clipped-left color="primary">
    <div
      class="d-flex justify-space-between align-center flex-row"
      style="width: 100%"
    >
      <Logo />
      <b class="ml-3 mr-auto">
        | {{$t('layout.privacy-dashboard').toUpperCase()}}
      </b>
      <span class="mr-2 black-text" v-if="$store.state.isAuthenticated">
        Hello Erika Musterman 

        <span @click="logout()" style="color:black ;text-decoration: none;">
          <!-- <NuxtLink  style="color:black ;text-decoration: none;" :to="localePath('/login')"> -->
            (logout)

          <!-- </NuxtLink> -->
        </span>
      </span>
      <div class="">
        <div>
          <v-menu open-on-hover rounded="lg" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="rounded-pill"
                index-v-step="5"
                dark
                outlined
                color="black"
                elevation="0"
                v-bind="attrs"
                v-on="on"
              >
                {{ $i18n.locale.toUpperCase() }}
              </v-btn>
            </template>
            <v-list dense rounded>

              <v-list-item
                v-for="locale in availableLocales"
                :key="locale.code"
                color="black"
              >

                <v-list-item-icon class="mr-0">
                  <v-icon small>mdi-translate</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <nuxt-link
                    style="color: black; text-decoration: none"
                    :to="switchLocalePath(locale.code)"
                  >
                    {{ locale.name }}
                  </nuxt-link>                  
                </v-list-item-content>

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
  },
  methods:{
    logout(){
      this.$store.commit('setIsAuthenticated',false);
      this.$router.push({path: this.localePath('login')})
    }
  }
}
</script>
