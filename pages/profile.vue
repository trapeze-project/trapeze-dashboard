<template>
  <div>
    <v-tour name="loginTour" :steps="steps" />
    <h1 class="title">
      {{ $t("links.profile") }}
    </h1>
    <v-divider />
    <br>
    <PProfileView :items="items" />
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  async asyncData ({ $axios }) {
    const result = await $axios.$get('/api/profile')
    return {
      items: result
    }
  },
  data: () => ({
    steps: [
      {
        target: '[profile-v-step="0"]',
        params: {
          highlight: true,
          placement: 'top'
        },
        content:
          'Your data is grouped into multiple categories.'
      },
      {
        target: '[profile-v-step="1"]',
        params: {
          highlight: true,
          placement: 'left'
        },
        content:
          'Click the little arrow to take a closer look on a certain category.'
      }
    ]
  }),
  mounted () {
    if (this.$auth.user) {
      if (!localStorage.getItem('visitedProfile')) {
        this.$tours.loginTour.start()
        localStorage.setItem('visitedProfile', true)
      }
    }
  }
}
</script>
