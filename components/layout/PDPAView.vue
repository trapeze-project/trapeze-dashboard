<template>
  <div>
    <v-card>
      <v-card-text>
        <b>{{ this.DPAInfo.name }}</b>
        <p style="white-space: pre-line">{{ this.DPAInfo.address }}</p>
        <p>{{ this.DPAInfo.email }}</p>
        <p>poststelle@bfdi.bund.de</p>
        <p>{{ this.DPAInfo.url }}</p>
        <p>{{ this.DPAInfo.tel }}</p>
      </v-card-text>
      <v-card-actions>
        <PContactForm
          class="mt-3"
          company-name="green"
          btn-name="Contact DPA"
          :email=" this.DPAInfo.email "
          :showNotification="showNotification"
        />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import promise from "promise";
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
    };
  },
  async beforeCreate() {
    console.log("mounting ...");
    let countryAPIResponse = await fetch("https://api.country.is/");
    let countryAPIResponseJSON = await countryAPIResponse.json();
    let userCountryCode = countryAPIResponseJSON.country;
    this.debug = userCountryCode;
    let DPAInfoResponse = await fetch(
      `https://trapeze.imp.bg.ac.rs/knowledgebase/kb.php?action=dpa&lang=&country=${userCountryCode}`
    );
    let DPAInfoResponseJSON = await DPAInfoResponse.json();
    this.DPAInfo = DPAInfoResponseJSON[0];
  },
  methods: {},
};
</script>

<style></style>
