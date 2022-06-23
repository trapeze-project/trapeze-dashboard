<template>
  <div >
    Warnings
    <v-alert
      shaped
      dense
      dark
      prominent
      type="warning"
      v-for="dataCategory in Object.keys(selectedWarnings)"
      :key="dataCategory"
      v-model="warningSwitches[dataCategory]"
    >
      <v-row align="center" class="pa-1">
        <v-col class="" cols="12" sm="12" md="8" lg="10">
          <p> you have {{ selectedWarnings[dataCategory]["givenConsentValue"]? "" : "not" }} given consent to the data controller to use your {{dataCategory}} data for the purpose of {{purpose}}. but your choice in ConsentHelper was {{selectedWarnings[dataCategory]["consentHelperChoice"]}} </p>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="" cols="6" sm="2" md="2" lg="1" align="right">
          <v-btn @click="fixWarnig(dataCategory)">fix</v-btn>
        </v-col>
        <v-col class="" cols="6" sm="2" md="2" lg="1" align="right">
          <v-btn @click="closeWarnig(dataCategory)">ignore</v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <div class="float-right">
      <v-btn class="white--text " color="red" @click="fixAllWarnigs">Fix All</v-btn>
      <v-btn class="black--text " color="primary" @click="closeAllWarnings">Ignore All</v-btn>
    </div>
    <br/>
  </div>
</template>

<script>
export default {
  props: {
    selectedWarnings:Object,
    purpose: String
  },
  data(){
    return{
      warningSwitches :""
    }
  },
  created(){
    let lol = {}
    for(const dataCategory of Object.keys(this.selectedWarnings)){
      lol[dataCategory] = true
    }
    this.warningSwitches = JSON.parse(JSON.stringify(lol)); 
  },
  methods: {
    closeWarnig(dataCategory){
      this.warningSwitches[dataCategory] = false;
      this.$emit('ignoreWarning',this.purpose,dataCategory)
    },
    closeAllWarnings(){
      for(const dataCategory of Object.keys(this.warningSwitches)){
        if(this.warningSwitches[dataCategory] == true){
          this.closeWarnig(dataCategory);
        }
      }
    },
    fixWarnig(dataCategory){
      let newConsentValue;
      if(this.selectedWarnings[dataCategory]["consentHelperChoice"] == "Comfortable"){ // No opinion // Comfortable // Not comfortable
        newConsentValue = true;
      }else{
        newConsentValue = false;
      }
      this.closeWarnig(dataCategory);
      this.$emit('changeUserChoice',this.purpose,dataCategory ,newConsentValue);
    },
    fixAllWarnigs(){
      for(const dataCategory of Object.keys(this.warningSwitches)){
        if(this.warningSwitches[dataCategory] == true){
          this.fixWarnig(dataCategory);
        }
      }
    }
  },
}
</script>

<style>

</style>