<template>
  <div class="ml-3">
    <p class="font-weight-black">
      {{ $t(categoryTitle) }}:
    </p>
    <p />
    <v-row>
      <v-col cols="4">
        <v-card>
          <v-simple-table>
            <thead />
            <tbody>
              <tr>
                <td>
                  {{ $t('consent.ad') }}
                </td>
                <v-switch />
              </tr>
              <tr>
                <td>{{ $t('consent.marketing') }}</td>
                <v-switch />
              </tr>
              <tr>
                <td>{{ $t('consent.id') }} </td>
                <v-switch />
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
    <p />
    <p class="font-weight-black">
      {{ $t('consent.sensitivity') }}
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            small
            v-bind="attrs"
            v-on="on"
          >
            mdi-information-outline
          </v-icon>
        </template>
        <span>This is info</span>
      </v-tooltip>
    </p>
    <v-slider
      style="max-width: 30%"
      readonly
      value="30"
    />
  </div>
</template>

<script>
export default {
  props: {
    categoryTitle: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
