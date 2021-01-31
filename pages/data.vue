<template>
  <div>
    <div v-for="(item, index) in components" :key="index">
      <component :is="item.component" v-bind="item" />
      <br>
      <br>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData ({ $axios }) {
    const result = await $axios.$get('/api/fetch')
    return {
      components: result.components
    }
  }
}
</script>
