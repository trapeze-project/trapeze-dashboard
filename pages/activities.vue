<template>
  <div>
    <h1 class="title">
      {{ $t('links.log') }}
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
  middleware: ['auth'],
  async asyncData ({ $axiosbase }) {
    const result = await $axiosbase.$get('/api/fetch?original=true')
    return {
      activities: result
    }
  }
}
</script>
