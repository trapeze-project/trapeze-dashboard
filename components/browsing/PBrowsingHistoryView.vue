<template>
  <PExpandableContainer :disabled="clientFilteredItems.length == 0" title="Your browsing information." :subtitle="'We have collected '+clientFilteredItems.length +' items.'" icon="mdi-web">
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
        Browsing
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
    // TODO: ADD TO TRANSLATION
    headers: [
      { text: 'URL', value: 'url' },
      { text: 'Date', value: 'timestamp' },
      { text: 'User Agent', value: 'user_agent' },
      { text: 'IP-Adress', value: 'ip_address' },
      { text: 'Actions', value: 'actions' }
    ],
    expanded: [],
    singleExpand: false
  })
}
</script>
