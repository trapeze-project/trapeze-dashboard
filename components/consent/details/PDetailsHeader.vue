<template>
  <v-card flat>
    <v-card-title>
      {{ $t(category) }}

      <v-spacer />
      <!--
      <v-btn class="black--text" color="primary">
        {{ $t("general.access") }}
      </v-btn>
      -->
    </v-card-title>
    <v-divider />

    <v-card-text style="white-space:pre-line">{{ $t(category.replace('dpv.','')).interpolate(paramsForInterpolation) }}</v-card-text>

  </v-card>
</template>

<script>
import controller from '../../../static/data/controller.json'
export default {
  props: {
    category: {
      type: String,
      required: true,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      paramsForInterpolation: {}
    }
  },
  created () {
    this.paramsForInterpolation = this.$store.state.dataController.paramsForInterpolation


  },
}
</script>

<style scoped>
</style>
