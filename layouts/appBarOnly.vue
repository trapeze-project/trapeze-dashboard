<template>
  <div>
    <v-app>
      <PNavBar />
      <v-main>
        <nuxt-child :controller="controller" />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import ControllerService from "../modules/ControllerService.js";
export default {
  data() {
    return {
      controller: null,
    };
  },
  created() {
    this.controller = ControllerService.get(
      this.$nuxt.$route.params.controller
    );
  },
};
</script>
