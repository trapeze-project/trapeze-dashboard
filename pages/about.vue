<template>
  <div class="about">
    <h1 class="title mb-2">
      {{ $t('links.about') }}
    </h1>
    <v-divider />
    <br>
    <div>
      <div class="title" about-v-step="0">
        {{ $t('about.controller') }}:
      </div>
      <br>
      <div v-for="(item, index) in companies.controller" :key="index">
        <component :is="item.component" v-bind="item.data" />
        <br>
      </div>
    </div>
    <div>
      <div class="title" about-v-step="1">
        {{ $t('about.provider') }}:
      </div>
      <br>
      <div v-for="(item, index) in companies.provider" :key="index">
        <component :is="item.component" v-bind="item.data" />
        <br>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // middleware: ['auth'],
  asyncData () {
    return { companies: require('@/data/about.json') }
  },
  data: () => ({
    steps: [],
    options: {}
  }),
  mounted () {

  },
  methods: {
  }
}
</script>
