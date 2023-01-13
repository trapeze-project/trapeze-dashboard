<template>
  <div>

    <v-card>
      <v-card-title>
        Select a data controller/service to adjust your conset.
      </v-card-title>
      <v-card-actions class="d-flex flex-wrap">
        <v-card max-width="150" class="mx-3">
          <v-img height="150" src="../img/cloverLogo.png"></v-img>
          <v-card-title>CloverIT</v-card-title>
          <v-card-actions>
            <v-btn @click="loadOrgDashboard('CloverIT')"> select </v-btn>
          </v-card-actions>
        </v-card>
        <v-card max-width="150" class="mx-3">
          <v-img height="150" src="../img/alexLogo.png"></v-img>
          <v-card-title>AlexIT</v-card-title>
          <v-card-actions>
            <v-btn @click="loadOrgDashboard('AlexIT')"> select </v-btn>
          </v-card-actions>
        </v-card>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
/*
import AlexITController from "~/static/data/AlexITController.json";
import CloverITController from "~/static/data/CloverITController.json";

export default {
  layout: "appBarOnly",
  methods: {
    loadOrgDashboard(organizationName) {
      if (organizationName === "CloverIT") {
        this.$GlobalVariables.dataController = CloverITController;
        this.$router.push({ path: this.localePath(`/${organizationName}`) });
      } else if (organizationName === "AlexIT") {
        this.$GlobalVariables.dataController = AlexITController;
        this.$router.push({ path: this.localePath(`/${organizationName}`) });
      }
    },
  },
};
*/
</script>
