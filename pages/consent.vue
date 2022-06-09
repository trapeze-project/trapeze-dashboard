<template>
  <div>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="8">{{$t("consent.consent-menu")}}</v-col>
          <v-col cols="4">
            <v-btn v-if="tab !== 'consent' " class="float-right error" @click="$refs[tab].revokeAll()">
              {{ $t("general.revoke") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-tabs v-model="tab" background-color="primary">
        <v-tabs-slider color="black"></v-tabs-slider>

        <v-tab v-for="(tab, index) in tabs" :key="index" :href="'#' + tab.name">
          {{ tab.label }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="consent">
          <PTabTable tabName="consent" />
        </v-tab-item>

        <v-tab-item value="data">
          <PTabTable tabName="data" />
        </v-tab-item>

        <v-tab-item value="purpose">
          <PTabTable tabName="purpose" ref="purpose"/>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <PReceiptBtns class="mt-4" />
    <div>********************* {{this.tab}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          name: "consent",
          label: "Consent",
        },
        {
          name: "data",
          label: "Data",
        },
        {
          name: "purpose",
          label: "Purpose",
        },
      ],
    };
  },
  computed: {
    tab: {
      set(tab) {
        this.$router.replace({ query: { ...this.$route.query, tab } });
      },
      get() {
        return this.$route.query.tab;
      },
    },
  },
};
</script>

<style>
.v-tab--active {
  color: black !important;
}
</style>