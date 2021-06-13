<template>
  <PExpandableContainer
    :disabled="clientFilteredItems.length == 0"
    :title="$i18n.t('data.location.title')"
    :subtitle="$i18n.t('data.location.subtitle') + ': ' + clientFilteredItems.length"
    icon="location_on"
    @clicked="updateSize()"
  >
    <v-row gutter style="padding:10px">
      <v-col
        md="12"
        lg="6"
        xl="6"
        sm="12"
        cols="12"
      >
        <div class="d-flex flex-column flex-nowrap" style="height: 100%">
          <div style="flex:1" />
          <v-data-table :headers="headers" :items="clientFilteredItems" :items-per-page="5" @click:row="handleClick">
            <template v-slot:item.timestamp="{ item }">
              {{ new Date(item.timestamp).toLocaleDateString($i18n.locale,$t('long')) }}
            </template>
            <template v-slot:item.delete="">
              <v-btn icon outlined x-small color="black" @click="dialog = true">
                <v-icon x-small>
                  mdi-trash-can-outline
                </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </div>
      </v-col>
      <v-col
        class="d-none d-lg-block d-xl-block"
        md="12"
        lg="6"
        xl="6"
        sm="12"
        cols="12"
      >
        <client-only>
          <l-map ref="mymap" :zoom="zoom" :center="center" style="width: 100%;min-height:300px;z-index: 0">
            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
            <l-marker v-for="(item, index) in clientFilteredItems" :key="index" :lat-lng="[item.lat, item.lon]" />
          </l-map>
        </client-only>
      </v-col>
    </v-row>
    <PDeleteDialog :show-dialog="dialog" @close-dialog="dialog = false" />
  </PExpandableContainer>
</template>
<script>
import dateFilterMixin from '../mixins/dateFilterMixin'
export default {
  mixins: [dateFilterMixin],
  data: () => ({
    dialog: false,
    center: [],
    zoom: 13,
    headers: []
  }),
  mounted () {
    this.setHeader()
  },
  created () {
    if (this.items !== undefined && this.items.length > 0) {
      this.changeCenter(this.items[0].lat, this.items[0].lon)
    }
  },
  methods: {
    setHeader () {
      this.headers = [
        { text: this.$i18n.t('table-headers.date'), value: 'timestamp', align: 'start' },
        { text: this.$i18n.t('table-headers.location'), value: 'address', align: 'start' },
        { text: this.$i18n.t('table-headers.action'), value: 'delete', align: 'start' }
      ]
    },
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
