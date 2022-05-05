<template>
  <v-app>
    <PNavBar />    

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
};
</script>
