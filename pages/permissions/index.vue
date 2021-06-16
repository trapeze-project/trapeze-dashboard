<template>
  <div>
    <h1 class="title mb-2">
      {{ $t('links.permissions') }}
      <v-btn icon outlined x-small color="black" @click="startTour">
        <v-icon x-small>
          mdi-help
        </v-icon>
      </v-btn>
    </h1>
    <v-tour name="indexTour" :steps="steps" />
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
    </v-row>
  </div>
</template>
<script>
export default {
  // middleware: ['auth'],
  data: () => ({
    consentSwitches: [],
    services: [],
    steps: []
  }),
  mounted () {
    this.setSteps()
    this.setConsentSwitchesAndServices()
    if (!window.localStorage.getItem('permissions-visited')) {
      window.localStorage.setItem('permissions-visited', 'true')
      this.$nextTick(() => this.startTour())
    }
  },
  methods: {
    startTour () {
      this.$tours.indexTour.start()
    },
    setSteps () {
      this.steps = [
        {
          target: '[permission-v-step="0"]',
          params: {
            highlight: true,
            placement: 'bottom',
            enableScrolling: false
          },
          content: this.$i18n.t('tour.permission.step-0')
        },
        {
          target: '[permission-v-step="1"]',
          params: {
            highlight: true,
            placement: 'bottom',
            enableScrolling: false
          },
          content: this.$i18n.t('tour.permission.step-1')
        },
        {
          target: '[permission-v-step="2"]',
          params: {
            highlight: true,
            placement: 'top',
            enableScrolling: false
          },
          content: this.$i18n.t('tour.permission.step-2')
        },
        {
          target: '[permission-v-step="3"]',
          params: {
            highlight: true,
            placement: 'bottom',
            enableScrolling: true
          },
          content: this.$i18n.t('tour.permission.step-3')
        }
      ]
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
