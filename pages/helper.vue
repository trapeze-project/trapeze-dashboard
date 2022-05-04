<template>
  <div>
    <v-card>
      <v-card-title>
        {{ $t('consent.title') }}
      </v-card-title>

      <v-card-text>
      <v-carousel hide-delimiters light height="400" :show-arrows="false" v-model="page">
        <v-carousel-item v-for="datatyp in dataTypes" :key="datatyp">

          <div>
            <div>
              {{ $t('consent.'+datatyp) }}
            </div>

            <v-divider class="my-3" />

            <div class="my-3">
              {{ $t('consent.text') }}
            </div>
            
            <p class="font-weight-bold">
              {{ $t('consent.purpose') }}
            </p>
            
            <PDataCategoryHelper 
              class="mt-3"
              :categories="categories" 
            />
          </div>

        </v-carousel-item>
      </v-carousel>

      <div class="text-center">
        <v-btn @click="page--" class="grey darken-2 custom-transform-class text-none white--text" :disabled="page===0">Back</v-btn>
        <v-btn @click="page++" class="primary custom-transform-class text-none white--text" :disabled="page===dataTypes.length-1">Next</v-btn>
      </div>
      <div class="text-center mb-3">
        Page {{page+1}}/{{dataTypes.length}}
      </div>

      </v-card-text>
    </v-card>
    
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
