<template>
  <div>
    <h1 class="title">
      {{ $t('links.permissions') }}
    </h1>
    <v-divider />

    <br>
    <PConsentOverview v-model="consentSwitches" />
    <br>
    <PConsentSlider v-model="consentSwitches" :services="services" />
    <!--<div class="permission-container">
      <PConsentList :consents="consents" />
    </div>-->
  </div>
</template>
<script>
export default {
  async asyncData ({ $axios }) {
    const result = await $axios.$get('/api/permissions')
    return {
      consents: result
    }
  },
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
    }
  })
}
</script>
<style scoped>
.permission-container {
  display: flex;
  justify-content: center;
}
</style>
