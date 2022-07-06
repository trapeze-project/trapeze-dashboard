<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="category"
      :item-key="headers[0].value"
      single-select
      mobile-breakpoint="0"
      @click:row="select"
      :footer-props="{'items-per-page-text': $t('consent.'+tabName+'.ptable.footer.rows-per-page')}"
    >
      <template v-if="tabName === 'purpose' " v-slot:item.issue="{ item }">
        <v-chip
          label
          :color="item.issue === '0 '+$t('consent.issues') ? 'transparent' : 'orange'"
        >
          {{ item.issue }}
        </v-chip>
      </template>
    </v-data-table>

    <PWarnings
      id="PWarnings"
      v-if="view.showPDetails && this.$route.params.consentHelperUserChoices && Object.keys(this.warnings[this.view.selected.untranslated]).length"
      :selectedWarnings="warnings[this.view.selected.untranslated]"
      :purpose="this.view.selected.untranslated"
      :key="this.view.selected.untranslated"
      @ignoreWarning="ignoreWarning"
      @changeUserChoice="changeUserChoice"
      @saveState="saveState"
    />


    <PDetails
      id="PDetails"
      class="mt-4"
      v-if="view.showPDetails"
      :heading="view.selected.untranslated"
      :subitems= "pDetailsSubItemsMap[view.selected.untranslated]"
      :showSensitivity="false"
      :switchesValues="this.calculateBottonsValues"
      :key="Object.values(this.calculateBottonsValues).toString()"
      @changeUserChoice="changeUserChoice"
      @saveState="saveState"
    />
    <div v-if="view.showPEmail" id="PEmail" class="mt-4">
      <PEmail :date="view.selected.date" :event="view.selected.untranslatedEvent" />
    </div>
  </div>
</template>

<script>
import purposes from '../../../static/data/purposes.json'
import examplePolicy from '../../../static/data/example.policy.json'
import data from '../../../static/data/data.json'
import emails from '../../../static/data/emails.json'

