<template>
  <div>
    <v-row>
      <v-col>
        <v-card outlined color="transparent">
          <v-list>
            <v-subheader>
              {{ $t("sidebar-title.navigation") }}
            </v-subheader>

            <v-list-item-group>
              <v-list-item
                v-for="(link, index) in links"
                :key="index"
                :to="localePath(link.to)"
                exact
              >
                <v-list-item-title>
                  {{ $t(link.label) }}
                </v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    group: {
      type: null,
      required: false,
      default: null
    }
  },
  data () {
    return {
      links: [
        { to: '/', label: 'nav.labels.home' },
        { to: '/consent?tab=consent', label: 'nav.labels.consent' },
        { to: '/consent?tab=data', label: 'nav.labels.data' },
        { to: '/consent?tab=purpose', label: 'nav.labels.purposes' },
        { to: '/help', label: 'nav.labels.help' },
        { to: '/faq', label: 'nav.labels.faq' }
      ]
    }
  }
}
</script>
