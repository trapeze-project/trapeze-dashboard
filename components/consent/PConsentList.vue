<template>
  <v-list style="width: 60%">
    <div v-for="(item, index) in consents" :key="index">
      <v-subheader><b>{{ index.toUpperCase() }}</b></v-subheader>
      <v-divider />
      <div v-for="(consent, i) in item" :key="i">
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
  }
}
</script>

<style scoped>
</style>
