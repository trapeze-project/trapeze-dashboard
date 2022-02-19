<template>
  <div>
    <h1 class="title mb-2">
      {{ $t("links.profile") }}
    </h1>
    <v-divider />
    <br>
    <PProfileView :items="items" />
  </div>
</template>

<script>
export default {
  // middleware: ['auth'],
  /* async */asyncData ({ $axios }) {
    // const result = await $axios.$get('/api/profile')
    const res = { user: { username: 'Test user' } }
    return {
      items: res
    }
  },
  data: () => ({
    steps: [],
    options: {}
  }),
  mounted () {
  },

  methods: {
  }
}
</script>
