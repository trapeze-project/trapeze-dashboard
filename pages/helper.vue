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
      <v-row>
        <v-col cols="4">
          <p class="ml-4 font-weight-bold">
            {{ $t('consent.purpose') }}
          </p>
          <v-card class="ml-2">
            <PDataCategory
              :categories="categories"
            />
          </v-card>
        </v-col>
      </v-row>
      <PSensitivity
        :sensitivity="sensitivity"
      />
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
