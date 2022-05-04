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
                v-for="link in links"
                :key="$t('links.' + link.label)"
                :to="localePath(link.to)"
                exact
              >
                <v-list-item-title>
                  {{ $t("links." + link.label) }}
                </v-list-item-title>
              </v-list-item>
            </v-list-item-group>

            <v-subheader>
              {{ $t("sidebar-title.update") }}
            </v-subheader>

            <v-list-item-group color="primary">
              <v-list-item
                v-for="link in linksUpdate"
                :key="$t('linksUpdate.' + link.label)"
                :to="
                  localePath(
                    '/consent?tab=consent' +
                      '&selectEvent=' +
                      $t('linksUpdate.' + link.label)
                  )
                "
                exact
              >
                <v-list-item-title>
                  {{ $t("linksUpdate." + link.label) }}
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
    links: {
      type: Array,
      required: true,
    },
    linksUpdate: {
      type: Array,
      required: true,
    },
    group: {
      type: null,
      required: false,
      default: null,
    },
  },
};
</script>
