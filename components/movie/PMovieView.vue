<template>
  <PExpandableContainer :disabled="clientFilteredItems.length == 0" title="Your movie information." :subtitle="'We have collected '+clientFilteredItems.length +' movies.'" icon="mdi-movie-open">
    <div style="padding: 10px">
      <v-card-title>
        Movies
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          color="coporate"
        />
      </v-card-title>
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
      { text: 'IP-Adress', value: 'ip_address' }
    ]
  }),
  methods: {
    filterItems (items, from, to) {
      return items.filter(item => item.watched_on >= from && item.watched_on <= to)
    }
  }
}
</script>
