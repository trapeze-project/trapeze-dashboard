<template>
  <div class="about">
    <v-tour name="aboutTour" :steps="steps" />
    <h1 class="title">
      {{ $t('links.about') }}
    </h1>
    <v-divider />
    <br>
    <div>
      <div class="title" about-v-step="0">
        {{ $t('about.controller') }}(s):
      </div>
      <br>
      <div v-for="(item, index) in companies.controller" :key="index">
        <component :is="item.component" v-bind="item.data" />
        <br>
      </div>
    </div>
    <div>
      <div class="title" about-v-step="1">
        {{ $t('about.provider') }}(s):
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
  middleware: ['auth'],
  asyncData () {
    return { companies: require('@/data/about.json') }
  },
  data: () => ({
    steps: [
      {
        target: '[about-v-step="0"]',
        params: {
          highlight: true,
          placement: 'top'
        },
        content:
          'A controller is a company that processes your personal data. In this case us: Finder GmbH. There can be multiple controllers.'
      },
      {
        target: '[about-v-step="1"]',
        params: {
          highlight: true,
          placement: 'top'
        },
        content:
          'A processor is a company that processes your personal data on behalf of the controller(s).'
      },
      {
        target: '[about-v-step="2"]',
        params: {
          highlight: true,
          placement: 'left'
        },
        content:
          'Click the little arrow to take a closer look on a certain company.'
      }
    ]
  }),
  mounted () {
    if (this.$auth.user) {
      if (!localStorage.getItem('visitedAbout')) {
        this.$tours.aboutTour.start()
        localStorage.setItem('visitedAbout', true)
      }
    }
  }
}
</script>
