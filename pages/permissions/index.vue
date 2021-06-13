<template>
  <div>
    <v-tour name="permissionTour" :steps="steps" />
    <h1 class="title align-center d-flex">
      {{ $t('links.permissions') }}
      <v-icon class="ml-1" @click="$tours.permissionTour.start()">
        mdi-help-circle
      </v-icon>
    </h1>
    <v-divider />
    <br>
    <PConsentOverview v-model="consentSwitches" permission-v-step="0" />
    <br>
    <PConsentSlider v-model="consentSwitches" :services="services" />
    <!-- <v-row style="padding: 0 15px">
      <v-spacer />
      <v-btn color="primary" :href="localePath('/permissions/advanced')">
        {{ $t('permissions.advanced-button') }}
      </v-btn>
    </v-row> -->
  </div>
</template>
<script>
export default {
  middleware: ['auth'],
  // TODO: ADD TO TRANSLATION
  data: () => ({
    consentSwitches: [
      { icon: 'mdi-map-marker', value: true, description: 'Location history', consentRank: 5, share: 'We can collect your location history and use it for anlyzing your actions etc.' },
      { icon: 'mdi-bank', value: false, description: 'Bank account', consentRank: 6, share: 'We have access to your bank account to file monthly payments.' },
      { icon: 'mdi-email', value: true, description: 'Email adress', consentRank: 1, share: 'We have access to your email-adress and can give it to third parties.' },
      { icon: 'mdi-account-circle', value: true, description: 'Profile', consentRank: 2, share: 'We have access to your profile information for analyzing your ...' },
      { icon: 'mdi-home', value: false, description: 'Physical Address', consentRank: 3, share: 'We have access to your physical address for sending you packages.' },
      { icon: 'mdi-web', value: true, description: 'Browsing activity', consentRank: 4, share: 'We have access to your browsing histroy for ...' }
    ],
    services: {
      'Location history': 'You get the eatTogethter feature were we locate the neareest restaurant for you and your friends',
      'Bank account': 'You are able to pay with paypal in all restaurants',
      'Email adress': 'You are getting notifactions when a new rest is planing to open',
      Profile: 'You are getting personalized ads',
      'Physical Address': 'You are getting food delivery to your home',
      'Browsing activity': 'You are getting personalized ads'
    },
    steps: [
      {
        target: '[permission-v-step="0"]',
        params: {
          highlight: true,
          placement: 'bottom'
        },
        content: 'See your personal data you agreed us using to use <strong>Finder</strong>.'
      },
      {
        target: '[permission-v-step="1"]',
        params: {
          highlight: true,
          placement: 'top'
        },
        content: "See how much you're sharing with us."
      },
      {
        target: '[permission-v-step="2"]',
        params: {
          highlight: true,
          placement: 'right'
        },
        content: 'Learn more about the types of personal data you share with us...'
      },
      {
        target: '[permission-v-step="3"]',
        params: {
          highlight: true,
          placement: 'left'
        },
        content: '... and what you get in return.'
      }
    ]
  }),
  mounted () {
    if (this.$auth.user) {
      if (!localStorage.getItem('visitedPermission')) {
        this.$tours.permissionTour.start()
        localStorage.setItem('visitedPermission', true)
      }
    }
  }
}
</script>
