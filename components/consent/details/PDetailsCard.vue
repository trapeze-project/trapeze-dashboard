<template>
  <div>
    <v-card class="mr-4 mx-2">
      <v-card-title>
        {{ $t(categoryName) }}
      </v-card-title>
      <v-divider />
      <v-card-text>
        {{ $t(categoryName.replace('dpv.','')) }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    categoryName: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
