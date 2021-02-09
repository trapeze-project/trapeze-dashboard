<template>
  <v-list style="width: 60%">
    <v-text-field
      v-model="search"
      prepend-inner-icon="search"
      style="width:50%; margin-left: auto"
      label="Search Policy"
      hide-details="auto"
      color="primary"
      clearable
    />
    <br>

    <div v-for="(item, index) in filteredConsents" :key="index">
      <v-subheader><b>{{ index.toUpperCase() }}</b></v-subheader>
      <v-divider />
      <div v-if="filteredConsents[index].length === 0" style="text-align: center">
        <br>
        There is no policy matching...
      </div>
      <div v-for="(consent, i) in item" v-else :key="i">
        <PConsentSwitch :active="consent.active">
          {{ consent.paragraph }}
        </PConsentSwitch>
        <v-divider inset />
      </div>
    </div>
  </v-list>
</template>
<script>
export default {
  props: {
    consents: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    search: ''
  }),
  computed: {
    filteredConsents () {
      if (this.search === null || this.search === '') {
        return this.consents
      } else {
        return Object.fromEntries(Object.entries(this.consents).map(([key, v]) => [key, v.filter(item => item.paragraph.toLowerCase().includes(this.search.toLowerCase()))]))
      }
    }
  }
}
</script>

<style scoped>
</style>
