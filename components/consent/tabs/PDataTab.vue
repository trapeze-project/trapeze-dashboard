<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="imports.data"
      item-key="data"
      single-select
      @click:row="select"
    >
      <template v-slot:item.issue="{ item }">
        <v-chip
          label
          :color="item.issue === '0 issues' ? 'transparent' : 'orange'"
        >
          {{ item.issue }}
        </v-chip>
      </template>
    </v-data-table>

    <PDetails 
      class="mt-4"
      v-if="view.show"
      :heading="view.selected"
      :subitems="imports.dataPurposesMap[view.selected]"
      :showSensitivity="true"
    />
    
  </div>
</template>

<script>
import data from "../../../static/data/data.json";
import dataPurposesMap from "../../../static/data/data.purposes.map.json";

export default {
  data() {
    return {
      imports: {
        data: data,
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