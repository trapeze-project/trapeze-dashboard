<template>
  <div>
    <v-tour name="profileTour" :steps="steps" />
    <h1 class="title align-center d-flex">
      {{ $t("links.profile") }}
      <v-icon class="ml-1" @click="$tours.profileTour.start()">
        mdi-help-circle
      </v-icon>
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
        this.$tours.profileTour.start()
        localStorage.setItem('visitedProfile', true)
      }
    }
  }
}
</script>
