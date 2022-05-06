<template>
  <div>
    <v-row>
      <v-col cols="4">
        
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
        
      </v-col>
      <v-col v-show="isHidden_helper">
        <PConsentHelperDataCard :category-name="categoryName" />
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
      isHidden_helper: false,
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
    handleClick(item, row) {
      this.isHidden_helper = true;
      row.select(true);
      this.categoryName = item.name;
    },
  },
};
</script>

<style scoped>
</style>
