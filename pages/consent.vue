<template>
  <div>
    <PNotification ref="consentNotification" />
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
          <PTabTable ref="data" tab-name="data" :userChoices="invertUserChoices(userChoices)" />
        </v-tab-item>

        <v-tab-item value="purpose" :eager="true">
          <PTabTable ref="purpose" tab-name="purpose" :userChoices="userChoices" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <PReceiptBtns
      v-if="tab !== 'consent' "
      class="mt-4"
      :disableUndoLastChangeBtn="disableUndoLastChangeBtn"
      @undoLastChange="$refs[tab].loadPreviousState()"
      @submitChanges="$refs['consentNotification'].showNotification($t('snackbar.msg.submission-successful'), 'green')" />

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
      disableUndoLastChangeBtn: true,
      userChoices:"",
      purposeMap:"",
      invertedUserChoices : ""
    }
  },
  created(){
    this.calculatePurposeMap()
    this.getUserChoices();
    this.invertedUserChoices = this.invertUserChoices(this.userChoices)

  },
  mounted() {
    this.$watch(
      "$refs.data.states",
      (new_value, old_value) => {
        if(this.$refs[this.tab]){
          this.disableUndoLastChangeBtn = this.$refs[this.tab].states.length === 0
        }else{
          this.disableUndoLastChangeBtn =  false;
        }
      }
    );
    this.$watch(
      "$refs.purpose.states",
      (new_value, old_value) => {
        if(this.$refs[this.tab]){
          this.disableUndoLastChangeBtn = this.$refs[this.tab].states.length === 0
        }else{
          this.disableUndoLastChangeBtn =  false;
        }
      }
    );
    this.$watch(
      "$refs.purpose.modifiedUserChoices",{
      handler: (new_value, old_value) => {
          this.userChoices=JSON.parse(JSON.stringify(new_value))
      } , deep:true }
    );
    this.$watch(
      "$refs.data.modifiedUserChoices",{
      handler: (new_value, old_value) => {
          this.userChoices=this.invertUserChoices(JSON.parse(JSON.stringify(new_value)))
      } , deep:true }
    );
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
  methods:{
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
    getUserChoices(){
      this.userChoices = JSON.parse(JSON.stringify(Object.keys(this.purposeMap).reduce((total, currentValue) => {
        total[currentValue] = this.purposeMap[currentValue].reduce((total, currentValue) => {
          total[currentValue] = true
          return total
        }, {})
        return total
      }, {})))
    },
    invertUserChoices(userChoices){
      return Object.keys(userChoices).reduce((total, a) => {
        let b = userChoices[a];
        Object.keys(b).forEach(element => {
          if(!total.hasOwnProperty(element)){
            total[element]={};
          }
          total[element][a] = userChoices[a][element];
        });
        return total;
      }, {});
    }
  }
}
</script>

<style>
.v-tab--active {
  color: black !important;
}
</style>
