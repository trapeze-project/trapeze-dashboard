<template>
  <div>
    <h1 class="title">
      {{ $t('links.profile') }}
    </h1>
    <v-divider />
    <br>
    <PProfileView :items="items" />
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  async asyncData ({ $axiosbase }) {
    const result = await $axiosbase.$get('/api/profile')
    return {
      items: result
    }
  }
}
</script>
