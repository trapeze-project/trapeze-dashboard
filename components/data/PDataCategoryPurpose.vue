<template>
  <div>
    <p class="font-weight-black ml-4">
      {{ $t('general.category') }}
    </p>
    <p />
    <v-row>
      <v-col>
        <v-card class="ml-2">
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
        </v-card>
      </v-col>
    </v-row>
    <p />
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
