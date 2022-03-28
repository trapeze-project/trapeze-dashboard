<template>
  <div>
    <h2>
      {{ $t('consent.title') }}
    </h2>
    <v-card>
      <v-card-title style="background-color: #F5F5F5">
        {{ $t('consent.location') }}
      </v-card-title>
      <v-divider />
      <v-card-text>
        {{ $t('consent.text') }}
      </v-card-text>
      <p class="ml-4 font-weight-bold">
        {{ $t('consent.purpose') }}
      </p>
      <v-row>
        <v-col cols="4">
          <PDataCategoryHelper
            :categories="categories"
          />
        </v-col>
        <v-col>
          <PConsentHelperDataCard />
        </v-col>
      </v-row>
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
      page: 1,
      categories: ['Advertising', 'Marketing', 'Identity Verification'],
      sensitivity: 30
    }
  }
}
</script>

<style>

</style>
