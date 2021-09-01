<template>
  <PExpandableContainer :disabled="clientFilteredItems.length == 0" title="Your movie information." :subtitle="'We have collected '+clientFilteredItems.length +' movies.'" icon="mdi-movie-open">
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
    <div style="padding: 10px">
      <v-card-title>
        Movies
      </v-card-title>
      <v-row>
        <v-col
          cols="10"
          sm="10"
          md="5"
          lg="5"
          xl="5"
          style="width:100%"
          offset="1"
          offset-md="7"
          offset-lg="7"
        >
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            color="primary"
          />
        </v-col>
      </v-row>

      <br>
      <v-data-table
        :headers="headers"
        :items="clientFilteredItems"
        :search="search"
      >
        <template v-slot:item.thumbnail="{ item }">
          <v-img
            max-height="80"
            max-width="120"
            contain
            :src="item.thumbnail"
          />
        </template>
        <template v-slot:item.watched_on="{ item }">
          {{ new Date(item.watched_on).toLocaleDateString($i18n.locale,$t('long')) }}
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
  </PExpandableContainer>
</template>

<script>
import searchableComponentMixin from '../mixins/searchableComponentMixin'
import dateFilterMixin from '../mixins/dateFilterMixin'
export default {
  mixins: [searchableComponentMixin, dateFilterMixin],
  data: () => ({
    headers: [
      { text: 'Thumbnail', value: 'thumbnail' },
      { text: 'Last Watched', align: 'start', value: 'watched_on' },
      { text: 'Title', value: 'movie_title' },
      { text: 'Genre', value: 'movie_genre' },
      { text: 'Total Watchtime', value: 'duration' },
      { text: 'Language', value: 'language' },
      { text: 'IP-Adress', value: 'ip_address' },
      { text: 'Actions', value: 'actions' }
    ]
  }),
  methods: {
    filterItems (items, from, to) {
      return items.filter(item => item.watched_on >= from && item.watched_on <= to)
    }
  }
}
</script>
