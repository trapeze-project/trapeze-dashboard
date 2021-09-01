<template>
  <div>
    <v-tour name="indexTour" :steps="steps" :options="options" />
    <h1 class="title mb-2">
      {{ $t('links.data') }}
      <v-btn icon outlined x-small color="black" @click="startTour">
        <v-icon x-small>
          mdi-help
        </v-icon>
      </v-btn>
    </h1>
    <v-divider />
    <div style="display: none;">
      <v-spacer />
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="400px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateRangeText"
            label="Time-Range"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          />
        </template>
        <v-date-picker
          v-model="dates"
          no-title
          scrollable
          range
        />
      </v-menu>
    </div>
    <br>
    <div v-for="(item, index) in components.slice(1)" :key="index">
      <component :is="item.component" :data-v-step="index" v-bind="item" :from="Date.parse(dates[0])" :to="Date.parse(dates[1])" />
      <br>
      <br>
    </div>
  </div>
</template>
<script>
export default {
  // middleware: ['auth'],
  async asyncData ({ $axios }) {
    const result = await $axios.$get('/api/fetch')
    return {
      components: result.components
    }
  },
  data: () => ({
    searchTimeRange: [1],
    dates: [],
    menu: false,
    steps: [],
    options: {}
  }),
  computed: {
    dateRangeText () {
      return this.dates.join(' ~ ')
    }
  },
  mounted () {
    this.setLabels()
    this.setSteps()
    if (!window.localStorage.getItem('data-visited')) {
      window.localStorage.setItem('data-visited', true)
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
          target: '[data-v-step="0"]',
          params: {
            highlight: true,
            placement: 'top'
          },
          content: this.$i18n.t('tour.data.step-0')
        },
        {
          target: '[data-v-step="1"]',
          params: {
            highlight: true,
            placement: 'top'
          },
          content: this.$i18n.t('tour.data.step-1')
        },
        {
          target: '[data-v-step="2"]',
          params: {
            highlight: true,
            placement: 'top'
          },
          content: this.$i18n.t('tour.data.step-2')
        }/*,
        {
          target: '[data-v-step="3"]',
          params: {
            highlight: true,
            placement: 'left'
          },
          content: this.$i18n.t('tour.data.step-3')
        }
        */
      ]
    }
  }
}
</script>
