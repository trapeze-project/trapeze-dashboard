<template>
  <div>
    <p class="font-weight-black ml-4">
      {{ $t("general.category") }}
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
            @click:row="handleClick_dataCat"
          >
            <template #item.name="{ item }">
              <v-row style="height: 10px" class="mb-8">
                <v-col cols="8">
                  {{ item.name }}
                </v-col>
                <v-col cols="4">
                  <v-switch class="mt-n1 ml-8" />
                </v-col>
              </v-row>
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
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      showDataCard: false,
      categoryName: "",
      headers: [
        {
          text: "Name",
          value: "name",
        },
      ],
    };
  },
  computed: {
    categoriesTransformed() {
      return this.categories.map((item) => ({ name: item }));
    },
  },
  methods: {
    handleClick_dataCat(item, row) {
      this.showDataCard = true;
      row.select(true);
      this.categoryName = item.name;
    },
  },
};
</script>

<style scoped>
tr.v-data-table__selected {
  background: #000000 !important;
}
</style>
