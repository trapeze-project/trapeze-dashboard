<template>
  <div>
    <p class="font-weight-black ml-4">
      {{ $t('consent.sensitivity') }}
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            small
            v-bind="attrs"
            v-on="on"
          >
            mdi-information-outline
          </v-icon>
        </template>
        <span>This is info</span>
      </v-tooltip>
    </p>
    <v-slider
      style="max-width: 30%"
      readonly
      :value="sensitivity"
    />
  </div>
</template>

<script>
export default {
  props: {
    sensitivity: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
