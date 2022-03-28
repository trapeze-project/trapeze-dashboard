<template>
  <div>
    <v-card class="mr-4">
      <v-card-title>
        {{ categoryName }}
      </v-card-title>
      <v-divider />
      <v-card-text>
        {{ $t('consent.text_ad') }}
        <p />
        <v-row>
          <v-col cols="2">
            <v-img src="/pie_chart.jpg" max-width="100" max-height="100" />
          </v-col>
          <v-col>
            <p class="mt-6">
              0 % of your data are used for the purpose of {{ categoryName }}
            </p>
          </v-col>
        </v-row>
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
