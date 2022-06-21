<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="category"
      :item-key="headers[0].value"
      single-select
      @click:row="select"
    >
      <template v-if="tabName === 'purpose' || tabName === 'data'"  v-slot:item.issue="{ item }">
        <v-chip
          label
          :color="item.issue === '0 issues' ? 'transparent' : 'orange'"
        >
          {{ item.issue }}
        </v-chip>
      </template>
    </v-data-table>

    <PWarnings
      v-if="view.showPDetails && this.$route.params.consentHelperUserChoices && Object.keys(this.warnings[this.view.selected.purpose]).length"
      :selectedWarnings="warnings[this.view.selected.purpose]"
      :purpose="this.view.selected.purpose"
      :key="this.view.selected.purpose"
      @ignoreWarning="ignoreWarning"
      @changeUserChoice="changeUserChoice"
    />




    <PDetails 
      class="mt-4"
      v-if="view.showPDetails"
      :heading="view.selected[this.tabName]"
      :subitems= "pDetailsSubItemsMap[view.selected[this.tabName]]"
      :showSensitivity="false"
      :switchesValues="this.calculateBottonsValues"
      :key="Object.values(this.calculateBottonsValues).toString()"
      @changeUserChoice="changeUserChoice"
    />
    <div v-if="view.showPEmail" id="PEmail" class="mt-4">
      <PEmail :date="view.selected.date" :event="view.selected.event" />
    </div>
  </div>
</template>

<script>
import purposes from "../../../static/data/purposes.json";
import examplePolicy from "../../../static/data/example.policy.json";
import data from "../../../static/data/data.json";
import emails from "../../../static/data/emails.json";

