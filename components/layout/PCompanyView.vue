<template>
  <v-card outlined color="transparent">
    <v-img :src="this.companyInformation.companyLogoPath" />
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
  </v-card>
</template>

<script>
import controller from '../../static/data/controller.json'

export default {
  data () {
    return {
      companyInformation: {},
      companyName : this.$nuxt.$route.path.split('/')[2]
    }
  },
  created () {
    this.companyInformation = this.$GlobalVariables.dataController.companyInformation
  }
}
</script>
