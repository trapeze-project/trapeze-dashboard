<template>
  <div>
    <v-simple-table>
      <thead />
      <tbody>
        <tr
          v-for="item in categories"
          :key="item"
        >
          <td>{{ item }}</td>
          <v-switch />
        </tr>
      </tbody>
    </v-simple-table>
    <p />
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
