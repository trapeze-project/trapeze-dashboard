<template>
  <PExpandableContainer :disabled="clientFilteredItems.length == 0" title="Your browsing information." :subtitle="'We have collected '+clientFilteredItems.length +' items.'" icon="mdi-web">
    <div style="padding: 10px">
      <v-card-title>
        Browsing
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          color="primary"
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="clientFilteredItems"
        :search="search"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="timestamp"
        show-expand
      >
        <template v-slot:item.timestamp="{ item }">
          {{ new Date(item.timestamp).toLocaleDateString($i18n.locale,$t('long')) }}
        </template>
        <template v-slot:item.url="{ item }">
          <a :href="item.url">{{ item.url.match(/^.+?[^\/:](?=[?\/]|$)/)[0] }}</a>
        </template>
        <template v-slot:expanded-item="{ item }">
          <td :colspan="headers.length">
            <link-preview :url="item.url" />
          </td>
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
      { text: 'URL', value: 'url' },
      { text: 'Date', value: 'timestamp' },
      { text: 'User Agent', value: 'user_agent' },
      { text: 'IP-Adress', value: 'ip_address' }
    ],
    expanded: [],
    singleExpand: false
  })
}
</script>
