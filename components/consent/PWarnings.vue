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
    >
      <v-row align="center">
        <v-col class="grow">
          <p> you have {{ selectedWarnings[dataCategory]["givenConsentValue"]? "" : "not" }} given consent to the data controller to use your {{dataCategory}} data for the purpose of {{purpose}}. but your choice in ConsentHelper was {{selectedWarnings[dataCategory]["consentHelperChoice"]}} </p>
        </v-col>
        <v-col class="shrink">
          <v-btn @click="fixWarnig(dataCategory)">fix</v-btn>
        </v-col>
        <v-col class="shrink">
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
  methods: {
    closeWarnig(dataCategory){
      this.$emit('ignoreWarning',this.purpose,dataCategory)
    },
    closeAllWarnings(){
      for(const dataCategory of Object.keys(this.selectedWarnings)){
        this.closeWarnig(dataCategory);
      }
    },
    fixWarnig(dataCategory){
      this.$emit('changeUserChoice',this.purpose,dataCategory ,false);
    },
    fixAllWarnigs(){
      for(const dataCategory of Object.keys(this.selectedWarnings)){
        this.fixWarnig(dataCategory);
      }
    }
  },
}
</script>

<style>

</style>