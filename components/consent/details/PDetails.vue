<template>
  <div>
    <PDetailsHeader :category="heading" />
    <v-row>
      <v-col>
        <PDetailsItems 
          :key="heading" 
          :purpose="heading" 
          :categories="subitems" 
          :switchvalues="switchesValues"
          :tab-name="tabName"
          v-on="$listeners"
        />
      </v-col>
    </v-row>
    <PSensitivity v-show="showSensitivity" :sensitivity="sensitivity[heading]" />
  </div>
</template>

<script>
import sensitivity from '../../../static/data/sensitivity.json'

export default {
  props: {
    heading: String,
    subitems: Array,
    showSensitivity: Boolean,
    switchesValues: Object,
    tabName: String,
  },
  data () {
    return {
      sensitivity
    }
  }
}
</script>
