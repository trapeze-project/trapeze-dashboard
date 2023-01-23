<template>
  <div>
    <div class="d-inline-flex align-center ml-4">
      <v-switch inset></v-switch>
      <b class="mb-1">Revoke/Withdraw all my consent.</b>
    </div>
    <v-card >
      <v-card-title>{{ this.tabName }}</v-card-title>
      <v-container>
        <v-row>
          <v-col class="fill-height">
            <v-text-field
              style="max-width: 700px"
              :placeholder="'Search for '+tabName"
              outlined
              dense
              clearable
              append-icon="mdi-magnify"
              @click:append="() => {}"
              @keyup.enter="() => {}"
            />
          </v-col>
        </v-row>
        <p>Revoke by purposes. (Click here to revoke by purpose)</p>

        <div>
          <div v-for="parent in Object.keys(modifiedUserChoices)" :key="parent">
            <new-p-details
              :key="$route.fullPath+componentKey.toString()"
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
    }
  },
};
</script>

<style></style>
