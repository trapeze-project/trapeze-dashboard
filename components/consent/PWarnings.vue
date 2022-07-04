<template>
  <div >
    <b class="ml-3">{{$t('consent.warnings')}}</b>
    
    <v-alert
      shaped
      dense
      dark
      prominent
      type="warning"
      v-for="dataCategory in Object.keys(selectedWarnings)"
      :key="dataCategory"
      class="mx-1"
    >
      <v-row align="center">
        <v-col class="grow">
          <p> you have {{ selectedWarnings[dataCategory]["givenConsentValue"]? "" : "not" }} given consent to the data controller to use your {{$t(dataCategory)}} data for the purpose of {{$t(purpose)}}. but your choice in ConsentHelper was {{$t(selectedWarnings[dataCategory]["consentHelperChoice"])}} </p>
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
      this.$emit('saveState');
      this.$emit('ignoreWarning',this.purpose,dataCategory)
    },
    closeAllWarnings(){
      this.$emit('saveState');
      for(const dataCategory of Object.keys(this.selectedWarnings)){
        this.$emit('ignoreWarning',this.purpose,dataCategory)
      }
    },
    fixWarnig(dataCategory){
      this.$emit('saveState');
      this.$emit('changeUserChoice',this.purpose,dataCategory ,false);
    },
    fixAllWarnigs(){
      this.$emit('saveState');
      for(const dataCategory of Object.keys(this.selectedWarnings)){
        this.$emit('changeUserChoice',this.purpose,dataCategory ,false);
      }
    }
  },
}
</script>

<style>

</style>