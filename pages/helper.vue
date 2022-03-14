<template>
  <div>
    <h2>
      {{ $t('consent.title') }}
    </h2>
    <v-card>
      <v-card-title style="background-color: #F5F5F5">
        {{ $t('consent.location') }}
        <br>
      </v-card-title>
      <v-divider />
      <v-card-text>
        {{ $t('consent.text') }}
      </v-card-text>
      <PDataCategory :categoryTitle="categoryTitle" />
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="4"
          circle
        />
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Helper',
  data () {
    return {
      categoryTitle: 'consent.purpose',
      page: 1
    }
  }
}
</script>

<style>

</style>
