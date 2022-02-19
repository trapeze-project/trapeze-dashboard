<template>
  <div>
    <h1 class="title mb-2">
      {{ $t('links.permissions') }}
    </h1>
    <v-divider />
    <br>
    <PConsentOverview v-model="consentSwitches" />
    <br>
    <PConsentSlider v-model="consentSwitches" :services="services" />
    <v-row style="display: none; padding: 0 15px">
      <v-spacer />
      <v-btn color="primary" :href="localePath('/permissions/advanced')">
        {{ $t('permissions.advanced-button') }}
      </v-btn>
    </v-row> -->
  </div>
</template>
<script>
export default {
  // middleware: ['auth'],
  data: () => ({
    consentSwitches: [],
    services: [],
    steps: [],
    options: {}
  }),
  mounted () {
    this.setConsentSwitchesAndServices()
  },

  methods: {
    setLabels () {
    },
    setConsentSwitchesAndServices () {
      this.consentSwitches = [
        {
          icon: 'mdi-email',
          value: true,
          description: this.$i18n.t('permissions.email-address.label'),
          consentRank: 1,
          share: this.$i18n.t('permissions.email-address.share')
        },
        {
          icon: 'mdi-account-circle',
          value: true,
          description: this.$i18n.t('permissions.profile.label'),
          consentRank: 2,
          share: this.$i18n.t('permissions.profile.share')
        },
        {
          icon: 'mdi-crosshairs-gps',
          value: true,
          description: this.$i18n.t('permissions.current-location.label'),
          consentRank: 5,
          share: this.$i18n.t('permissions.current-location.share')
        },
        {
          icon: 'mdi-map-marker',
          value: true,
          description: this.$i18n.t('permissions.location-history.label'),
          consentRank: 5,
          share: this.$i18n.t('permissions.location-history.share')
        },
        {
          icon: 'mdi-web',
          value: true,
          description: this.$i18n.t('permissions.browsing-history.label'),
          consentRank: 4,
          share: this.$i18n.t('permissions.browsing-history.share')
        }
      ]
      this.services = [
        this.$i18n.t('permissions.email-address.get'),
        this.$i18n.t('permissions.profile.get'),
        this.$i18n.t('permissions.current-location.get'),
        this.$i18n.t('permissions.location-history.get'),
        this.$i18n.t('permissions.browsing-history.get')
      ]
    }
  }
}
</script>
