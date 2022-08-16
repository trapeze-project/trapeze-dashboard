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
                <v-col class="fill-height" cols="9">
                  {{ $t(item.name) }}
                </v-col>
                <v-col cols="3">
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

<style>
.v-application .v-data-table__mobile-row__cell {
  text-align: left;
  width: 100%;
}
</style>
