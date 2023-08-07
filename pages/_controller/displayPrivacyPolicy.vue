<template>
  <div>
    <div v-if="$fetchState.pending">
      <PLoading />
    </div>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
      <v-container fluid >
        <v-row justify="end" class="ma-1">
          <v-btn color="green" @click="download">
            Download
            <v-icon dark> mdi-file-download </v-icon>
          </v-btn>
        </v-row>
      </v-container>

      <pre class="ma-2" v-text="formatedPrivacyPolicy"></pre>
    </div>
  </div>
</template>

<script>
let PolicyService = require("~/modules/PolicyService");
export default {
  layout: "appBarOnly",
  props: {
    controller: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formatedPrivacyPolicy: "",
    };
  },
  async fetch() {
    let controllerPolicyRequestBody = this.getControllerPolicyRequestBody();

    let policy = await PolicyService.default.get(controllerPolicyRequestBody);
    this.formatedPrivacyPolicy = JSON.stringify(
      policy.getControllerPolicy(),
      undefined,
      6
    );
  },
  methods: {
    getControllerPolicyRequestBody() {
      return this.controller.controllerPolicyRequestBody;
    },
    download(){
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([this.formatedPrivacyPolicy], {
        type: "application/ld+json"
      }));
      a.setAttribute("download", "privacyPolicy.jsonld");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
  },
};
</script>
