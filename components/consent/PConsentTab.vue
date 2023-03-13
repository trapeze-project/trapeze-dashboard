<template>
  <div>

    <!-- Revoke all button -->
    <v-btn class="my-2 black--text" color="primary" @click="revokeAll">
      Withdraw all my consent
    </v-btn>

    <v-card elevation="0">

      <!-- Title -->
      <v-card-title class="pa-0 my-3">
        {{ this.tabName }}
      </v-card-title>

      <!-- Description -->
      <v-card-text class="pa-0 my-3">
        {{ this.$t(`consent.${this.tabName}Description`) }}
      </v-card-text>

      <!-- Content -->
      <v-container class="pa-0">

        <!-- Search field -->
        <v-row>
          <v-col class="fill-height">
            <v-text-field 
              v-model="searchValue"
              :placeholder="'Search for ' + tabName" 
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
            />
          </div>

          <div v-if="max < parents.length" class="d-flex justify-center">
            <v-btn
              class="my-2 black--text" 
              color="primary" 
              @click="() => max += max"
            >
              Load more
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
    userChoices: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      revokeAllValue: false,
      searchValue: "",
      componentKey: 0,
      modifiedUserChoices: {},
      max: 10,
    };
  },
  watch: {
    userChoices: {
      handler(new_value, old_value) {
        if (JSON.stringify(new_value) !== JSON.stringify(old_value)) {
          this.modifiedUserChoices = JSON.parse(JSON.stringify(new_value));
        }
        // set the value of revokeAll switch
        let allConcentValues = [];
        for (const [parent, children] of Object.entries(this.modifiedUserChoices)) {
          for (const [child, consentValue] of Object.entries(children)) {
            allConcentValues.push(this.modifiedUserChoices[parent][child]);
          }
        }
        if (allConcentValues.includes(true)) {
          this.revokeAllValue = false;
        }
        else {
          this.revokeAllValue = true;
        }
      },
      deep: true,
    },
  },
  computed: {
    parents() {
      return Object
        .keys(this.modifiedUserChoices)
        .filter((e) => {
          let label = this.$t(`dpv.labels.${e}`).toLowerCase();
          return label.includes((this.searchValue) ? this.searchValue : '');
        });
    }
  },
  created() {
    this.modifiedUserChoices = JSON.parse(JSON.stringify(this.userChoices));
  },
  methods: {
    changeUserChoice(parent, child, newConsentValue) {
      this.modifiedUserChoices[parent][child] = newConsentValue;
    },
    forceRerender() {
      this.componentKey += 1;
    },
    revokeAll() {
      let tempModifiedUserChoices = JSON.parse(JSON.stringify(this.modifiedUserChoices));
      for (const [parent, children] of Object.entries(tempModifiedUserChoices)) {
        for (const [child, consentValue] of Object.entries(children)) {
          tempModifiedUserChoices[parent][child] = false;
        }
      }
      this.modifiedUserChoices = JSON.parse(JSON.stringify(tempModifiedUserChoices));
      this.forceRerender();
    },
  }
};
</script>