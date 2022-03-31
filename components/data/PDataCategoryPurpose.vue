<template>
  <div>
    <p class="font-weight-black ml-4">
      {{ $t('general.category') }}
    </p>
    <p />
    <v-row>
      <v-col cols="4">
        <v-card class="ml-2">
          <v-data-table
            :headers="headers"
            :items="categoriesTransformed"
            class="elevation-1"
            hide-default-header
            hide-default-footer
            single-select
            item-key="name"
            @click:row="handleClick"
          >
            <template #item.name="{ item }">
              {{ item.name }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col v-show="showDataCard" class="mb-4 mr-4">
        <PPurposeCard />
      </v-col>
    </v-row>
    <p />
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    showDataCard: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      headers: [
        {
          text: 'Name',
          value: 'name'
        }
      ]
    }
  },
  computed: {
    categoriesTransformed () {
      return this.categories.map(item => ({ name: item }))
    }
  },
  methods: {
    handleClick (item, row) {
      row.select(true)
      this.showDataCard = item.name === 'Fingerprint'
    }
  }
}
</script>

<style scoped>

</style>
