<template>
  <div>
    <v-app>
      <PNavBar />

      <v-main >
        <v-container fluid>

          <!-- Mobile only -->
          <v-row v-if="$vuetify.breakpoint.smAndDown">

            <!-- Navigation drawer (mobile) -->
            <v-col>
              <v-icon size="30" @click.stop="drawer.navigation = !drawer.navigation">
                mdi-view-sequential
              </v-icon>
              <v-navigation-drawer v-model="drawer.navigation" absolute temporary>
                <PNavigation 
                  :controller="controller"
                  :mobile="true"
                  @open-controller-drawer="drawer.controller = true"
                />
              </v-navigation-drawer>
            </v-col>

            <!-- Controller information (mobile) -->
            <v-col v-if="controller" class="d-flex justify-end">
              <v-btn
                class="px-0"
                text
                @click.stop="drawer.controller = !drawer.controller"
                elevation="0"
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
                <PControllerView 
                  v-if="controller"
                  :controller="controller"
                />
              </v-navigation-drawer>
            </v-col>

          </v-row>

          <!-- Desktop only -->
          <v-row>

            <!-- Navigation column -->
            <v-col class="hidden-sm-and-down px-0" md="2" lg="2">
              <PNavigation 
                :controller="controller"
                :mobile="false"
              />
            </v-col>

            <!-- Content column -->
            <v-col class="pt-3" sm="12" md="8" lg="8">
              <nuxt-child
                :controller="controller"
              />
            </v-col>

            <!-- Controller information column -->
            <v-col class="hidden-sm-and-down px-0" md="2" lg="2">
              <PControllerView
                v-if="controller"
                :controller="controller"
              />
            </v-col>
          </v-row>

          <v-btn
            color="primary"
            dark
            fixed
            bottom
            right
            fab
            @click="$vuetify.goTo(0, goToOptions)"
            v-scroll="onScroll"
            v-show="showGoToTop"
          >
            <v-icon color="black">mdi-chevron-up</v-icon>
          </v-btn>

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
      controller: null,
      // reference for scroll-to-top button
      // link: https://stackoverflow.com/a/68946595
      offsetTop: 0,
      goToOptions: {
        duration: 500,
        offset: 0,
        easing: 'easeInOutCubic',
      },
    };
  },
  computed:{
    showGoToTop () {
      return this.offsetTop > 0;
    },
  },
  created() {
    this.controller = ControllerService.get(
      this.$nuxt.$route.params.controller
    );
  },
  methods: {
    direct(to) {
      window.location.href = to;
    },
    onScroll (event) {
      this.offsetTop = event.target.scrollingElement.scrollTop;
    },
  }
};
</script>
