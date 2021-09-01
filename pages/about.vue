<template>
  <div class="about">
    <v-tour name="indexTour" :steps="steps" :options="options" />
    <h1 class="title mb-2">
      {{ $t('links.about') }}
      <v-btn icon outlined x-small color="black" @click="startTour">
        <v-icon x-small>
          mdi-help
        </v-icon>
      </v-btn>
    </h1>
    <v-divider />
    <br>
    <div>
      <div class="title" about-v-step="0">
        {{ $t('about.controller') }}:
      </div>
      <br>
      <div v-for="(item, index) in companies.controller" :key="index">
        <component :is="item.component" v-bind="item.data" />
        <br>
      </div>
    </div>
    <div>
      <div class="title" about-v-step="1">
        {{ $t('about.provider') }}:
      </div>
      <br>
      <div v-for="(item, index) in companies.provider" :key="index">
        <component :is="item.component" v-bind="item.data" />
        <br>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // middleware: ['auth'],
  asyncData () {
    return { companies: require('@/data/about.json') }
  },
  data: () => ({
    steps: [],
    options: {}
  }),
  mounted () {
    this.setLabels()
    this.setSteps()
    if (!window.localStorage.getItem('about-visited')) {
      window.localStorage.setItem('about-visited', true)
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
          target: '[about-v-step="0"]',
          params: {
            highlight: true,
            placement: 'top'
          },
          content: this.$i18n.t('tour.about.step-0')
        },
        {
          target: '[about-v-step="1"]',
          params: {
            highlight: true,
            placement: 'top'
          },
          content: this.$i18n.t('tour.about.step-1')
        },
        {
          target: '[about-v-step="2"]',
          params: {
            highlight: true,
            placement: 'left'
          },
          content: this.$i18n.t('tour.about.step-2')
        }
      ]
    }
  }
}
</script>
