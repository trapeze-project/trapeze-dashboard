<template>
  <div>
    <h2>
      {{ $t('consent.title') }}
    </h2>
    <v-carousel hide-delimiters light height="400" :show-arrows="false" v-model="page">
      <v-carousel-item v-for="datatyp in dataTypes" :key="datatyp">
        <v-card>
          <v-card-title style="background-color: #F5F5F5">
            {{ $t('consent.'+datatyp) }}
          </v-card-title>
          <v-divider />
          <v-card-text>
            {{ $t('consent.text') }}
          </v-card-text>
          <p class="ml-4 font-weight-bold">
            {{ $t('consent.purpose') }}
          </p>
          <PDataCategoryHelper :categories="categories" />
        </v-card>
      </v-carousel-item>
    </v-carousel>
    <div class="text-center">
      <v-btn @click="page--" class="grey darken-2 custom-transform-class text-none white--text" :disabled="page===0">Back</v-btn>
      <v-btn @click="page++" class="primary custom-transform-class text-none white--text" :disabled="page===dataTypes.length-1">Next</v-btn>
    </div>
    <div class="text-center mb-3">
      Page {{page+1}}/{{dataTypes.length}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Helper',
  data () {
    return {
      categoryTitle: 'consent.purpose',
      dataTypes: ['location', 'bank', 'credit', 'fingerprint', 'name'],
      page: 0,
      categories: ['Advertising', 'Marketing', 'Identity Verification'],
      sensitivity: 30
    }
  }
}
</script>

<style>

</style>
