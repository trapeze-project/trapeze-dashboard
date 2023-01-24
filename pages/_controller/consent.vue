<template>
  <div>
    <PFloatingMenu
      v-show="showFloatingMenu"
      @undoAllChanges="undoAllChanges"
      @submitMyConsent="submitMyConsent"
    />
    <PNotification ref="consentNotification" />
    <PAlertLeaveDialog ref="alertDialog" />

    <v-tabs-items v-model="tab">
      <v-tab-item value="data" :eager="true" :transition="false">
        <PConsentTab
          class="ma-1"
          ref="data"
          tab-name="data"
          :user-choices="invertUserChoices(userChoices)"
        />
      </v-tab-item>

      <v-tab-item value="purpose" :eager="true" :transition="false">
        <PConsentTab
          class="ma-1"
          ref="purpose"
          tab-name="purpose"
          :user-choices="userChoices"
        />
      </v-tab-item>
    </v-tabs-items>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          name: "data",
          label: this.$t("consent.tab.labels.data-category"),
        },
        {
          name: "purpose",
          label: this.$t("consent.tab.labels.purpose"),
        },
        {
          name: "consent",
          label: this.$t("consent.tab.labels.consent"),
        },
      ],
      fetchedUserChoices: {},
      privacyPolicy:{},
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
    
    this.privacyPolicy = this.$store.state.controllerPrivacyPolicy;
    this.purposeMap = JSON.parse(JSON.stringify(this.getPurposeMap()));
    this.fetchedUserChoices = JSON.parse(JSON.stringify(this.fetchUserChoices()))
    this.userChoices = Object.assign({}, this.fetchedUserChoices);
    console.log(this.$route.params.controller)
  },

  mounted() {
    window.addEventListener("beforeunload", this.beforeWindowUnload);

    this.$watch("$refs.purpose.modifiedUserChoices", {
      handler: (new_value, old_value) => {
        this.userChoices = JSON.parse(JSON.stringify(new_value));

        if (
          JSON.stringify(this.userChoices) ===
          JSON.stringify(this.fetchedUserChoices)
        ) {
          this.showFloatingMenu = false;
        } else {
          this.showFloatingMenu = true;
        }
      },
      deep: true,
    });
    this.$watch("$refs.data.modifiedUserChoices", {
      handler: (new_value, old_value) => {
        this.userChoices = this.invertUserChoices(
          JSON.parse(JSON.stringify(new_value))
        );

        if (
          JSON.stringify(this.userChoices) ===
          JSON.stringify(this.fetchedUserChoices)
        ) {
          this.showFloatingMenu = false;
        } else {
          this.showFloatingMenu = true;
        }
      },
      deep: true,
    });
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

    submitMyConsent() {
      //submit to server
      this.fetchedUserChoices = Object.assign({}, this.userChoices);
      this.showFloatingMenu = false;
    },
    undoAllChanges() {
      this.userChoices = Object.assign({}, this.fetchedUserChoices);
      this.$refs["purpose"].forceRerender();
      this.$refs["data"].forceRerender();
      this.showFloatingMenu = false;
    },

    getPurposeMap() {
      return this.privacyPolicy["@policySet"].reduce((total, currentValue) => {
        const purpose = currentValue["dpv:hasPurpose"][0]["@class"]
        currentValue["dpv:hasPersonalDataCategory"].forEach((item) => {
          if(item.hasOwnProperty("@class")){
            const personalDataCategory = item["@class"]
            if (!(purpose in total)) {
              total[purpose] = [];
            }
            total[purpose].push(personalDataCategory);
          }

        });
        return total;
      }, {});
    },
    fetchUserChoices() {
      // this.fetchedUserChoices =
      return  JSON.parse(
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
