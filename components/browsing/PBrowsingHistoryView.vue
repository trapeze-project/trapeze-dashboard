<template>
  <PExpandableContainer
    :disabled="clientFilteredItems.length == 0"
    :title="$i18n.t('data.browsing.title')"
    :subtitle="$i18n.t('data.browsing.subtitle') + ': ' + clientFilteredItems.length"
    icon="mdi-web"
  >
    <div style="padding: 10px">
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
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="timestamp"
        show-expand
      >
        <template v-slot:item.timestamp="{ item }">
          {{ new Date(item.timestamp).toLocaleDateString($i18n.locale,$t('long')) }}
        </template>
        <template v-slot:item.url="{ item }">
          <a :href="item.url" target="_blank">{{ item.url.match(/^.+?[^\/:](?=[?\/]|$)/)[0] }}</a>
        </template>
        <template v-slot:expanded-item="{ item }">
          <td :colspan="headers.length">
            <link-preview :url="item.url" />
          </td>
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
    <PDeleteDialog :show-dialog="dialog" @close-dialog="dialog = false" />
  </PExpandableContainer>
</template>

<script>
import searchableComponentMixin from '../mixins/searchableComponentMixin'
import dateFilterMixin from '../mixins/dateFilterMixin'
export default {
  mixins: [searchableComponentMixin, dateFilterMixin],
  data: () => ({
    dialog: false,
    headers: [],
    expanded: [],
    singleExpand: false
  }),
  mounted () {
    this.setHeader()
  },
  methods: {
    setHeader () {
      this.headers = [
        { text: this.$i18n.t('table-headers.url'), value: 'url' },
        { text: this.$i18n.t('table-headers.date'), value: 'timestamp' },
        { text: this.$i18n.t('table-headers.user-agent'), value: 'user_agent' },
        { text: this.$i18n.t('table-headers.ip'), value: 'ip_address' },
        { text: this.$i18n.t('table-headers.action'), value: 'delete' }
      ]
    }
  }
}
</script>
