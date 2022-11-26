<template>
  <div>
    <v-app>
      <PNavBar />
      <v-main class="mt-1">
        <v-container fluid>
          <v-row v-if="$vuetify.breakpoint.smAndDown">
            <v-col class="float-left">
              <v-icon size="30" @click.stop="drawer = !drawer">
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
            <v-col>
              <v-btn text class="float-right mr-n5" @click.stop="drawerController = !drawerController">
                <span>{{ this.companyName }}</span> <v-img src="/img/company.png" max-width="50" max-height="50" />
              </v-btn>
              <v-navigation-drawer
                v-model="drawerController"
                absolute
                temporary
                right
              >
                <PCompanyView />
              </v-navigation-drawer>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="hidden-sm-and-down" md="2" lg="2">
              <PNavigation />
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
  </div>
</template>

<script>
import controller from '../static/data/controller.json' 
export default {
  data () {
    return {
      drawer: null,
      drawerController: null,
      group: null,
      companyName:""
    }
  },
  created(){
    this.companyName = controller.companyInformation.name;

  }
}
</script>
