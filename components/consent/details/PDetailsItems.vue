<template>
  <div>
    <p class="font-weight-black ml-4">
      {{ $t("general.category") }}
    </p>
    <p />
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6">
        <v-card class="mx-2">
          <v-data-table
            :headers="headers"
            :items="categoriesTransformed"
            hide-default-header
            hide-default-footer
            single-select
            item-key="name"
            @click:row="handleClick_dataCat"
          >
            <template #item.name="{ item }">
              <v-row align="center" justify="center">
                <v-col style="min-width: 100px">
                  <p align="left" class="mt-4">{{ $t(item.name) }}</p>
                </v-col>
                <v-col style="margin-left: 150px">
                  <v-switch v-model="localSwitchValues[item.name]" @change="changeUserChoice(item.name)" />
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col v-show="showDataCard" cols="12" xs="12" sm="12" md="6">
        <PDetailsCard :category-name="categoryName" />
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
    switchvalues: {
      type: Object,
      required: false,
      default () {
        return []
      }
    },
    purpose: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showDataCard: false,
      categoryName: '',
      headers: [
        {
          text: 'Name',
          value: 'name'
        }
      ],
      localSwitchValues: this.switchvalues
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
      this.categoryName = item.name
    },
    changeUserChoice (dataCategory) {
      this.$emit('saveState')
      this.$emit('changeUserChoice', this.purpose, dataCategory, this.localSwitchValues[dataCategory])
    }
  }
}
</script>

<style scoped>
tr.v-data-table__selected {
  background: #000000 !important;
}
</style>
