<template>
  <div>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="categoriesTransformed"
          class="elevation-1"
          hide-default-footer
          single-select
          item-key="name"
          @click:row="handleClick"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>
                {{ item.name }}
              </td>
              <td>
                <v-radio :name="item.name" value="0" />
              </td>
              <td>
                <v-radio :name="item.name" value="1" />
              </td>
              <td>
                <v-radio :name="item.name" value="2" />
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row v-show="isHidden_helper">
      <v-col>
        <PConsentHelperDataCard :category-name="categoryName" />
      </v-col>
    </v-row>
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
          text: "Purpose",
          align: "start",
          value: "name",
        },
        {
          text: "Fine",
          align: "start",
          value: "fine",
        },
        {
          text: "Neutral",
          align: "start",
          value: "neutral",
        },
        {
          text: "No",
          align: "start",
          value: "no",
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