export default {
  props: {
    tabName: {
      type: String,
      required: true,
      validator(value) {
        // The value must match one of these strings
        return ['consent', 'data', 'purpose'].includes(value)
      }
    },
  },
  data() {
    return {
      imports: {
        category: "",
        categoryMap: "",
        purposeMap: ""
      },
      view: {
        selected: "",
        showPDetails: false,
        showPEmail: false,
      },
      headers: "",
      pDetailsSubItemsMap: "",
      userChoices:"",
      consentHelperUserChoices:"",
      warnings:"",
    };
  },
  created(){
    if(this.tabName === "consent"){
      this.imports.category = emails;
    }
    if (this.tabName === "data"){ 
      this.imports.category = data;
      this.calculateCategoryMap()
      this.calculatePurposeMap()
      this.pDetailsSubItemsMap = this.imports.categoryMap
    }
    if( this.tabName === "purpose"){
      this.imports.category = purposes;
      this.calculateCategoryMap()
      this.calculatePurposeMap()
      this.pDetailsSubItemsMap = this.imports.purposeMap

    }
    this.headers = Object.keys(this.imports.category[0]).map((e) => ({
        text: e.charAt(0).toUpperCase() + e.slice(1),
        value: e,
        align: "start",
      })
    );

    if(this.tabName === "purpose"){
      this.userChoices =  JSON.parse(JSON.stringify(Object.keys(this.imports.purposeMap).reduce((total, currentValue)=>{
        total[currentValue]=this.imports.purposeMap[currentValue].reduce((total, currentValue)=>{
          total[currentValue] = true
          return total
        },{});
        return total
      },{})));
      if(this.$route.params.consentHelperUserChoices){
        this.consentHelperUserChoices =  JSON.parse(JSON.stringify(this.$route.params.consentHelperUserChoices));
        this.warnings = this.calculateWarrnings()
      } 
    }else if(this.tabName === "data"){
      this.userChoices =  JSON.parse(JSON.stringify(Object.keys(this.imports.categoryMap).reduce((total, currentValue)=>{
        total[currentValue]=this.imports.categoryMap[currentValue].reduce((total, currentValue)=>{
          total[currentValue] = true
          return total
        },{});
        return total
      },{})));
    }
    
  },
  methods: {
    select(item, row) {
      row.select(true);
      this.view.selected = item;
      if(this.tabName === 'purpose' || this.tabName === 'data'){
        this.view.showPDetails = true;
      }
      if(this.tabName === 'consent'){
        this.view.showPEmail = true;
      }
    },
    calculateCategoryMap(){
      this.imports.categoryMap =  examplePolicy.reduce((total, currentValue)=>{
        let purpose = currentValue["dpv:Purpose"]["@class"].substring(4)
        currentValue["dpv:PersonalDataCategory"].forEach((item, index)=>{
          let personalDataCategory = item["@class"].substring(4);
          if(!(personalDataCategory in total)){
            total[personalDataCategory] =[]
          }
          total[personalDataCategory].push(purpose)
        })
        return total;
      },{});
    },
    calculatePurposeMap(){
      this.imports.purposeMap = examplePolicy.reduce((total, currentValue)=>{
        let purpose = currentValue["dpv:Purpose"]["@class"].substring(4)
        currentValue["dpv:PersonalDataCategory"].forEach((item, index)=>{
          let personalDataCategory = item["@class"].substring(4);
          if(!(purpose in total)){
            total[purpose] =[]
          }
          total[purpose].push(personalDataCategory)
        })
        return total;
      },{});
    },
    calculateWarrnings(){
      let result = {}
      for(const purpose of Object.keys(this.userChoices)){
        for(const dataCategory of Object.keys(this.userChoices[purpose])){
          if(this.userChoices[purpose][dataCategory]){
            if(["No opinion","Not comfortable"].includes(this.consentHelperUserChoices[purpose][dataCategory])){
              if(!result[purpose]){
                result[purpose] = {}
              }
              result[purpose][dataCategory] = {
                givenConsentValue : this.userChoices[purpose][dataCategory],
                consentHelperChoice : this.consentHelperUserChoices[purpose][dataCategory]
              }
            }
          }
        }
      }
      return result;

    },
    ignoreWarning(parent,child){
      delete (this.warnings[parent])[child]
      let yo = JSON.parse(JSON.stringify(this.warnings)); 
      this.warnings = JSON.parse(JSON.stringify(yo)); 

    },
    changeUserChoice(parent,child ,newConsentValue){
      this.userChoices[parent][child] = newConsentValue;
      //this.fixWarningIfExist(parent,child ,newConsentValue)
    },
    fixWarningIfExist(parent,child ,newConsentValue){
      if(this.$route.params.consentHelperUserChoices){
        if(["No opinion","Not comfortable"].includes(this.consentHelperUserChoices[parent][child])){
          if(newConsentValue===false){
            if(this.warnings[parent][child]){
              this.ignoreWarning(parent,child);
            }
          }
        }
      }
    },
    revokeAll(){
      Object.keys(this.userChoices).forEach(parent => {
        Object.keys(this.userChoices[parent]).forEach(child => {
          this.changeUserChoice(parent,child ,false)
        });
      });
    }
  },
  computed: {
    category(){
      let result = []
      if(this.tabName === "consent"){
        return emails;
      }
      if (this.tabName === "data"){ 
        for(const dataCategory of Object.keys(this.imports.categoryMap)){
          let obj = new Object();
          obj.data = dataCategory
          obj.purpose = this.imports.categoryMap[dataCategory].join(', ');
          obj.recipient = 'Company A'
          obj.issue = '0 issues'
          result.push(obj);
        }
      }else if( this.tabName === "purpose"){
        for(const purpose of Object.keys(this.imports.purposeMap)){
          let obj = new Object();
          obj.purpose = purpose;
          obj.data = this.imports.purposeMap[purpose].join(', ');
          if(this.$route.params.consentHelperUserChoices && this.warnings[purpose]){
            let issuesCounter = Object.keys(this.warnings[purpose]).length
            obj.issue = issuesCounter +' issues'
          }else{
            obj.issue = '0 issues'
          }
          result.push(obj);
        }
      }
      return result

    },
    calculateBottonsValues(){
        if(this.view.selected  !== ''){  
          let purposesChoices = JSON.parse(JSON.stringify(this.userChoices[this.view.selected[this.tabName]])); 
          return purposesChoices
        }
    }
  }
};
</script>