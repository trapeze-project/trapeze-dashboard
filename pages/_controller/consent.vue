<template>
  <div>
    <PNotification ref="consentNotification" />

    <PAlertLeaveDialog ref="alertDialog" />

    <v-tabs-items v-model="tab">
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
        />
      </v-tab-item>
    </v-tabs-items>

    <div>{{ this.debug }}</div>
  </div>
</template>

<script>
import axios from "axios";
import promise from "promise";
import PolicyService from "~/modules/PolicyService";
import DPV_Labels_descriptions_deDE from "../../static/data/DPV/DPV_Labels_descriptions-deDE.json";
import DPV_Labels_descriptions_enUS from "../../static/data/DPV/DPV_Labels_descriptions-enUS.json";
import DPV_Labels_descriptions_frFR from "../../static/data/DPV/DPV_Labels_descriptions-frFR.json";
import DPV_Labels_descriptions_itIT from "../../static/data/DPV/DPV_Labels_descriptions-itIT.json";

let PolicyService1 = require("~/modules/PolicyService");

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

  created() {
    let policyIDs = this.$route.query.policyID;
    let policy = PolicyService.get(this.controller["@id"], policyIDs);
    this.purposeMap = policy.getMap(
      "dpv:hasPurpose",
      "dpv:hasPersonalDataCategory"
    );
    this.fetchedUserChoices = Object.assign({}, this.fetchUserChoices());
    this.userChoices = Object.assign({}, this.fetchedUserChoices);
  },
  async asyncData({ params, query }) {
    // let fetched_DPV_Labels_descriptions = {

    // }
    // return {
    //   fetched_DPV_Labels_descriptions
    // }

    let controller = params.controller;
    let policyIDs = query.policyIDs;
    let policy = PolicyService1.default.get(controller, policyIDs);
    console.log(policy.getIRIs());

    let compactedIRIs = policy.getIRIs();

    let result = {
      en: {
        labels: {},
        descriptions: {},
      },
      de: {
        labels: {},
        descriptions: {},
      },
      it: {
        labels: {},
        descriptions: {},
      },
      fr: {
        labels: {},
        descriptions: {},
      },
    };
    let termDPVInfoRequests = compactedIRIs.map((compactedIRI) => {
      let term = compactedIRI.split(":")[1];

      return axios
        .get(
          `https://trapeze.imp.bg.ac.rs/knowledgebase/kb.php?action=dpv&lang=&term=${term}`
        )
        .catch(function (err) {
          console.log("here is the error " + compactedIRI);
          console.log(err);
        });
    });

    let termDPVInfoResponces = await promise.all(termDPVInfoRequests);

    termDPVInfoResponces.forEach((responce, index) => {
      let IRI = compactedIRIs[index];

      if (responce == undefined) {
        let languages = Object.keys(result);
        languages.forEach((lang) => {
          result[lang].labels[IRI] = IRI;
          result[lang].descriptions[IRI] = IRI + " unable to fetch defintion";
        });
        return;
      }

      let definitions =
        responce["data"][0]["http://www.w3.org/2004/02/skos/core#definition"];

      let labels =
        responce["data"][0]["http://www.w3.org/2004/02/skos/core#prefLabel"];

      definitions.forEach((langSpecificDefinition) => {
        let lang = langSpecificDefinition["@language"];
        let def = langSpecificDefinition["@value"];
        result[lang].descriptions[IRI] = def;
      });

      labels.forEach((langSpecificLabel) => {
        let lang = langSpecificLabel["@language"];
        let label = langSpecificLabel["@value"];
        result[lang].labels[IRI] = label;
      });
    });

    let fetchdata = false;
    let fetched_DPV_Labels_descriptions;
    if (fetchdata) {
      fetched_DPV_Labels_descriptions = JSON.parse(JSON.stringify(result));
    } else {
      fetched_DPV_Labels_descriptions = {
        en: DPV_Labels_descriptions_enUS,
        de: DPV_Labels_descriptions_deDE,
        it: DPV_Labels_descriptions_itIT,
        fr: DPV_Labels_descriptions_frFR,
      };
    }

    return { fetched_DPV_Labels_descriptions };
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

    submitMyConsent() {
      //submit to server
      this.fetchedUserChoices = Object.assign({}, this.userChoices);
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

    fetchUserChoices() {
      // this.fetchedUserChoices =
      return JSON.parse(
        JSON.stringify(
          Object.keys(this.purposeMap).reduce((total, currentValue) => {
            total[currentValue] = this.purposeMap[currentValue].reduce(
              (total, currentValue) => {
                total[currentValue] = true;
                return total;
              },
              {}
            );
            return total;
          }, {})
        )
      );
    },

    // http://localhost/444-werwe-131231-132123-123123/home
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
