<template>
  <div>
    <h1 class="title">
      {{ $t('links.permissions') }}
    </h1>
    <v-divider />
    <div class="permission-container">
      <PConsentList :consents="consents" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const result = await $axios.$get('/api/permissions')
    return {
      consents: result
    }
  }
}
</script>
<style scoped>
.permission-container {
  display: flex;
  justify-content: center;
}
</style>
