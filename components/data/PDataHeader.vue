<template>
  <div>
    <v-row>
      <v-col>
        <v-card-title style="background-color: #F5F5F5">
          {{ category }}
          <v-switch style="margin-left: 15%" />
        </v-card-title>
        <v-divider />
        <v-card-text>
          {{ $t('consent.text') }}
        </v-card-text>
        <p class="font-weight-black ml-4">
          {{ $t('general.category') }}:
        </p>
        <p />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
