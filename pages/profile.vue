<template>
  <div>
    <v-tour name="indexTour" :steps="steps" :options="options" />
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
    steps: [],
    options: {}
  }),
  mounted () {
    this.setLabels()
    this.setSteps()
    if (!window.localStorage.getItem('profile-visited')) {
      window.localStorage.setItem('profile-visited', true)
      this.$nextTick(() => this.startTour())
    }
  },
  beforeDestroy () {
    this.$tours.indexTour.stop()
  },
  methods: {
    startTour () {
      this.$tours.indexTour.start()
    },
    setLabels () {
      this.options = {
        labels: {
          buttonSkip: this.$i18n.t('tour.buttons.skip'),
          buttonPrevious: this.$i18n.t('tour.buttons.prev'),
          buttonNext: this.$i18n.t('tour.buttons.next'),
          buttonStop: this.$i18n.t('tour.buttons.finish')
        }
      }
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
