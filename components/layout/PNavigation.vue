<template>
  <div>
    <v-row>
      <v-col>
        <v-card outlined color="transparent">
          <v-list dense rounded>
            <v-subheader>
              {{ $t("sidebar-title.navigation") }}
            </v-subheader>

            <div v-for="link in links" :key="link.label">

              <div v-if="link.type === 'divider'">
                <v-divider class="my-3"/>
              </div>

              <v-list-item
                class="rounded-pill"
                v-else 
                :to="
                  (link.type === 'function')
                    ? null
                    : localePath(link.to)
                "
                @click="
                  (link.type === 'function')
                    ? link.to()
                    : null;
                "
                exact 
                :disabled="link.isDisabled"
              >

                <v-list-item-icon class="mr-0">
                  <v-icon small v-text="link.icon"></v-icon>
                </v-list-item-icon>                    

                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t(link.label) }}
                  </v-list-item-title>
                </v-list-item-content>              

                <!--
                <v-tooltip right>
                  <template v-slot:activator="{ on }">

                    <v-list-item-icon class="mr-0">
                      <v-icon small v-text="link.icon"></v-icon>
                    </v-list-item-icon>                    

                    <v-list-item-content v-on="on">
                      <v-list-item-title>
                        {{ $t(link.label) }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <span> {{ $t(link.label) }} </span>
                </v-tooltip>
                -->

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
    controller: {
      type: Object,
    },
    mobile: {
      type: Boolean
    },
    group: {
      type: null,
      required: false,
      default: null
    }
  },
  data() {
    return {
      links: []
    }
  },
  created() {
    let id = undefined;
    let home = "/";
    let disabled = this.controller === undefined;
    if (this.controller) {
      id = this.controller["@id"];
      home = `/${id}/home`;
    }

    this.links = [
      { 
        to: home, 
        label: "nav.labels.home",
        icon: "mdi-home",
      }, { 
        to: `/${id}/consent?tab=data`,
        label: "nav.labels.data",
        icon: "mdi-data-matrix",
        isDisabled: disabled 
      }, { 
        to: `/${id}/consent?tab=purpose`, 
        label: "nav.labels.purposes", 
        icon: "mdi-file-document",
        isDisabled: disabled 
      }, { 
        type: "divider" 
      }, { 
        to: `/glossary`, 
        label: "nav.labels.glossary",
        icon: "mdi-book",
      }, { 
        to: `/${id}/faq`, 
        label: "nav.labels.faq", 
        icon: "mdi-frequently-asked-questions",
        isDisabled: disabled 
      }
    ];

    if (this.mobile) {
      this.links.splice(1, 0,
        { 
          to: () => this.openControllerDrawer(), 
          label: "nav.labels.controller", 
          icon: "mdi-domain",
          type: "function",
          isDisabled: this.controller === undefined
        },
      );
    }
  },
  methods: {
    openControllerDrawer() {
      this.$emit("open-controller-drawer");
    }
  }
}
</script>

<style>
.v-list-group .v-list-group__header .v-list-item__icon.v-list-group__header__append-icon {
  min-width: inherit;
  justify-content: flex-start;
}
</style>
