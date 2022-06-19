<template>
  <div v-if="true">
    Display warnings
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
      <v-row align="center">
        <v-col class="grow">
          <p>Your consent for {{dataCategory}} is {{selectedWarnings[dataCategory]["givenConsentValue"]}} but your choice in ConsentHelper is {{selectedWarnings[dataCategory]["consentHelperChoice"]}} </p>
        </v-col>
        <v-col class="shrink">
          <v-btn @click="closeWarnig(dataCategory)">ignore</v-btn>
        </v-col>
      </v-row>
    </v-alert>
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
      lol:"asoijdddddddd",
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
    }
  },
}
</script>

<style>

</style>