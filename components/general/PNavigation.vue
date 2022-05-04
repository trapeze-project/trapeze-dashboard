<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
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

            <v-subheader>
              {{ $t("sidebar-title.update") }}
            </v-subheader>

            <v-list-item-group color="primary">
              <v-list-item
                v-for="(link, index) in updates"
                :key="index"
                :to="
                  localePath(
                    '/consent?tab=consent' + '&selectEvent=' + $t(link.label)
                  )
                "
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
      default: null,
    },
  },
  data() {
    return {
      links: [
        { to: "/", label: "nav.labels.home" },
        { to: "/consent?tab=consent", label: "nav.labels.consent" },
        { to: "/consent?tab=data", label: "nav.labels.data" },
        { to: "/consent?tab=purpose", label: "nav.labels.purposes" },
        { to: "/help", label: "nav.labels.help" },
        { to: "/faq", label: "nav.labels.faq" },
      ],
      updates: [
        { to: "/update", label: "updates.1" },
        { to: "/revocation", label: "updates.2" },
        { to: "/request", label: "updates.3" },
      ],
    };
  },
};
</script>