export default {
  props: {
    tabName: {
      type: String,
      required: true,
      validator (value) {
        // The value must match one of these strings
        return ['consent', 'data', 'purpose'].includes(value)
      }
    }
  },
  data () {
    return {
      imports: {
        category: '',
        categoryMap: '',
        purposeMap: ''
      },
      view: {
        selected: '',
        showPDetails: false,
        showPEmail: false
      },
      headers: "",
      pDetailsSubItemsMap: "",
      userChoices:"",
      consentHelperUserChoices:"",
      warnings:"",
      states:[]
    }
  },
  created () {
    if (this.tabName === 'consent') {
      this.headers = this.calculatePTableHeaders(["date","event","policy"])
    }
    if (this.tabName === 'data') {
      this.headers = this.calculatePTableHeaders(["data","purposes"])
      this.calculateCategoryMap()
      this.calculatePurposeMap()
      this.pDetailsSubItemsMap = this.imports.categoryMap
    }
    if (this.tabName === 'purpose') {
      this.headers = this.calculatePTableHeaders(["purpose","data","issue"])
      this.calculateCategoryMap()
      this.calculatePurposeMap()
      this.pDetailsSubItemsMap = this.imports.purposeMap
    }

    if (this.tabName === 'purpose') {
      this.userChoices = JSON.parse(JSON.stringify(Object.keys(this.imports.purposeMap).reduce((total, currentValue) => {
        total[currentValue] = this.imports.purposeMap[currentValue].reduce((total, currentValue) => {
          total[currentValue] = true
          return total
        }, {})
        return total
      }, {})))
      if (this.$route.params.consentHelperUserChoices) {
        this.consentHelperUserChoices = JSON.parse(JSON.stringify(this.$route.params.consentHelperUserChoices))
        this.warnings = this.calculateWarrnings()
      }
    } else if (this.tabName === 'data') {
      this.userChoices = JSON.parse(JSON.stringify(Object.keys(this.imports.categoryMap).reduce((total, currentValue) => {
        total[currentValue] = this.imports.categoryMap[currentValue].reduce((total, currentValue) => {
          total[currentValue] = true
          return total
        }, {})
        return total
      }, {})))
    }
  },
  methods: {
    select (item, row) {
      row.select(true)
      this.view.selected = item
      if (this.tabName === 'purpose' || this.tabName === 'data') {
        this.view.showPDetails = true
      }
      if (this.tabName === 'consent') {
        this.view.showPEmail = true
      }

      // vue.$nextTick Defer the callback to be executed after the next DOM update cycle. Use it immediately after you’ve changed some data to wait for the DOM update.
      this.$nextTick(() => {
        this.scrollpage()
      })
    },
    calculatePTableHeaders(header){
      return header.map(e => ({
        text: this.$t('consent.'+this.tabName+'.ptable.header.values.'+e),
        value: e,
        align: 'start'
      }))
    },
    calculateCategoryMap(){
      this.imports.categoryMap =  examplePolicy.reduce((total, currentValue)=>{
        let purpose = currentValue["dpv:Purpose"]["@class"].replace(':','.').replace(/ /g,'-').toLowerCase();
        currentValue["dpv:PersonalDataCategory"].forEach((item, index)=>{
          let personalDataCategory = item["@class"].replace(':','.').replace(/ /g,'-').toLowerCase();
          if(!(personalDataCategory in total)){
            total[personalDataCategory] =[]
          }
          total[personalDataCategory].push(purpose)
        })
        return total
      }, {})
    },
    calculatePurposeMap(){
      this.imports.purposeMap = examplePolicy.reduce((total, currentValue)=>{
        let purpose = currentValue["dpv:Purpose"]["@class"].replace(':','.').replace(/ /g,'-').toLowerCase();
        currentValue["dpv:PersonalDataCategory"].forEach((item, index)=>{
          let personalDataCategory = item["@class"].replace(':','.').replace(/ /g,'-').toLowerCase();
          if(!(purpose in total)){
            total[purpose] =[]
          }
          total[purpose].push(personalDataCategory)
        })
        return total
      }, {})
    },
    calculateWarrnings(){
      let result = {}
      for(const purpose of Object.keys(this.userChoices)){
        for(const dataCategory of Object.keys(this.userChoices[purpose])){
          if(this.userChoices[purpose][dataCategory]){
            if(["consent-helper.no-opinion","consent-helper.not-comfortable"].includes(this.consentHelperUserChoices[purpose][dataCategory])){
              if(!result[purpose]){
                result[purpose] = {}
              }
              result[purpose][dataCategory] = {
                givenConsentValue: this.userChoices[purpose][dataCategory],
                consentHelperChoice: this.consentHelperUserChoices[purpose][dataCategory]
              }
            }
          }
        }
      }
      return result
    },
    ignoreWarning (parent, child) {
      delete (this.warnings[parent])[child]
      const yo = JSON.parse(JSON.stringify(this.warnings))
      this.warnings = JSON.parse(JSON.stringify(yo))
    },
    changeUserChoice(parent,child ,newConsentValue){
      this.userChoices[parent][child] = newConsentValue;
      this.fixWarningIfExist(parent,child ,newConsentValue)
      console.log()
    },
    fixWarningIfExist (parent, child, newConsentValue) {
      if (this.$route.params.consentHelperUserChoices) {
        if (['consent-helper.not-comfortable', 'consent-helper.no-opinion'].includes(this.consentHelperUserChoices[parent][child])) {
          if (newConsentValue === false) {
            if (this.warnings[parent][child]) {
              this.ignoreWarning(parent, child)
            }
          }
        }
      }
    },
    scrollpage () {
      if (this.tabName === 'consent') {
        document.getElementById('PEmail').scrollIntoView({ behavior: 'smooth' })
      }
      if (this.tabName === 'data') {
        document.getElementById('PDetails').scrollIntoView({ behavior: 'smooth' })
      }
      if (this.tabName === 'purpose') {
        if (this.view.showPDetails && this.$route.params.consentHelperUserChoices && Object.keys(this.warnings[this.view.selected.untranslated]).length) {
          document.getElementById('PWarnings').scrollIntoView({ behavior: 'smooth' })
        } else {
          document.getElementById('PDetails').scrollIntoView({ behavior: 'smooth' })
        }
      }
    },
    revokeAll(){
      this.saveState();
      Object.keys(this.userChoices).forEach(parent => {
        Object.keys(this.userChoices[parent]).forEach(child => {
          this.changeUserChoice(parent,child ,false)
        });
      });
    },
    saveState(){
      let state = {}
      state.view = {}
      state.view.selected = JSON.parse(JSON.stringify(this.view.selected))
      state.view.showPDetails = JSON.parse(JSON.stringify(this.view.showPDetails))
      state.userChoices = JSON.parse(JSON.stringify(this.userChoices))
      state.warnings = JSON.parse(JSON.stringify(this.warnings))
      this.states.push(state)

    },
    loadPreviousState(){
      if(this.states.length){
        let state = this.states.pop();
        this.view.showPDetails = JSON.parse(JSON.stringify(state.view.showPDetails))
        this.view.selected = JSON.parse(JSON.stringify(state.view.selected))
        setTimeout(()=>{ // to let the see the switcher switching
          this.userChoices = JSON.parse(JSON.stringify(state.userChoices))
          this.warnings = JSON.parse(JSON.stringify(state.warnings))
        }, 500)
      }
    }
  },
  computed: {
    category(){
      let result = []
      if(this.tabName === "consent"){
        for(const notification of emails){
            let obj = new Object();
            obj.date = notification.date
            obj.event = this.$t("consent.consent.ptable.events.values."+notification.event)
            obj.untranslatedEvent = notification.event
            let policyArr = notification.policy.replace(")","").replace("(","").split(' ')
            obj.policy = policyArr[0] +' ('+ this.$t('consent.consent.ptable.policy.'+policyArr[1]) +')'
            result.push(obj);
        }
      }else if (this.tabName === "data"){ 
        for(const dataCategory of Object.keys(this.imports.categoryMap)){
          let obj = new Object();
          obj.untranslated = dataCategory;
          obj.data = this.$t(dataCategory);
          obj.purposes = this.imports.categoryMap[dataCategory].map((item)=>{return this.$t(item)}).join(', ');
          obj.recipient = 'Company A'
          obj.issue = '0 '+ this.$t('consent.issues')
          result.push(obj);
        }
      }else if( this.tabName === "purpose"){
        for(const purpose of Object.keys(this.imports.purposeMap)){
          let obj = new Object();
          obj.untranslated = purpose;
          obj.purpose = this.$t(purpose);
          obj.data = this.imports.purposeMap[purpose].map((item)=>{return this.$t(item)}).join(', ');
          if(this.$route.params.consentHelperUserChoices && this.warnings[purpose]){
            let issuesCounter = Object.keys(this.warnings[purpose]).length
            obj.issue = issuesCounter +' '+ this.$t('consent.issues')
          }else{
            obj.issue = '0 '+ this.$t('consent.issues')
          }
          result.push(obj);
        }
      }
      return result

    },
    calculateBottonsValues(){
        if(this.view.selected  !== ''){
          return JSON.parse(JSON.stringify(this.userChoices[this.view.selected.untranslated])); 
        }
      
    }
  }
}
</script>
