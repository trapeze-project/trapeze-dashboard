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
            @click:row="handleClick_dataCat"
          >
            <template #item.name="{ item }">
              {{ item.name }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col v-show="showDataCard">
        <PDataCard :category-name="categoryName" />
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
    }
  },
  data () {
    return {
      categoryName: '',
      showDataCard: false,
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
    handleClick_dataCat (item, row) {
      this.showDataCard = true
      row.select(true)
      console.log(row.isSelected)
      this.categoryName = item.name
    }
  }
}
</script>

<style scoped>
tr.v-data-table__selected {
  background: #000000 !important;
}
</style>
