<template>
  <div>
    <v-app>
      <PNavBar />

      <v-main class="mt-1">
        <v-container fluid>

          <!-- Mobile only -->
          <v-row v-if="$vuetify.breakpoint.smAndDown">

            <!-- Navigation drawer (mobile) -->
            <v-col class="float-left">
              <v-icon size="30" @click.stop="drawer.navigation = !drawer.navigation">
                mdi-view-sequential
              </v-icon>
              <v-navigation-drawer v-model="drawer.navigation" absolute temporary>
                <PNavigation />
              </v-navigation-drawer>
            </v-col>

            <!-- Controller information (mobile) -->
            <v-col v-if="controller">
              <v-btn
                text
                class="float-right mr-n5"
                @click.stop="drawer.controller = !drawer.controller"
              >
                <span>{{ controller.name }}</span>
                <v-img :src="controller.logo" max-width="50" max-height="50" />
              </v-btn>
              <v-navigation-drawer
                v-model="drawer.controller"
                absolute
                temporary
                right
              >
                <!--<PCompanyView />-->
              </v-navigation-drawer>
            </v-col>

          </v-row>

          <!-- Desktop only -->
          <v-row>

            <!-- Navigation column -->
            <v-col class="hidden-sm-and-down" md="2" lg="2">
              <PNavigation />
            </v-col>

            <!-- Content column -->
            <v-col sm="12" md="8" lg="8">
              <nuxt />
            </v-col>

            <!-- Controller information column -->
            <v-col class="hidden-sm-and-down" md="2" lg="2">
              <!--<PCompanyView />-->
            </v-col>
          </v-row>

        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import ControllerService from "../modules/ControllerService.js";

export default {
  data() {
    return {
      drawer: {
        navigation: null,
        controller: null
      },
    };
  },
  created() {
    this.controller = ControllerService.get(this.$route.query.controller);
  },
};
</script>
