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
  async asyncData ({ $axios }) {
    const result = await $axios.$get('/api/profile')
    return {
      items: result
    }
  }
}
</script>
