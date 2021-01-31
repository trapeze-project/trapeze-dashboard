<template>
  <div class="about">
    <h1 class="title">
      About
    </h1>
    <v-divider />
    <br>
    <div v-for="(value, name) in companies" :key="name">
      <div class="title">
        {{ name.charAt(0).toUpperCase() + name.slice(1) }}(s):
      </div>
      <br>
      <div v-for="(item, index) in value" :key="index">
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
