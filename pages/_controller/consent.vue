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
          
        />
      </v-tab-item>
    </v-tabs-items>
    
  </div>
</template>

<script>
import PolicyService from '~/modules/PolicyService';

export default {
  props: {
    controller: {
      type: Object,
    },
    openControllerForm:{
      type:Function
    }
  },

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
    let policy = PolicyService.get(this.controller, policyIDs);
    this.purposeMap = policy.getMap("dpv:hasPurpose", "dpv:hasPersonalDataCategory");
    this.fetchedUserChoices = Object.assign({}, this.fetchUserChoices())
    this.userChoices = Object.assign({}, this.fetchedUserChoices);
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

      let hasChanged = JSON.stringify(this.userChoices) !== 
        JSON.stringify(this.fetchedUserChoices);

      this.showFloatingMenu = hasChanged;
    },

    submitMyConsent() {
      //submit to server
      this.fetchedUserChoices = Object.assign({}, this.userChoices);
      this.showFloatingMenu = false;
      this.$refs.consentNotification.showNotification(this.$t('snackbar.msg.submission-successful'), 'green')

    },

    undoAllChanges() {
      this.userChoices = Object.assign({}, this.fetchedUserChoices);
      this.showFloatingMenu = false;
      this.$refs.data.forceRerender();
      this.$refs.purpose.forceRerender();
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
