<template>
  <div>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="8">Consent Menu</v-col>
          <v-col cols="4">
            <v-btn class="float-right error">
              {{ $t("general.revoke") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-tabs v-model="tab" background-color="grey lighten-4">
        <v-tab v-for="(tab, index) in tabs" :key="index" :href="'#' + tab.name">
          {{ tab.label }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="consent">
          <PConsentTab />
        </v-tab-item>

        <v-tab-item value="data">
          <PDataTab />
        </v-tab-item>

        <v-tab-item value="purpose">
          <PPurposeTab />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <PReceiptBtns class="mt-4" />
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
tr.v-data-table__selected {
  background: #0085fc !important;
  color: white;
}
</style>
