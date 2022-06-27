<template>
  <v-app>
    <PNavBar />
    <v-main class="mt-1">
      <v-container fluid>
        <v-row>
          <v-col class="hidden-sm-and-down" md="2" lg="2">
            <PNavigation />
          </v-col>
          <v-col v-if="$vuetify.breakpoint.smAndDown" cols="12">
            <v-icon @click.stop="drawer = !drawer">
              mdi-view-sequential
            </v-icon>
            <v-navigation-drawer
              v-model="drawer"
              absolute
              temporary
            >
              <PNavigation />
            </v-navigation-drawer>
          </v-col>
          <v-col sm="12" md="8" lg="8">
            <nuxt />
          </v-col>
          <v-col class="hidden-sm-and-down" md="2" lg="2">
            <PCompanyView />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
      group: null
    }
  }
}
</script>
