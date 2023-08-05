<template>
  <div>
    <div v-if="$fetchState.pending">
      <PLoading />
    </div>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
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

    let policy = await PolicyService.default.get(
      controllerPolicyRequestBody
    );
    this.formatedPrivacyPolicy = JSON.stringify(policy.getControllerPolicy(), undefined,6);

  },
  methods: {
    getControllerPolicyRequestBody() {
      return this.controller.controllerPolicyRequestBody;
    },
  },
};
</script>
