<template>
  <v-card outlined color="transparent">
    <v-img :src="controller.logo" />
    <v-card-text>
      <b>{{ controller.name }}</b><br>
      {{ controller.address.streetAddress }}<br>
      {{ controller.address.postalCode }}, {{ controller.address.addressLocality }}<br>
      {{ controller.url }}<br>
      <br>
      <div>
        <a href="privacyPolicy">Privacy Policy (pdf)</a>
      </div>
      

      <b>{{ $t("general.dpo") }} ({{ $t("general.dpo-abbrev") }})</b><br>
      {{ controller.alumni[0].name }}<br>
      {{ controller.email }}<br>
      <PControllerContact
        class="mt-3"
        :company-name="controller.name"
        :btn-name="$t('btn.labels.contact')"
        :email="controller.email"
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    controller: {
      type: Object,
      default: () => {}
    }
  },
  data(){
    return{
      controllerId:""
    }
  },
  created(){

  }
}
</script>
