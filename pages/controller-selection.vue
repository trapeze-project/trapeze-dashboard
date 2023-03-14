<template>

  <v-card
    elevation="0"
  >
    <v-card-title class="pa-0 pb-1">
      <!-- @TODO: enable localization of string -->
      Select a data controller to manage your consent.
    </v-card-title>

    <v-divider />

    <v-row 
      align="center"
      justify="center"
      class="mt-1"
    >
      <v-col>
        <!-- @TODO: enable localization of string -->
        <v-text-field
          v-model="keyword"
          placeholder="Search for a controller ..."
          outlined
          dense
          clearable
          append-icon="mdi-magnify"
          @click:append="search"
          @keyup="search"
          @keyup.enter="search"
        />
      </v-col>
    </v-row>

    <v-row>

      <!-- Show N random controller. -->
      <v-col 
        cols="12"
        sm="6"
        lg="4"
        xl="3"
        class="mx-0" 
        v-for="c, index in controller" 
        :key="index"
      >
        <v-card class="fill-height" elevation="0" outlined>

          <div class="d-flex flex-no-wrap align-center justify-space-around">

            <v-avatar class="ma-3" size="100" tile>
              <v-img :src="c.logo"></v-img>
            </v-avatar>

            <div>
              <v-card-title>
                {{ c.name }}
              </v-card-title>

              <v-card-text>
                {{ c.address.streetAddress }}<br />
                {{ c.address.postalCode }},
                {{ c.address.addressLocality }}<br />
                {{ c.url }}<br />
              </v-card-text>

              <v-card-actions>
                <v-btn class="black--text" color="primary" @click="direct('/', c['@id'])">
                  <!-- @TODO: enable localization of string -->
                  Select
                </v-btn>
              </v-card-actions>

            </div>
          </div>
        </v-card>
      </v-col>

      <!-- An additional tile to hint to the search field. -->
      <v-col 
        cols="12"
        sm="6"
        lg="4"
        xl="3"
        class="mx-0"
      >
        <v-card class="fill-height" elevation="0" outlined>

          <div class="d-flex flex-no-wrap align-center justify-space-around">

            <v-avatar class="ma-3" size="100" tile>
              <v-icon x-large>mdi-magnify</v-icon>
            </v-avatar>

            <!-- @TODO enable localization of string -->
            <div>
              <v-card-title>
                The controller you're looking for is not in the list?
              </v-card-title>

              <v-card-text>
                Use the search field to find more controllers.
              </v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>    

    </v-row>
  </v-card>

</template>

<script>
import ControllerService from "../modules/ControllerService.js";

export default {
  data() {
    return {
      controller: [],
      keyword: ""
    };
  },
  created() {
    this.reset();
  },
  methods: {
    direct(to, controller) {
      window.location.href = "/"
        + this.$i18n.locale
        + "/"
        + controller 
        + '/home';
    },
    reset() {
      this.controller = ControllerService.all();
    },
    search() {
      this.controller = ControllerService.search(this.keyword);
    },
  },
};
</script>
