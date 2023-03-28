<template>

  <v-card
    elevation="0"
  >
    <v-card-title class="pa-0 pb-1">
      {{ $t("controller-selection.heading") }}
    </v-card-title>

    <v-divider />

    <v-row 
      align="center"
      justify="center"
      class="mt-1"
    >
      <v-col class="pb-0">
        <v-text-field
          class="rounded-pill"
          v-model="keyword"
          :placeholder="$t('placeholder.search-for-controller')"
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
        <v-card class="d-flex flex-column fill-height rounded-xl">

          <div class="d-flex flex-no-wrap justify-space-around">

            <v-avatar class="ma-3" size="100" tile>
              <v-img :src="c.logo"></v-img>
            </v-avatar>

            <div>
              <v-card-title class="pl-0">
                {{ c.name }}
              </v-card-title>

              <v-card-text class="pl-0">
                {{ c.address.streetAddress }}<br />
                {{ c.address.postalCode }},
                {{ c.address.addressLocality }}<br />
                {{ c.url }}<br />
              </v-card-text>

            </div>
          </div>

          <v-spacer />

          <v-card-actions>
            <v-btn class="black--text rounded-pill px-5 mx-auto" color="primary" @click="direct('/', c['@id'])">
              {{ $t("btn.labels.select") }}
            </v-btn>
          </v-card-actions>

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
        <v-card class="fill-height rounded-xl">

          <div class="d-flex flex-no-wrap align-center justify-space-around">

            <v-avatar class="ma-3" size="100" tile>
              <v-icon x-large>mdi-magnify</v-icon>
            </v-avatar>

            <div>
              <v-card-title class="pl-0">
                {{ $t("controller-selection.search-hint.heading") }}
              </v-card-title>

              <v-card-text class="pl-0">
                {{ $t("controller-selection.search-hint.desc") }}
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
