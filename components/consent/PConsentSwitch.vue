<template>
  <v-sheet elevation="0" rounded class="consent-switch">
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

<style scoped>
.consent-switch {
    text-align: left;
    display: flex;
    align-items: center;
    margin-left: 20px;
    justify-content: space-between;
    flex-flow: row nowrap;
}
</style>
