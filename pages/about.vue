<template>
  <div class="about">
    <h1 class="title">
      {{ $t('links.about') }}
    </h1>
    <v-divider />
    <br>
    <div>
      <div class="title">
        {{ $t('about.provider') }}(s):
      </div>
      <br>
      <div v-for="(item, index) in companies.provider" :key="index">
        <component :is="item.component" v-bind="item.data" />
        <br>
      </div>
    </div>
    <div>
      <div class="title">
        {{ $t('about.controller') }}(s):
      </div>
      <br>
      <div v-for="(item, index) in companies.controller" :key="index">
        <component :is="item.component" v-bind="item.data" />
        <br>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  asyncData () {
    return { companies: require('@/data/about.json') }
  }
}
</script>
