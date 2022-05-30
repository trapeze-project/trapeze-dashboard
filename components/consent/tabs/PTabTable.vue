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
    
    <PDetails 
      class="mt-4"
      v-if="view.showPDetails"
      :heading="view.selected[this.tabName]"
      :subitems= "pDetailsSubItemsMap[view.selected[this.tabName]]"
      :showSensitivity="false"
    />
    <div v-if="view.showPEmail" id="PEmail" class="mt-4">
      <PEmail :date="view.selected.date" :event="view.selected.event" />
    </div>
    <div>userPrefences: {{this.$route.params}}</div>
    <div>{{this.$nuxt.$route.name}}</div>
    <div>{{this.category}}</div>
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
      pDetailsSubItemsMap: ""
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
      }));
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
      console.log(this.imports.purposeMap)
    },

  },
  computed: {
    category(){
      let result = []
      if(this.tabName === "consent"){
        return emails;
      }
      if (this.tabName === "data"){ 
        let keys = Object.keys(this.imports.categoryMap);
        let values = Object.values(this.imports.categoryMap);
        for(let i = 0; i < keys.length ; i++){
          let obj = new Object();
          obj.data = keys[i]
          obj.purpose = values[i].join(', ');
          obj.recipient = 'Company A'
          obj.issue = '0 issues'
          result.push(obj);
        }
      }else if( this.tabName === "purpose"){
        let keys = Object.keys(this.imports.purposeMap);
        let values = Object.values(this.imports.purposeMap);
        for(let i = 0; i < keys.length ; i++){
          let obj = new Object();
          obj.purpose = keys[i];
          obj.data = values[i].join(', ');
          obj.issue = '0 issues';
          if(this.$route.params.allUserChoices){
            let issues = [];
            for(let j = 0 ; j < values[i].length ; j++){
              let purpose = keys[i]
              let data = values[i][j]
              console.log(purpose , data)
              if(this.$route.params.allUserChoices[data.toLowerCase()]){
                if(this.$route.params.allUserChoices[data.toLowerCase()][purpose] !== 'Comfortable'){
                  issues.push(data)
                }
              }
            }
            obj.issue = issues.length +' issues'
          }
          result.push(obj);
        }
      }
      return result

    }
  }
};
</script>