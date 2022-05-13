<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="imports.category"
      :item-key="headers[0].value"
      single-select
      @click:row="select"
    >
      <template v-if="tabName === 'purpose' || tabName === 'data'"  v-slot:item.issue="{ item }">
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
      v-if="view.showPDetails"
      :heading="view.selected[this.tabName]"
      :subitems="imports.categoryMap[view.selected[this.tabName]]"
      :showSensitivity="false"
    />
    <div v-if="view.showPEmail" id="PEmail" class="mt-4">
      <PEmail :date="view.selected.date" :event="view.selected.event" />
    </div>
  </div>
</template>

<script>
import purposes from "../../../static/data/purposes.json";
import dataPurposesMap from "../../../static/data/data.purposes.map.json";
import data from "../../../static/data/data.json";
import emails from "../../../static/data/emails.json";

export default {
  props: {
    tabName: {
      type: String,
      required: true,
      validator(value) {
        // The value must match one of these strings
        return ['consent', 'data', 'purpose'].includes(value)
      }
    },
  },
  data() {
    return {
      imports: {
        category: "",
        categoryMap: "",
      },
      view: {
        selected: "",
        showPDetails: false,
        showPEmail: false,
      },
      headers: "",
    };
  },
  created(){
    if(this.tabName === "consent"){
      this.imports.category = emails;
    }
    if (this.tabName === "data"){
      this.imports.category = data;
      this.imports.categoryMap  = dataPurposesMap;
    }
    if( this.tabName === "purpose"){
      this.imports.category = purposes;
      this.imports.categoryMap  = dataPurposesMap;
    }
    this.headers = Object.keys(this.imports.category[0]).map((e) => ({
        text: e.charAt(0).toUpperCase() + e.slice(1),
        value: e,
        align: "start",
      }));
  },
  methods: {
    select(item, row) {
      row.select(true);
      this.view.selected = item;
      if(this.tabName === 'purpose' || this.tabName === 'data'){
        this.view.showPDetails = true;
      }
      if(this.tabName === 'consent'){
        this.view.showPEmail = true;
      }
    },
  },
};
</script>