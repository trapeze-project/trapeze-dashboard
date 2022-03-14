<template>
  <v-row>
    <v-col>
      <v-list nav dense>
        <v-list-item-title class="title">
          {{ $t('sidebar-title.navigation') }}
        </v-list-item-title>
        <v-card>
          <v-list-item-group v-model="group" color="primary">
            <v-list-item v-for="(link, index) in links" :key="index" :index-v-step="index" :to="localePath(link.to)" exact>
              <v-list-item-title>
                {{ $t('links.'+link.label) }}
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-card>
      </v-list>
      <v-list nav dense>
        <v-list-item-title class="title">
          {{ $t('sidebar-title.update') }}
        </v-list-item-title>
        <v-card>
          <v-list-item-group v-model="group" color="primary">
            <v-list-item v-for="(link, index) in linksUpdate" :key="index" :index-v-step="index" :to="localePath(link.to)" exact>
              <v-list-item-title>
                {{ $t('linksUpdate.'+link.label) }}
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-card>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      required: true
    },
    linksUpdate: {
      type: Array,
      required: true
    },
    group: {
      type: null,
      required: false,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
