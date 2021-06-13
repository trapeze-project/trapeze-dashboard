
<template>
  <PExpandableContainer :disabled="clientFilteredItems.length == 0" title="Your location information." :subtitle="'We have collected '+clientFilteredItems.length +' locations.'" icon="location_on" @clicked="updateSize()">
    <v-dialog v-model="deleteDialog" max-width="400px">
      <template>
        <v-card>
          <v-toolbar
            color="primary"
            dark
          >
            Deletion request
          </v-toolbar>
          <br>
          <v-card-text>
            <div>
              By hitting send, you can send a request for deletetion to you controller.
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              text
              @click="abortDeletion"
            >
              Close
            </v-btn>
            <v-btn
              text
              @click="deleteItem"
            >
              Send
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
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
          <v-card-title>
            Locations and Date:
          </v-card-title>
          <v-data-table :headers="headers" :items="clientFilteredItems" :items-per-page="5" @click:row="handleClick">
            <template v-slot:item.timestamp="{ item }">
              {{ new Date(item.timestamp).toLocaleDateString($i18n.locale,$t('long')) }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                @click="openDeleteDialog(item)"
              >
                mdi-delete
              </v-icon>
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
      { text: 'Location', value: 'address' },
      { text: 'Actions', value: 'actions' }
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
