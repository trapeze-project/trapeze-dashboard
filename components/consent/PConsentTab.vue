<template>
  <div>
    <div class="d-inline-flex align-center ml-4">
      <v-switch v-model="revokeAllValue" @change="revokeAll" inset></v-switch>
      <b class="mb-1">Revoke/Withdraw all my consent.</b>
    </div>
    <v-card>
      <v-card-title>{{ this.tabName }}</v-card-title>
      <v-container>
        <v-row>
          <v-col class="fill-height">
            <v-text-field
              v-model="searchValue"
              style="max-width: 700px"
              :placeholder="'Search for ' + tabName"
              outlined
              dense
              clearable
              append-icon="mdi-magnify"
              @click:append="search"
              @click:clear="filteredParent = null"
              @keyup.enter="search"
            />
          </v-col>
        </v-row>
        <div v-if="!filteredParent && searchValue">
          <v-card outlined class="mb-2">
            <v-card-title> avaliable Categories are : </v-card-title>
            <v-card-text>
              <span
                v-for="parent in Object.keys(modifiedUserChoices)"
                :key="parent"
              >
                {{ $t(`dpv.labels.${parent}`) }}
              </span>
            </v-card-text>
          </v-card>
        </div>

        <p>
          Revoke by {{ this.tabName }}. (Click here to revoke by
          {{ this.tabName }})
        </p>
        <div v-if="filteredParent">
          <new-p-details
            :key="$route.fullPath + componentKey.toString()"
            :tabName="tabName"
            :parent="filteredParent"
            :children="Object.keys(modifiedUserChoices[filteredParent])"
            :subTree="modifiedUserChoices[filteredParent]"
            @changeUserChoice="changeUserChoice"
          />
        </div>

        <div v-if="!filteredParent || searchValue === ''">
          <div v-for="parent in Object.keys(modifiedUserChoices)" :key="parent">
            <new-p-details
              :key="$route.fullPath + componentKey.toString()"
              :tabName="tabName"
              :parent="parent"
              :children="Object.keys(modifiedUserChoices[parent])"
              :subTree="modifiedUserChoices[parent]"
              @changeUserChoice="changeUserChoice"
            />
          </div>
        </div>
      </v-container>
    </v-card>
    <div>{{ this.modifiedUserChoices }}</div>
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
        for (const [parent, children] of Object.entries(
          this.modifiedUserChoices
        )) {
          for (const [child, consentValue] of Object.entries(children)) {
            allConcentValues.push(this.modifiedUserChoices[parent][child]);
          }
        }
        if(allConcentValues.includes(true)){
          this.revokeAllValue = false
        }else{
           this.revokeAllValue = true
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
        if (
          this.$t(`dpv.labels.${element}`).toLowerCase() ===
          this.searchValue.toLowerCase()
        ) {
          this.filteredParent = element;
        }
      });
    },
    revokeAll(value) {
      let tempModifiedUserChoices = JSON.parse(JSON.stringify(this.modifiedUserChoices))

      console.log(tempModifiedUserChoices )

      for (const [parent, children] of Object.entries(
        tempModifiedUserChoices
      )) {
        for (const [child, consentValue] of Object.entries(children)) {
          console.log(`${parent} ${child} `)
          tempModifiedUserChoices[parent][child]= !value

        }
      }
      this.modifiedUserChoices = JSON.parse(
        JSON.stringify(tempModifiedUserChoices)
      );
      this.forceRerender();
    },
  },
};
</script>

<style></style>
