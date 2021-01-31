<template>
  <PExpandableContainer
    icon="scatter_plot"
    title="Activity-Heatmap"
    :subtitle="'We have collected '+items.length+' activity(s)'"
  >
    <div
      style="padding: 20px"
    >
      <calendar-heatmap
        :values="groupedItemsByDate"
        :end-date="Math.max(... items.map(x=>x.timestamp))"
      />
      <p>
        This diagram shows when how much data has been collected for the last year.
      </p>
    </div>
  </PExpandableContainer>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    groupedItemsByDate () {
      return Object.values(this.items.reduce((acc, current) => {
        if (current.timestamp in acc) {
          acc[current.timestamp].count = acc[current.timestamp].count + 1
        } else {
          acc[current.timestamp] = { date: current.timestamp, count: 1 }
        }
        return acc
      }, {}))
    }
  }
}
</script>
