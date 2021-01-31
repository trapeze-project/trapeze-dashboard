<template>
  <div>
    <h1 class="title">
      Activities
    </h1>
    <v-divider />
    <br>
    <PHeatMapView :items="activities" />
    <br>
    <PAnyView :items="activities" />
  </div>
</template>
<script>
export default {
  async asyncData ({ $axios }) {
    const result = await $axios.$get('/api/fetch?original=true')
    return {
      activities: result
    }
  }
}
</script>
