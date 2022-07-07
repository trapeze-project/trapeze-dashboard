<template>
  <div >
    <b class="ml-3">{{$t('consent.warnings')}}</b>
    <v-alert
      v-for="dataCategory in Object.keys(selectedWarnings)"
      :key="dataCategory"
      shaped
      dense
      dark
      prominent
      type="warning"
      class="mx-1"
    >
      <p>{{$t('consent.warningMsg',{dataCategory:$t(dataCategory) , purpose: $t(purpose) , helperChoices:$t(selectedWarnings[dataCategory]["consentHelperChoice"])})}}</p>
      <v-spacer />
      <div class="mb-1 float-right">
        <v-btn @click="fixWarnig(dataCategory)">
          {{$t('btn.labels.fix')}}
        </v-btn>
        <v-btn @click="closeWarnig(dataCategory)">
          {{$t('btn.labels.ignore')}}
        </v-btn>
      </div>
    </v-alert>
    <div class="float-right">
      <v-btn class="white--text " color="red" @click="fixAllWarnigs">
        {{$t('btn.labels.fix-all')}}
      </v-btn>
      <v-btn class="black--text " color="primary" @click="closeAllWarnings">
        {{$t('btn.labels.ignore-all')}}
      </v-btn>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  props: {
    selectedWarnings: Object,
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
  }
}
</script>

<style>

</style>
