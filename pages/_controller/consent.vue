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
          ref="data"
          tab-name="data"
          :heading="$t('nav.labels.data')"
          :user-choices="invertUserChoices(userChoices)"
        />
      </v-tab-item>

      <v-tab-item value="purpose" :eager="true" :transition="false">
        <PConsentTab
          ref="purpose"
          tab-name="purpose"
          :heading="$t('nav.labels.purposes')"
          :user-choices="userChoices"
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
    let policy = PolicyService.get(this.controller);
    this.purposeMap = policy.getMap("dpv:hasPurpose","dpv:hasPersonalDataCategory");
    this.fetchedUserChoices = JSON.parse(JSON.stringify(this.fetchUserChoices()))
    this.userChoices = Object.assign({}, this.fetchedUserChoices);
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
      this.$refs.consentNotification.showNotification(this.$t('snackbar.msg.submission-successful'), 'green')

    },
    undoAllChanges() {
      this.userChoices = Object.assign({}, this.fetchedUserChoices);
      this.$refs["purpose"].forceRerender();
      this.$refs["data"].forceRerender();
      this.showFloatingMenu = false;
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
