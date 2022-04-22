<template>
  <v-row>
    <v-col>
      <v-list nav dense>
        <v-list-item-title class="title">
          {{ $t('sidebar-title.navigation') }}
        </v-list-item-title>
        <v-card>
          <v-list-item-group color="primary">
            <v-list-item v-for="link in links" :key="$t('links.'+link.label)" :to="localePath(link.to)" exact>
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
          <v-list-item-group color="primary">
            <v-list-item v-for="link in linksUpdate" :key="$t('linksUpdate.'+link.label)" @click="counter = $t('linksUpdate.'+link.label)" :to="localePath('/consent?tab=consent'+'&selectEvent='+$t('linksUpdate.'+link.label))" exact>
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
