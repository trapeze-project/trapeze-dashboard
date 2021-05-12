<template>
  <PExpandableContainer :disabled="clientFilteredItems.length == 0" :title="dataType+' Log'" :subtitle="'We have collected '+clientFilteredItems.length +' '+dataType.toLowerCase()+'(s)'" icon="mdi-format-list-text">
    <div style="padding: 10px">
      <v-card-title>
        {{ dataType }}s
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
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="timestamp"
        show-expand
        class="elevation-1"
        :search="search"
      >
        <template v-slot:item.timestamp="{ item }">
          {{ new Date(item.timestamp).toLocaleDateString($i18n.locale,$t('long')) }}
        </template>
        <template v-slot:item.data="{ item }">
          {{ item.data.split('#')[1] }}
        </template>
        <template v-slot:item.purpose="{ item }">
          {{ item.purpose.split('#')[1] }}
        </template>
        <template v-slot:item.processing="{ item }">
          {{ item.processing.split('#')[1] }}
        </template>
        <template v-slot:item.storage="{ item }">
          {{ item.storage.split('#')[1] }}
        </template>
        <template v-slot:item.recipient="{ item }">
          {{ item.recipient.split('#')[1] }}
        </template>
        <template v-slot:expanded-item="{ item }">
          <td :colspan="headers.length">
            <pre>
              {{ item | pretty }}
            </pre>
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
  filters: {
    pretty (value) {
      const str = JSON.stringify(value, null, 2)
      const strArr = str.split('\n')
      strArr.unshift('\t')
      return strArr.join('\n')
    }
  },
  mixins: [searchableComponentMixin, dateFilterMixin],
  props: {
    dataType: {
      type: String,
      default: 'Activity'
    }
  },
  data: () => ({
    expanded: [],
    singleExpand: true
  }),
  computed: {
    headers () {
      return [
        { text: 'Date', align: 'start', value: 'timestamp' },
        { text: 'Data', value: 'data' },
        { text: 'Purpose', value: 'purpose' },
        { text: 'Processing', value: 'processing' },
        { text: 'Storage', value: 'storage' },
        { text: 'Recipient', value: 'recipient' }
      ]
    }
  }
}
</script>
