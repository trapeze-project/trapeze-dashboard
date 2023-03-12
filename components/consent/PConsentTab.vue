<template>
  <div>

    <!-- Revoke all button -->
    <v-btn class="my-2 black--text" color="primary" @click="revokeAll">
      Withdraw all my consent
    </v-btn>

    <v-card>

      <!-- Title -->
      <v-card-title>
        {{ this.tabName }}
      </v-card-title>

      <!-- Description -->
      <v-card-text>
        {{ this.$t(`consent.${this.tabName}Description`) }}
      </v-card-text>

      <!-- Content -->
      <v-container>

        <!-- Search field -->
        <v-row>
          <v-col class="fill-height">
            <v-text-field v-model="searchValue" :placeholder="'Search for ' + tabName" outlined
              dense clearable append-icon="mdi-magnify" @click:append="search" @click:clear="filteredParent = null"
              @keyup.enter="search" />
          </v-col>
        </v-row>

        <!-- Search suggestions -->
        <!--
        <div v-if="!filteredParent && searchValue">
          <v-card outlined class="mb-2">

            <v-card-title>
              avaliable Categories are:
            </v-card-title>

            <v-card-text>
              <span v-for="parent in Object.keys(modifiedUserChoices)" :key="parent">
                {{ $t(`dpv.labels.${parent}`) }}
              </span>
            </v-card-text>

          </v-card>
        </div>
        -->

        <!-- Search results -->
        <div v-if="filteredParent">
          <!-- TODO: what if Object.keys(modifiedUserChoices).length > 100 ? -->
          <PDetails :key="$route.fullPath + componentKey.toString()" :tabName="tabName" :parent="filteredParent"
            :children="Object.keys(modifiedUserChoices[filteredParent])" :subTree="modifiedUserChoices[filteredParent]"
            @changeUserChoice="changeUserChoice" />
        </div>

        <!-- Data / Purposes -->
        <div v-if="!filteredParent || searchValue === ''">

          <!-- TODO: what if Object.keys(modifiedUserChoices).length > 100 ? -->
          <!-- TODO: hint to search function -->
          <!-- TODO: fix search function -->
          <div v-for="parent in Object.keys(modifiedUserChoices)" :key="parent">

            <PDetails :key="$route.fullPath + componentKey.toString()" :tabName="tabName" :parent="parent"
              :children="Object.keys(modifiedUserChoices[parent])" :subTree="modifiedUserChoices[parent]"
              @changeUserChoice="changeUserChoice" />

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
        return [, "data", "purpose"].includes(value);
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
      filteredParent: null,
      componentKey: 0,
      modifiedUserChoices: {},
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
    search() {
      Object.keys(this.modifiedUserChoices).forEach((element) => {
        if (this.$t(`dpv.labels.${element}`).toLowerCase() ===
          this.searchValue.toLowerCase()) {
          this.filteredParent = element;
        }
      });
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

<style></style>
