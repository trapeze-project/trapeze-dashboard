<template>
  <div>
    <PNotification ref="consentNotification" />
    <PAlertLeaveDialog ref="alertDialog" />
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="8">
            {{ $t("consent.consent-menu") }}
          </v-col>
          <v-col cols="4">
            <v-btn v-if="tab !== 'consent' " class="float-right error" @click="$refs[tab].revokeAll()">
              {{ $t("general.revoke") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-tabs v-model="tab" background-color="primary">
        <v-tabs-slider color="black" />

        <v-tab v-for="(tab, index) in tabs" :key="index" :href="'#' + tab.name">
          {{ tab.label }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="consent">
          <PTabTable tab-name="consent" />
        </v-tab-item>

        <v-tab-item value="data" :eager="true">
          <PTabTable ref="data" tab-name="data" :user-choices="invertUserChoices(userChoices)" :warnings="invertWarnings(warnings)" />
        </v-tab-item>

        <v-tab-item value="purpose" :eager="true">
          <PTabTable ref="purpose" tab-name="purpose" :user-choices="userChoices" :warnings="warnings" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <PReceiptBtns
      v-if="tab !== 'consent' "
      class="mt-4"
      :disable-undo-last-change-btn="disableUndoLastChangeBtnForData && disableUndoLastChangeBtnForPurpose "
      @undoLastChange="undoLastChange"
      @submitChanges="submitChanges"
    />
    <!-- :disableUndoLastChangeBtn="(disableUndoLastChangeBtnForData && tab=='data') || (disableUndoLastChangeBtnForPurpose && tab=='purpose') " -->
  </div>
</template>

<script>
import examplePolicy from '../static/data/example.policy.json'
export default {
  data () {
    return {
      tabs: [
        {
          name: 'consent',
          label: this.$t('consent.tab.labels.consent')
        },
        {
          name: 'data',
          label: this.$t('consent.tab.labels.data-category')
        },
        {
          name: 'purpose',
          label: this.$t('consent.tab.labels.purpose')
        }
      ],
      disableUndoLastChangeBtnForData: true,
      disableUndoLastChangeBtnForPurpose: true,
      userChoices: '',
      purposeMap: '',
      invertedUserChoices: '',
      consentHelperUserChoices: '',
      warnings: {}
    }
  },
  computed: {
    tab: {
      set (tab) {
        this.$router.replace({ query: { ...this.$route.query, tab } })
      },
      get () {
        return this.$route.query.tab
      }
    }
  },
  created () {
    this.calculatePurposeMap()
    this.getUserChoices()
    this.invertedUserChoices = this.invertUserChoices(this.userChoices)

    if (this.$route.params.consentHelperUserChoices) {
      this.consentHelperUserChoices = JSON.parse(JSON.stringify(this.$route.params.consentHelperUserChoices))
      this.calculateWarnings()
    }
  },

  mounted () {
    window.addEventListener('beforeunload', this.beforeWindowUnload);
    this.$watch(
      '$refs.data.states',
      (new_value, old_value) => {
        this.disableUndoLastChangeBtnForData = this.$refs.data.states.length === 0
      }
    )
    this.$watch(
      '$refs.purpose.states',
      (new_value, old_value) => {
        this.disableUndoLastChangeBtnForPurpose = this.$refs.purpose.states.length === 0
      }
    )
    this.$watch(
      '$refs.purpose.modifiedUserChoices', {
        handler: (new_value, old_value) => {
          this.userChoices = JSON.parse(JSON.stringify(new_value))
        },
        deep: true
      }
    )
    this.$watch(
      '$refs.data.modifiedUserChoices', {
        handler: (new_value, old_value) => {
          this.userChoices = this.invertUserChoices(JSON.parse(JSON.stringify(new_value)))
        },
        deep: true
      }
    )
    this.$watch(
      '$refs.purpose.modifiedWarnings', {
        handler: (new_value, old_value) => {
          this.warnings = JSON.parse(JSON.stringify(new_value))
        },
        deep: true
      }
    )
    this.$watch(
      '$refs.data.modifiedWarnings', {
        handler: (new_value, old_value) => {
          this.warnings = this.invertWarnings(JSON.parse(JSON.stringify(new_value)))
        },
        deep: true
      }
    )
  },
  methods: {
    beforeWindowUnload(event){
      if(!this.disableUndoLastChangeBtnForData || !this.disableUndoLastChangeBtnForPurpose || JSON.stringify(this.warnings) !== JSON.stringify({})){
        event.preventDefault();
        event.returnValue = "";
      }
    },

    submitChanges () {
      this.$refs.consentNotification.showNotification(this.$t('snackbar.msg.submission-successful'), 'green')
      this.$refs.data.states = []
      this.$refs.purpose.states = []
    },
    undoLastChange () {
      if (this.disableUndoLastChangeBtnForData && this.tab === 'data' && !this.disableUndoLastChangeBtnForPurpose) {
        this.$router.replace({ query: { ...this.$route.query, tab: 'purpose' } })
      } else if (this.disableUndoLastChangeBtnForPurpose && this.tab === 'purpose' && !this.disableUndoLastChangeBtnForData) {
        this.$router.replace({ query: { ...this.$route.query, tab: 'data' } })
      }
      setTimeout(() => {
        this.$refs[this.tab].loadPreviousState()
      }, 900)
    },

    calculatePurposeMap () {
      this.purposeMap = examplePolicy.reduce((total, currentValue) => {
        const purpose = currentValue['dpv:Purpose']['@class'].replace(':', '.').replace(/ /g, '-').toLowerCase()
        currentValue['dpv:PersonalDataCategory'].forEach((item, index) => {
          const personalDataCategory = item['@class'].replace(':', '.').replace(/ /g, '-').toLowerCase()
          if (!(purpose in total)) {
            total[purpose] = []
          }
          total[purpose].push(personalDataCategory)
        })
        return total
      }, {})
    },
    getUserChoices () {
      this.userChoices = JSON.parse(JSON.stringify(Object.keys(this.purposeMap).reduce((total, currentValue) => {
        total[currentValue] = this.purposeMap[currentValue].reduce((total, currentValue) => {
          total[currentValue] = true
          return total
        }, {})
        return total
      }, {})))
    },
    invertUserChoices (userChoices) {
      return Object.keys(userChoices).reduce((total, a) => {
        const b = userChoices[a]
        Object.keys(b).forEach((element) => {
          if (!total.hasOwnProperty(element)) {
            total[element] = {}
          }
          total[element][a] = userChoices[a][element]
        })
        return total
      }, {})
    },
    calculateWarnings () {
      this.warnings = {}
      for (const purpose of Object.keys(this.userChoices)) {
        for (const dataCategory of Object.keys(this.userChoices[purpose])) {
          if (this.userChoices[purpose][dataCategory]) {
            if (['consent-helper.no-opinion', 'consent-helper.not-comfortable'].includes(this.consentHelperUserChoices[purpose][dataCategory])) {
              if (!this.warnings[purpose]) {
                this.warnings[purpose] = {}
              }
              this.warnings[purpose][dataCategory] = {
                givenConsentValue: this.userChoices[purpose][dataCategory],
                consentHelperChoice: this.consentHelperUserChoices[purpose][dataCategory]
              }
            }
          }
        }
      }
    },
    invertWarnings (warnings) {
      return Object.keys(warnings).reduce((total, a) => {
        const b = warnings[a]
        Object.keys(b).forEach((element) => {
          if (!total.hasOwnProperty(element)) {
            total[element] = {}
          }
          if (!total[element].hasOwnProperty(a)) {
            total[element][a] = {}
          }
          total[element][a].givenConsentValue = warnings[a][element].givenConsentValue
          total[element][a].consentHelperChoice = warnings[a][element].consentHelperChoice
        })
        return total
      }, {})
    }
  },
  beforeRouteLeave (to, from, next) {
    if (!this.disableUndoLastChangeBtnForData || !this.disableUndoLastChangeBtnForPurpose || JSON.stringify(this.warnings) !== JSON.stringify({})) {
      let alertBody = ''
      if (!this.disableUndoLastChangeBtnForData || !this.disableUndoLastChangeBtnForPurpose) {
        alertBody += this.$t('PAlertLeaveDialog.lose-changes-warning')
      }
      if (JSON.stringify(this.warnings) !== JSON.stringify({})) {
         alertBody += '\n'
        alertBody += this.$t('PAlertLeaveDialog.lose-consent-helper-choices')
      }
      this.$refs.alertDialog.showAlert(alertBody)
      const myInterval = setInterval(()=>{
        if (this.$refs.alertDialog.leaveAnyWay === true) {
          clearInterval(myInterval)
          next()
        } else if (this.$refs.alertDialog.leaveAnyWay === false) {
          clearInterval(myInterval)
        }
      }, 50)
    } else {
      next()
    }
  },
  beforeDestroy(){
    window.removeEventListener('beforeunload', this.beforeWindowUnload)
  },
}
</script>

<style>
.v-tab--active {
  color: black !important;
}
</style>
