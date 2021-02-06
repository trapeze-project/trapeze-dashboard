<template>
  <div>
    <h1 class="title">
      My Data
    </h1>
    <v-divider />
    Selected TimeRange: {{ new Date(Date.now()).toLocaleDateString($i18n.locale,$t('short')) }} -
    <v-chip-group
      v-model="searchTimeRange"
      single-row
    >
      <v-chip filter outlined>
        Last Month
      </v-chip>
      <v-chip filter outlined>
        Last Year
      </v-chip>
      <v-chip filter outlined>
        All Time
      </v-chip>
      <v-chip filter outlined>
        Custom
      </v-chip>
    </v-chip-group>
    <br>
    <div v-for="(item, index) in components" :key="index">
      <component :is="item.component" v-bind="item" />
      <br>
      <br>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData ({ $axios }) {
    const result = await $axios.$get('/api/fetch')
    return {
      components: result.components
    }
  },
  data: () => ({
    searchTimeRange: [1]
  })
}
</script>
