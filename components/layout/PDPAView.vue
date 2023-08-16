<template>
  <div style="height: 750px" :key="key">
    <v-card outlined color="transparent">
      <v-card-text >
        <b>{{ this.DPAInfo.name }}</b>
        <p style="white-space: pre-line">{{ this.DPAInfo.address }}</p>
        <p>{{ this.DPAInfo.email }}</p>
        <p>{{ this.DPAInfo.url }}</p>
        <p>{{ this.DPAInfo.tel }}</p>
        <PContactForm
          class="mt-3"
          company-name="green"
          btn-name="Contact DPA"
          :email="this.DPAInfo.email"
          :showNotification="showNotification"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    showNotification: {
      type: Function,
    },
  },
  data() {
    return {
      debug: null,
      DPAInfo: {
        name: "",
        address: "",
        email: "default@xyz.com",
        url: "",
        tel: "",
        fax: "",
      },
      key: 0,
    };
  },
  async fetch() {
    let countryAPIResponse = await fetch("https://api.country.is/");
    let countryAPIResponseJSON = await countryAPIResponse.json();
    let userCountryCode = countryAPIResponseJSON.country;
    this.debug = userCountryCode;
    let knowledgeBaseURL = process.env.KNOWLEDGE_BASE
    let DPAInfoResponse = await fetch(
      `${knowledgeBaseURL}?action=dpa&lang=&country=${userCountryCode}`
    );
    let DPAInfoResponseJSON = await DPAInfoResponse.json();
    this.DPAInfo = JSON.parse(JSON.stringify(DPAInfoResponseJSON[0]));

    this.forceRerender();
  },
  methods: {
    forceRerender() {
      this.key += 1;
    },
  },
};
</script>

<style></style>
