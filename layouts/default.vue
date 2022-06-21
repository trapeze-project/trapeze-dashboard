<template>
  <v-app>
    <PNavBar />    

    <v-main class="mt-1">
      <v-container fluid>
        <v-row >
          <v-col class="hidden-sm-and-down" md="2" lg = "2">
            <PNavigation />
          </v-col>
          <v-col sm="12" md="8" lg="8" >
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
};
</script>
