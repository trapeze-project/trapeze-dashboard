<template>
  <div>
    <v-row>
      <v-col>
        <v-card-title style="background-color: #F5F5F5">
          {{ category }}
          <v-switch style="position: absolute; margin-left: 265px" />
          <v-spacer />
          <v-btn color="orange">
            {{ $t('general.access') }}
          </v-btn>
        </v-card-title>
        <v-divider />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card-text>
          {{ $t('consent.text') }}
        </v-card-text>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
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
