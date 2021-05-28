<template>
  <div>
    <h1 class="title">
      {{ $t('permissions.advanced-button').charAt(0).toUpperCase() + $t('permissions.advanced-button').slice(1) }}
    </h1>
    <v-divider />
    <div class="permission-container">
      <PConsentList :consents="consents" />
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  async asyncData ({ $axiosbase }) {
    const result = await $axiosbase.$get('/api/permissions')
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
