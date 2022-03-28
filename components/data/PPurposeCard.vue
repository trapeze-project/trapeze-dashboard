<template>
  <div>
    <v-card class="warning">
      <v-card-title class="text-uppercase">
        {{ $t('general.warning') }}:
      </v-card-title>
      <v-divider />
      <v-card-text>
        {{ $t('general.unrelatedData') }}:
      </v-card-text>
      <v-card-text>
        <li>
          {{ $t('general.unrelatedDataText') }}
        </li>
      </v-card-text>
      <v-card-text>
        {{ $t('general.bioData') }}:
      </v-card-text>
      <v-card-text>
        <li>
          {{ $t('general.bioDataText') }}
        </li>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
