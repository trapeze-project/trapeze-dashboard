<template>
  <v-card outlined color="transparent">
    <v-card class="rounded-pill pa-5 ma-3">
      <v-img :src="controller.logo" />
    </v-card>

    <v-card-text>
      <b>{{ controller.name }}</b
      ><br />
      {{ controller.address.streetAddress }}<br />
      {{ controller.address.postalCode }},
      {{ controller.address.addressLocality }}<br />
      {{ controller.url }}<br />


      <br />
      <b>Privacy Policy</b>
      <div>
        <a style="color: blue" :href="controller.privacyPolicyPDF" target="_blank">PDF</a>
        <span>, </span>
        <nuxt-link style="color: blue" :to="`/${controller['@id']}/displayPrivacyPolicy`" target="_blank"
          >JSON-LD</nuxt-link
        >
      </div>
      <br />
      <b>{{ $t("general.dpo") }} ({{ $t("general.dpo-abbrev") }})</b><br />
      {{ controller.alumni[0].name }}<br />
      {{ controller.email }}<br />
      <PContactForm
        ref="PContactForm"
        class="mt-3"
        :contactController="true"
        :company-name="controller.name"
        :btn-name="$t('btn.labels.contact')"
        :email="controller.email"
        v-on="$listeners"
        :showNotification="showNotification"
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    showNotification: {
      type: Function,
    },
    controller: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      controllerId: "",
    };
  },
  created() {},
};
</script>
