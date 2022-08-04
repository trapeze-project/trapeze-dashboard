<template>
  <div>
    <v-row>
      <v-col>
        <v-card outlined color="transparent">
          <v-list>
            <v-subheader>
              {{ $t("sidebar-title.navigation") }}
            </v-subheader>
            <div
              v-for="link in links"
              :key="link.label"
            >
              <v-list-group
                v-if="link.subLinks"
              >
                <template v-slot:activator>
                  <v-list-item-title>
                    <v-list-item-content>
                      {{ $t(link.label) }}
                    </v-list-item-content>
                  </v-list-item-title>
                </template>
                <v-list-item
                  v-for="sub in link.subLinks"
                  :key="sub.label"
                  class="pl-12"
                  :to="localePath(localePath(sub.to))"
                  exact
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ $t(sub.label) }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
              <v-list-item v-else :to="localePath(link.to)" exact>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t(link.label) }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
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
        {
          to: '/consent?tab=consent',
          label: 'nav.labels.consent',
          subLinks: [
            { to: '/consent?tab=consent', label: 'nav.labels.consent' },
            { to: '/consent?tab=data', label: 'nav.labels.data' },
            { to: '/consent?tab=purpose', label: 'nav.labels.purposes' }
          ]
        },
        { to: '/help', label: 'nav.labels.help' },
        { to: '/faq', label: 'nav.labels.faq' }
      ]
    }
  }
}
</script>
