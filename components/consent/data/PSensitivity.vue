<template>
  <div>
    <p class="font-weight-black ml-4">
      {{ $t('consent.sensitivity') }}
      <v-tooltip right max-width="25%" color="white">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            small
            v-bind="attrs"
            v-on="on"
          >
            mdi-information-outline
          </v-icon>
        </template>
        <v-card>
          <v-card-title style="background-color: #F5F5F5">
            {{ $t('consent.sensitivityHeader') }}
          </v-card-title>
          <v-divider />
          <v-card-text>
            {{ $t('consent.sensitivityText') }}
          </v-card-text>
        </v-card>
      </v-tooltip>
    </p>
    <v-slider
      style="max-width: 30%"
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
      default: 0
    }
  }
}
</script>

<style scoped>

</style>
