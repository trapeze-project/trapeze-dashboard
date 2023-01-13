<template>

    <v-card>
      <v-card-title>
        <!-- @TODO: enable localization of string -->
        Select a data controller to manage your consent.
      </v-card-title>

      <v-row class="px-3">
        <v-col
          cols="6"
          class="mx-0"
          v-for="c, index in controller"
          :key="index"
          >
          <v-card>
            <v-img max-height="125" contain :src="c.logo"></v-img>
            <v-card-title>{{ c.name }}</v-card-title>
            <v-card-actions>
              <v-spacer />
              <v-btn
                class="black--text"
                color="primary" 
                @click="direct('/', c['@id'])"> 
                <!-- @TODO: enable localization of string -->
                Select
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>        
      </v-row>

    </v-card>

</template>

<script>
import ControllerService from "../modules/ControllerService.js";

export default {
  layout: "default",
  data() {
    return {
      controller: []
    };
  },
  created() {
    this.controller = ControllerService.all();
  },
  methods: {
    direct(to, controller) {
      window.location.href = to + "?controller=" + controller;
    },
  },
};
</script>
