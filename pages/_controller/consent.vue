<template>
  <div>
    <PNotification ref="consentNotification" />

    <PAlertLeaveDialog ref="alertDialog" />

    <div v-if="$fetchState.pending">
      <PLoading />
    </div>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <v-tabs-items v-model="tab" v-else>
      <v-tab-item value="data" :eager="true" :transition="false">
        <PConsentTab
          ref="data"
          tab-name="data"
          :heading="$t('nav.labels.data')"
          :user-choices="invertUserChoices(userChoices)"
          :hasChanged="showFloatingMenu"
          @undoAllChanges="undoAllChanges"
          @submitMyConsent="submitMyConsent"
          @changeUserChoice="changeUserChoice"
          :openControllerForm="openControllerForm"
          :fetched_DPV_Labels_descriptions="
            this.fetched_DPV_Labels_descriptions
          "
          :loading="loading"
        />
      </v-tab-item>

      <v-tab-item value="purpose" :eager="true" :transition="false">
        <PConsentTab
          ref="purpose"
          tab-name="purpose"
          :heading="$t('nav.labels.purposes')"
          :user-choices="userChoices"
          :hasChanged="showFloatingMenu"
          @undoAllChanges="undoAllChanges"
          @submitMyConsent="submitMyConsent"
          @changeUserChoice="changeUserChoice"
          :openControllerForm="openControllerForm"
          :fetched_DPV_Labels_descriptions="
            this.fetched_DPV_Labels_descriptions
          "
          :loading="loading"
        />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
let PolicyService = require("~/modules/PolicyService");

export default {
  props: {
    controller: {
      type: Object,
    },
    openControllerForm: {
      type: Function,
    },
  },

  data() {
    return {
      debug: "",
      tabs: [
        {
          name: "data",
          label: this.$t("consent.tab.labels.data-category"),
        },
        {
          name: "purpose",
          label: this.$t("consent.tab.labels.purpose"),
        },
      ],
      fetchedUserChoices: {},
      userChoices: {},
      purposeMap: {},
      showFloatingMenu: false,
      loading: false,
      policy: null,
      fetched_DPV_Labels_descriptions: {},
      fetchedUserChoices: {},
      userChoices: {},
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

  async fetch() {
    let controller = this.controller["@id"];
    let policyIDs = this.$route.query.policyID;

    let controllerPolicyRequestBody = this.getControllerPolicyRequestBody();
    let consentPolicyRequestBody = await this.getConsentPolicyRequestBody();

    this.policy = await PolicyService.default.get(
      controllerPolicyRequestBody,
      consentPolicyRequestBody,
      policyIDs
    );

    this.fetched_DPV_Labels_descriptions =
      await this.policy.fetch_DPV_Labels_and_descriptions();

    let tempFetchedUserChoices = await this.policy.fetchUserChoices(controller);
    this.fetchedUserChoices = JSON.parse(
      JSON.stringify(tempFetchedUserChoices)
    );
    this.userChoices = JSON.parse(JSON.stringify(tempFetchedUserChoices));
  },

  mounted() {
    window.addEventListener("beforeunload", this.beforeWindowUnload);
  },

  beforeDestroy() {
    window.removeEventListener("beforeunload", this.beforeWindowUnload);
  },
  methods: {
    beforeWindowUnload(event) {
      if (this.showFloatingMenu) {
        event.preventDefault();
        event.returnValue = "";
      }
    },
    getControllerPolicyRequestBody() {
      return this.controller.controllerPolicyRequestBody
    },
    async getConsentPolicyRequestBody() {
      // let userID = ["cxb-user"]
      // let policyID= "5b465de8-9bf5-4b69-9cc4-ad8d3c563d7f"
      // let organization= "Org1MSP"
      // // if policyid is missing or unavaliable then create an empty consent policy
      // // let policyID=  await PolicyService.default.createEmptyPolicy(userID,organization)

      // return {
      //   userID,policyID,organization
      // }
      return this.controller.userPolicyRequestBody
    },

    changeUserChoice(update) {
      if (update.tab === "data") {
        this.userChoices = this.invertUserChoices(
          Object.assign({}, update.userChoices)
        );
      } else {
        this.userChoices = Object.assign({}, update.userChoices);
      }

      let hasChanged =
        JSON.stringify(this.userChoices) !==
        JSON.stringify(this.fetchedUserChoices);

      this.showFloatingMenu = hasChanged;
    },
    getConsentPairs() {
      let consentPaires = [];
      let purposes = Object.keys(this.userChoices);
      for (let purpose of purposes) {
        let dataCategories = Object.keys(this.userChoices[purpose]);
        for (let dataCategory of dataCategories) {
          if (this.userChoices[purpose][dataCategory]) {
            consentPaires.push({
              dataCategory,
              purpose,
            });
          }
        }
      }
      return consentPaires;
    },

    async submitMyConsent() {
      this.loading = true;
      //submit to server
      let consentPaires = this.getConsentPairs();

      //working here
      let result = await PolicyService.default.update(
        consentPaires,
        this.policy.getConsentPolicy()
      );

      ////////////////////////////////

      // submit completed
      this.fetchedUserChoices = JSON.parse(JSON.stringify(this.userChoices));
      this.loading = false;
      this.showFloatingMenu = false;
      this.$refs.consentNotification.showNotification(
        this.$t("snackbar.msg.submission-successful"),
        "green"
      );
    },

    undoAllChanges() {
      this.userChoices = Object.assign({}, this.fetchedUserChoices);
      this.showFloatingMenu = false;
      this.$refs.data.forceRerender();
      this.$refs.purpose.forceRerender();
    },

    invertUserChoices(userChoices) {
      return Object.keys(userChoices).reduce((total, a) => {
        const b = userChoices[a];
        Object.keys(b).forEach((element) => {
          if (!total.hasOwnProperty(element)) {
            total[element] = {};
          }
          total[element][a] = userChoices[a][element];
        });
        return total;
      }, {});
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.showFloatingMenu) {
      let alertBody = this.$t("PAlertLeaveDialog.lose-changes-warning");
      this.$refs.alertDialog.showAlert(alertBody);
      const myInterval = setInterval(() => {
        if (this.$refs.alertDialog.leaveAnyWay === true) {
          clearInterval(myInterval);
          next();
        } else if (this.$refs.alertDialog.leaveAnyWay === false) {
          clearInterval(myInterval);
        }
      }, 50);
    } else {
      next();
    }
  },
};
</script>

<style>
.v-tab--active {
  color: black !important;
}
</style>
