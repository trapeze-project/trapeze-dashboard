<template>
  <PExpandableContainer :disabled="clientFilteredItems.length == 0" title="Your location information." :subtitle="'We have collected '+clientFilteredItems.length +' locations.'" icon="location_on" @clicked="updateSize()">
    <v-row gutter style="padding:10px">
      <v-col
        md="12"
        lg="6"
        xl="6"
        sm="12"
        cols="12"
        order-md="2"
        order="2"
        order-sm="2"
        order-lg="1"
        order-xl="1"
      >
        <div class="table-row-column">
          <div style="flex:1" />
          <v-card-title>
            Locations and Date:
          </v-card-title>
          <v-data-table :headers="headers" :items="clientFilteredItems" :items-per-page="5" @click:row="handleClick">
            <template v-slot:item.timestamp="{ item }">
              {{ new Date(item.timestamp).toLocaleDateString($i18n.locale,$t('long')) }}
            </template>
          </v-data-table>
        </div>
      </v-col>
      <v-col
        md="12"
        lg="6"
        xl="6"
        sm="12"
        cols="12"
        order-md="1"
        order="1"
        order-sm="1"
        order-lg="2"
        order-xl="2"
      >
        <client-only>
          <l-map ref="mymap" :zoom="zoom" :center="center" style="width: 100%;min-height:300px;z-index: 0">
            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
            <l-marker v-for="(item, index) in clientFilteredItems" :key="index" :lat-lng="[item.lat, item.lon]" />
          </l-map>
        </client-only>
      </v-col>
    </v-row>
  </PExpandableContainer>
</template>
<script>
import dateFilterMixin from '../mixins/dateFilterMixin'
export default {
  mixins: [dateFilterMixin],
  data: () => ({
    center: [],
    zoom: 13,
    headers: [
      { text: 'Date', value: 'timestamp' },
      { text: 'Location', value: 'address' }
    ]
  }),
  created () {
    if (this.items !== undefined && this.items.length > 0) {
      this.changeCenter(this.items[0].lat, this.items[0].lon)
    }
  },
  methods: {
    changeCenter (lat, lon) {
      this.center = [lat, lon]
    },
    handleClick (value) {
      this.changeCenter(value.lat, value.lon)
      this.zoom = 13
    },
    updateSize () {
      setTimeout(() => {
        this.$refs.mymap.mapObject.invalidateSize()
      }, 200)
    }
  }
}
</script>

<style scoped>
.table-row-column {
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
}
</style>
