<template>
  <v-card flat>
    <v-card-title>
      {{ $t(category) }}
      

      <v-spacer />

      <v-btn class="black--text" color="primary">
        {{ $t("general.access") }}
      </v-btn>
    </v-card-title>
    <v-divider />

    <v-card-text>
      {{ $t("consent.text") }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      required: true,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
</style>
