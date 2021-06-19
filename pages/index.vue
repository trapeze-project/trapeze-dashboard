<template>
  <div id="index">
    <v-tour name="indexTour" :steps="steps" :options="options" />
    <h1 class="title mb-2">
      {{ $t('home.title') }}
      <v-btn icon outlined x-small color="black" @click="startTour">
        <v-icon x-small>
          mdi-help
        </v-icon>
      </v-btn>
    </h1>
    <v-divider />
    <br>
    <v-row justify="center" align="center">
      <v-col
        v-for="(item, idx) in Object.values($t('home.items'))"
        :key="idx"
        cols="12"
        sm="12"
        md="3"
        lg="3"
      >
        <PExplainCard :title="item.title" :content="item.content" :filename="item.filename" :href="item.link" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  // middleware: ['auth'],
  data: () => ({
    steps: [],
    options: {}
  }),
  mounted () {
    this.setLabels()
    this.setSteps()
    if (!window.localStorage.getItem('index-visited')) {
      window.localStorage.setItem('index-visited', true)
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
          target: '[index-v-step="0"]',
          header: {
            title: this.$i18n.t('tour.index.step-0-title')
          },
          params: {
            highlight: true,
            placement: 'bottom'
          },
          content: this.$i18n.t('tour.index.step-0')
        },
        {
          target: '[index-v-step="1"]',
          header: {
            title: this.$i18n.t('tour.index.step-1-title')
          },
          params: {
            highlight: true,
            placement: 'bottom'
          },
          content: this.$i18n.t('tour.index.step-1')
        },
        {
          target: '[index-v-step="2"]',
          header: {
            title: this.$i18n.t('tour.index.step-2-title')
          },
          params: {
            highlight: true,
            placement: 'bottom'
          },
          content: this.$i18n.t('tour.index.step-2')
        },
        {
          target: '[index-v-step="3"]',
          header: {
            title: this.$i18n.t('tour.index.step-3-title')
          },
          params: {
            highlight: true,
            placement: 'bottom'
          },
          content: this.$i18n.t('tour.index.step-3')
        },
        {
          target: '[index-v-step="4"]',
          header: {
            title: this.$i18n.t('tour.index.step-4-title')
          },
          params: {
            highlight: true,
            placement: 'bottom'
          },
          content: this.$i18n.t('tour.index.step-4')
        },
        {
          target: '[index-v-step="5"]',
          header: {
            title: this.$i18n.t('tour.index.step-5-title')
          },
          params: {
            highlight: true
          },
          content: this.$i18n.t('tour.index.step-5')
        }
      ]
    }
  }
}
</script>
