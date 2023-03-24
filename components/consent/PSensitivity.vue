<template>
  <div>
    <!--
    <p class="font-weight-black ml-4">
      {{ $t("consent.sensitivity") }}
      <v-tooltip right max-width="25%">
        <template v-slot:activator="{ on, attrs }">
          <v-icon small v-bind="attrs" v-on="on">
            mdi-information-outline
          </v-icon>
        </template>
        <v-card>
          <v-card-title>
            {{ $t("consent.sensitivityHeader") }}
          </v-card-title>
          <v-divider />
          <v-card-text>
            {{ $t("consent.sensitivityText") }}
          </v-card-text>
        </v-card>
      </v-tooltip>
    </p>
    -->
    <v-slider
      class="px-3"
      color="black"
      track-color="grey"
      min="1"
      max="10"
      step="1"
      :ticks="true"
      tick-size="0"
      :tick-labels="labels"
      :value="sensitivity"
    />
  </div>
</template>

<script>
export default {
  props: {
    sensitivity: {
      type: Number,
      required: false,
      default: 5
    }
  },
  computed: {
    labels() {
      let labels = new Array(10).fill('');
      labels[0] = this.$t("sensitivity.low");
      labels[9] = this.$t("sensitivity.high");
      return labels;
    }
  }
}
</script>
