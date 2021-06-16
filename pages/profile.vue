<template>
  <div>
    <v-tour name="indexTour" :steps="steps" />
    <h1 class="title mb-2">
      {{ $t("links.profile") }}
      <v-btn icon outlined x-small color="black" @click="startTour">
        <v-icon x-small>
          mdi-help
        </v-icon>
      </v-btn>
    </h1>
    <v-divider />
    <br>
    <PProfileView :items="items" />
  </div>
</template>

<script>
export default {
  // middleware: ['auth'],
  /* async */asyncData ({ $axios }) {
    // const result = await $axios.$get('/api/profile')
    const res = { user: { username: 'Test user' } }
    return {
      items: res
    }
  },
  data: () => ({
    steps: []
  }),
  mounted () {
    this.setSteps()
    if (!window.localStorage.getItem('profile-visited')) {
      window.localStorage.setItem('profile-visited', true)
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
          target: '[profile-v-step="0"]',
          params: {
            highlight: true,
            placement: 'top'
          },
          content: this.$i18n.t('tour.profile.step-0')
        },
        {
          target: '[profile-v-step="1"]',
          params: {
            highlight: true,
            placement: 'left'
          },
          content: this.$i18n.t('tour.profile.step-1')
        }
      ]
    }
  }
}
</script>
