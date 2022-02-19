<template>
  <div>
    <h1 class="title mb-2">
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

  },
  methods: {
  }
}
</script>
