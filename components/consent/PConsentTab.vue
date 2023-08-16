<template>
  <div>
    
    <!-- Revoke all button -->
    <v-card elevation="0">

      <!-- Title -->
      <v-card-title class="d-flex pa-0 pb-1">
        {{ this.heading }}
      </v-card-title>

      <v-divider />

      <!-- Description -->
      <v-card-text class="pa-0 my-3">
        {{ this.$t(`consent.desc`) }}
      </v-card-text>

      <!-- Content -->
      <v-container class="pa-0">

        <!-- Search field -->
        <v-row>
          <v-col class="fill-height">
            <v-text-field 
              class="rounded-pill"
              v-model="searchValue"
              :placeholder="$t('placeholder.search-for-' + tabName)" 
              outlined
              dense 
              clearable 
              append-icon="mdi-magnify"
              @keyup.enter="max = 10"
              @click:append="max = 10"
              @click:clear="searchValue = ''; max = 10"
            />
          </v-col>
        </v-row>

        <!-- Withdraw all consent button -->
        <div class="d-flex justify-end mb-3">
          <v-btn class="px-2 rounded-pill" color="error" @click="revokeAll">
            <v-icon class="mr-1"> mdi-alert-rhombus </v-icon>
            {{ $t("btn.labels.withdraw-all-consent") }}
          </v-btn>
        </div>

        <!-- Discard changes button -->
        <div v-if="hasChanged" class="d-flex justify-end mb-3 flex-wrap">
          <v-btn class="px-2 my-3 mt-0 mx-0 rounded-pill" @click="() => $emit('undoAllChanges')" :disabled="!hasChanged">
            <v-icon class="mr-1"> mdi-undo </v-icon>
            {{ $t("btn.labels.discard-changes") }}
          </v-btn>
          
          <!-- Submit changes button -->
          <v-btn :loading="loading" class="px-2 ml-3 rounded-pill black--text" color="primary" @click="() => $emit('submitMyConsent')" :disabled="!hasChanged">
            <v-icon class="mr-1"> mdi-tray-arrow-up </v-icon>
            {{ $t("btn.labels.submit-changes") }}
          </v-btn>
        </div>
        <div>
          <v-select
            v-model="selectedSortOption"
            :items="sortOptions"
            label="Sort By"
          ></v-select>
        </div>


        <!-- Data / Purposes -->
        <div>

          <div v-for="parent in parents.slice(0, max)" :key="parent">
            <PDetails 
              :key="$route.fullPath + componentKey.toString()" 
              :tabName="tabName"
              :parent="parent"
              :children="Object.keys(modifiedUserChoices[parent])"
              :subTree="modifiedUserChoices[parent]"
              @changeUserChoice="changeUserChoice" 
              :openControllerForm="openControllerForm"
              :fetched_DPV_Labels_descriptions="fetched_DPV_Labels_descriptions"
              :userSensitivityValues="modifiedUserSensitivityValues"
              @changeSensitivityValue="changeSensitivityValue"
            />
          </div>

          <div v-if="max < parents.length" class="d-flex justify-center">
            <v-btn
              class="my-2 black--text rounded-pill" 
              color="primary" 
              @click="() => max += max"
            >
              {{ $t("btn.labels.load-more") }}
            </v-btn>
          </div>
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    tabName: {
      type: String,
      required: true,
      validator(value) {
        // The value must match one of these strings
        return ["data", "purpose"].includes(value);
      },
    },
    heading: {
      type: String,
      required: true,
    },
    hasChanged: {
      type: Boolean,
      required: true,
    },
    userChoices: {
      type: Object,
      required: true,
    },
    userSensitivityValues:{
      type: Object,
      required: false,
    },
    openControllerForm:{
      type:Function
    },
    fetched_DPV_Labels_descriptions:{
      type: Object,
      required: true,
      default:{}
    },
    loading:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      revokeAllValue: false,
      searchValue: "",
      componentKey: 0,
      modifiedUserChoices: {},
      modifiedUserSensitivityValues:{},
      max: 10,
      selectedSortOption:null,
      sortOptions: [
        { text: 'Alphabetical Ascending', value: 'alpha-ascending' },
        { text: 'Alphabetical Descending', value: 'alpha-descending' },
        { text: 'Sensitivity Ascending', value: 'sensitive-ascending', disabled: true },
        { text: 'Sensitivity Descending', value: 'sensitive-descending', disabled: true },
      ]
    };
  },
  watch: {
    userChoices: {
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          this.modifiedUserChoices = Object.assign({}, newVal);
        }
        // set the value of revokeAll switch
        let allConsentValues = [];
        for (const [parent, children] of Object.entries(this.modifiedUserChoices)) {
          for (const [child, consentValue] of Object.entries(children)) {
            allConsentValues.push(this.modifiedUserChoices[parent][child]);
          }
        }
        if (allConsentValues.includes(true)) {
          this.revokeAllValue = false;
        }
        else {
          this.revokeAllValue = true;
        }
      },
      deep: true,
    },
    userSensitivityValues: {
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          this.modifiedUserSensitivityValues = Object.assign({}, newVal);
        }
      },
      deep: true,
    },
    loading(newVal,oldVal){
      this.loading=newVal
    }
  },
  computed: {
    DPV_Labels_descriptions(){
      return this.fetched_DPV_Labels_descriptions[this.$i18n.locale];
    },

    parents() {
      let unsortedParents = Object
        .keys(this.modifiedUserChoices)
        .filter((e) => {
          let label = this.DPV_Labels_descriptions.labels[e].toLowerCase();
          return label.includes((this.searchValue) ? this.searchValue : '');
        });

      if(['alpha-ascending','alpha-descending'].includes(this.selectedSortOption)){
        let sign = this.selectedSortOption === 'alpha-ascending' ? 1 : -1;
        return unsortedParents.sort((a, b) => sign* a.localeCompare(b))



      }else if(['sensitive-ascending','sensitive-descending'].includes(this.selectedSortOption)){
        // sort by sensitive
        return unsortedParents; 

      }else{
        return unsortedParents;
      }
    }
  },
  created() {
    this.selectedSortOption="alpha-ascending";
    this.modifiedUserChoices = this.userChoices;
    this.modifiedUserSensitivityValues = this.userSensitivityValues;
  },
  methods: {
    debug(dataCategoryName, sensitivityCurrentValue){
      // console.log("lol"+dataCategoryName, sensitivityCurrentValue)
    },
    changeUserChoice(parent, child, newConsentValue) {
      this.modifiedUserChoices[parent][child] = newConsentValue;
      this.updateUserChoice();
    },
    changeSensitivityValue(dataCategoryName, sensitivityCurrentValue){
      this.modifiedUserSensitivityValues[dataCategoryName]=sensitivityCurrentValue;
      this.updateUserSensitivityValue()
    },
    forceRerender() {
      this.componentKey += 1;
    },
    revokeAll() {
      let tempModifiedUserChoices = Object.assign({}, this.modifiedUserChoices);
      for (const [parent, children] of Object.entries(tempModifiedUserChoices)) {
        for (const [child, consentValue] of Object.entries(children)) {
          tempModifiedUserChoices[parent][child] = false;
        }
      }
      this.modifiedUserChoices = Object.assign({}, tempModifiedUserChoices);
      this.updateUserChoice();
      this.forceRerender();
    },
    updateUserChoice() {
      this.$emit("changeUserChoice", {
        "tab": this.tabName,
        "userChoices": this.modifiedUserChoices,
      })
    },
    updateUserSensitivityValue() {
      this.$emit("changeUserSensitivityValue", {
        "userSensitivityValues": this.modifiedUserSensitivityValues,
      })
    },
    handleOpenFormButton(){
      let subject = 'Right to Request Access to Personal Data'
      this.openControllerForm(subject)
    }
  }
};
</script>