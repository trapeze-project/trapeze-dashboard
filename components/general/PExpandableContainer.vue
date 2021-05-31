<template>
  <v-card
    elevation="4"
    shaped
    :disabled="disabled"
  >
    <div class="d-flex flex-row flex-nowrap justify-space-between align-center ma-0 pl-2 pr-2">
      <v-icon v-if="icon" color="primary" x-large class="d-none d-sm-inline">
        {{ icon }}
      </v-icon>
      <div class="header-item">
        <v-card-title v-resize-text class="title">
          {{ title }}
        </v-card-title>

        <v-card-subtitle>
          {{ subtitle }}
        </v-card-subtitle>
      </div>
      <v-card-actions>
        <v-btn
          icon
          @click="toogleShow()"
        >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>
    </div>

    <v-expand-transition>
      <div v-show="show">
        <v-divider inset />
        <slot />
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      required: false,
      default: undefined
    },
    title: {
      type: String,
      required: true,
      default: 'Title'
    },
    subtitle: {
      type: String,
      required: false,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    show: false
  }),
  methods: {
    toogleShow () {
      this.show = !this.show
      this.$emit('clicked')
    }
  }
}
</script>

<style scoped>
.header-item {
    flex: 1;
    margin: 0 0 0 2px;
    padding: 0;
}

</style>
