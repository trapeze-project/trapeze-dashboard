<template>
  <v-sheet elevation="0" rounded class="d-flex align-center justify-space-between flex-row flex-nowrap text-left ml-2">
    <v-switch v-model="active" color="primary" />
    <slot />
    <v-btn
      icon
    >
      <v-icon>
        more_vert
      </v-icon>
    </v-btn>
  </v-sheet>
</template>

<script>
export default {
  name: 'PConsentSwitch',
  props: {
    active: {
      type: Boolean,
      required: true
    }
  }
}
</script>
