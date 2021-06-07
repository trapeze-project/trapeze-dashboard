<template>
  <div>
    <v-tour name="indexTour" :steps="steps" />
    <h1 class="title">
      {{ $t('links.data') }}
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
  middleware: ['auth'],
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
    steps: [
      {
        target: '[data-v-step="0"]',
        params: {
          highlight: true,
          placement: 'top'
        },
        content:
          'Your data is grouped into multiple categories.'
      },
      {
        target: '[data-v-step="1"]',
        params: {
          highlight: true,
          placement: 'top'
        },
        content:
          'You can inspect each category individually.'
      },
      {
        target: '[data-v-step="2"]',
        params: {
          highlight: true,
          placement: 'top'
        },
        content:
          'Click the little arrow to take a closer look on a certain category.'
      }/*,
      {
        target: '[data-v-step="3"]',
        params: {
          highlight: true,
          placement: 'left'
        },
        content:
          'To delete some data, just click the bin icon next to the data. The controller will be notified to delete the data permanently.'
      }
      */
    ]
  }),
  computed: {
    dateRangeText () {
      return this.dates.join(' ~ ')
    }
  },
  mounted () {
    this.$tours.indexTour.start()
  }
}
</script>
