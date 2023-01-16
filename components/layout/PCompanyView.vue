<template>
  <v-card outlined color="transparent">
    <v-img :src="companyInformation.companyLogoPath" alt="pic unavailable"/>
    <v-card-text>
      <b>{{ this.companyInformation.name }}</b><br>
      {{ this.companyInformation.add1 }}<br>
      {{ this.companyInformation.add2 }}<br>
      {{ this.companyInformation.website }}<br>
      <br>

      <b>{{ $t("general.dpo") }} ({{ $t("general.dpo-abbrev") }})</b><br>
      {{ this.companyInformation.posName }}<br>
      {{ this.companyInformation.email }}<br>
      <PContactFirm
        class="mt-3"
        :company-name="companyInformation.name"
        :btn-name="$t('btn.labels.contact')"
        :email="companyInformation.email"
      />
    </v-card-text>
    <div v-show="false">
      {{this.$store.state.dataController}}
    </div>
  </v-card>
</template>

<script>

export default {
  data () {
    return {
      companyInformation: {},
      companyName : this.$nuxt.$route.path.split('/')[2]
    }
  },
  created () {
    this.companyInformation = this.$store.state.dataController.companyInformation
  }
}
</script>
