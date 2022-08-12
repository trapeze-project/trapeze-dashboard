<template>
  <v-card outlined color="transparent">
    <v-img src="/img/company.png" />
    <v-card-text>
      {{ this.companyInformation.name }}<br>
      {{ this.companyInformation.add1 }}<br>
      {{ this.companyInformation.add2 }}<br>
      {{ this.companyInformation.website }}<br>
      <br>
      {{ this.companyInformation.position }}<br>
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
      companyInformation: {}
    }
  },
  created () {
    this.companyInformation = controller.companyInformation;
  }
}
</script>
