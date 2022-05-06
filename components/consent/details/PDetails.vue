<template>
  <div>
    <PDetailsHeader :category="heading" />
    <v-row>
      <v-col>
        <PDetailsItems :categories="subitems" />
      </v-col>
    </v-row>
    <PSensitivity v-show="showSensitivity" :sensitivity="sensitivity[heading]" />
  </div>
</template>

<script>
import sensitivity from "../../../static/data/sensitivity.json";

export default {
  props: {
    heading: String,
    subitems: Array,
    showSensitivity: Boolean,
  },
  data() {
    return {
      sensitivity: sensitivity
    };
  },
};
</script>