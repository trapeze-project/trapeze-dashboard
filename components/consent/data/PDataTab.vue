<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="imports.data"
      item-key="data"
      class="elevation-1"
      single-select
      @click:row="select"
    >
      <template v-slot:item.issue="{ item }">
        <v-chip
          label
          :color="'transparent'"
          :text-color="item.issue === '0 issues' ? 'black' : 'red'"
        >
          {{ item.issue }}
        </v-chip>
      </template>
    </v-data-table>

    <div v-if="view.show">
      <PDataHeader :category="view.selected" />

      <PDataCategory
        :category="view.selected"
        :key="view.selected"
        :categories="imports.dataPurposesMap[view.selected]"
      />

      <PSensitivity :sensitivity="imports.sensitivity[view.selected]" />
    </div>
  </div>
</template>

<script>
import data from "../../../static/data/data.json";
import sensitivity from "../../../static/data/sensitivity.json";
import dataPurposesMap from "../../../static/data/data.purposes.map.json";

export default {
  data() {
    return {
      imports: {
        data: data,
        sensitivity: sensitivity,
        dataPurposesMap: dataPurposesMap,
      },
      view: {
        selected: "",
        show: false,
      },
      headers: Object.keys(data[0]).map((e) => ({
        text: e.charAt(0).toUpperCase() + e.slice(1),
        value: e,
        align: "start",
      })),
    };
  },
  methods: {
    select(item, row) {
      row.select(true);
      this.view.selected = item.data;
      this.view.show = true;
    },
  },
};
</script>