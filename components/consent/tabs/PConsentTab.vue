<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="emails"
      item-key="date"
      class="elevation-0"
      single-select
      @click:row="select"
    />

    <div v-if="view.show" id="PEmail" class="mt-4">
      <PEmail :date="view.selected.date" :event="view.selected.event" />
    </div>
  </div>
</template>

<script>
import emails from "../../../static/data/emails.json";

export default {
  data() {
    return {
      emails: emails,
      view: {
        selected: "",
        show: false,
      },
      headers: Object.keys(emails[0]).map((e) => ({
        text: e.charAt(0).toUpperCase() + e.slice(1),
        value: e,
        align: "start",
      })),
    };
  },
  methods: {
    select(item, row) {
      row.select(true);
      this.view.selected = item;
      this.view.show = true;
    },
  },
};
</script>