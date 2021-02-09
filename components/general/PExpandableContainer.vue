<template>
  <v-card
    elevation="4"
    shaped
    :disabled="disabled"
  >
    <div class="card-header">
      <v-icon v-if="icon" color="coporate" x-large>
        {{ icon }}
      </v-icon>
      <div class="header-item">
        <v-card-title class="title">
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
.card-header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 0px 15px;
}
.header-item {
    flex: 1;
    margin: 0 0 0 10px;
    padding: 0;
}

</style>
