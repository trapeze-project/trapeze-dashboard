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
      max="5"
      step="1"
      ticks="always"
      tick-size="4"
      :tick-labels="['Not sensitive', 'a little sensitive', 'neutral', 'sensitive', 'very sensitive']"
      :value="sensitivity"
    />
  </div>
</template>

<script>
export default {
  props: {
    sensitivity: {
      type: Number,
      required: true,
      default: 3
    }
  }
}
</script>
